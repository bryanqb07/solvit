const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const keys = require("../../config/keys");

const validateRegisterInput = require("../validations/register");
const validateLoginInput = require("../validations/login");

const register = async data => {
    try{
        const { message, isValid } = validateRegisterInput(data);
        if(!isValid){
            throw new Error(message);
        }
        const { name, email, password } = data;
        
        const existingUser = await User.findOne({ email });

        if(existingUser){
            throw new Error("User already exists");
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User(
            {
                name,
                email,
                password: hashedPassword
            },
            err => {
                if (err) throw err;
            }
        );

        user.save();

        const token = jwt.sign({ id: user._id }, keys.secretOrKey);
        const id = user._id;

        return { token, loggedIn: true, ...user._doc, id, password: null };
    } catch(err){
        throw err;
    }
}

const logout = async data => {
    try {
        const { id } = data;
        const user = await User.findById(id);
        if (!existingUser) throw new Error("No user exists with given ID");
        
        const token = "";

        return { token, loggedIn: false, isStaff: false, ...user._doc, password: null };
    } catch (err) {
        throw err;
    }
}

const login = async data => {
    try {
        // use our other validator we wrote to validate this data
        const { message, isValid } = validateLoginInput(data);
        if (!isValid) throw new Error(message);
        
        const { email, password } = data;

        const user = await User.findOne({ email });
        if (!user) throw new Error("No user exists with given ID");

        const isValidPassword = bcrypt.compareSync(password, user.password);
        if (!isValidPassword) throw new Error("Invalid password");

        const token = jwt.sign({ id: user._id }, keys.secretOrKey);
        const id = user._id;
        return { token, loggedIn: true, isStaff: user.staff, id, ...user._doc, password: null };
    } catch (err) {
        throw err;
    }
};

const verifyUser = async data => {
    try {
        const { token, isStaff } = data;

        const decoded = jwt.verify(token, keys.secretOrKey);
        const { id } = decoded;

        let staffVerified;

        const loggedIn = await User.findById(id).then(user => {
            if(isStaff){
                staffVerified = user.isStaff
            }
            return user ? true : false;
        });

        return { loggedIn, isStaff: staffVerified, id  };
    } catch (err) {
        return { loggedIn: false, isStaff: false };
    }
};

module.exports = { register, logout, login, verifyUser };