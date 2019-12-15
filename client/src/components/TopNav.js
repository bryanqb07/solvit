import React, { useState } from "react";
// import CartContainer from './cart/CartContainer';
import { Link } from 'react-router-dom';
import { withRouter } from "react-router";

const TopNav = ({ history }) => {
    const [queryString, setqueryString] = useState('');
    const [inputControl, setinputControl] = useState({ clickCount: 0, inputClass: 'search hidden'});

    const handleClick = e => {
        if(inputControl.clickCount === 0){
            setinputControl({ inputClass: "search", clickCount: inputControl.clickCount + 1 });
        }else{
            setinputControl({ 
                clickCount: 0, 
                inputClass: "search hidden"
            });
            setqueryString('');

            history.push({
                pathname: "/search",
                search: `queryString=${queryString}`
            });
        }
    };

    return (
        <header className="">
            <p className=""></p>
            <p className="">
                <Link to="/cart"><i className="fa fa-shopping-cart"></i></Link>
                <input
                    className={inputControl.inputClass}
                    type="text"
                    placeholder="Search product..."
                    value={queryString}
                    onChange={ e => setqueryString(e.target.value) }
                />

                <i className="fa fa-search" onClick={handleClick}></i>
            </p>
        </header>
    );
};



// extends Component{
//     constructor(props) {
//         super(props);
//         this.state = {
//             clickCount: 0,
//             queryString: "",
//             inputClass: "search hidden"
//         };
//         this.handleClick = this.handleClick.bind(this);
//         // this.handleKeyDown = this.handleKeyDown.bind(this);
//         this.handleChange = this.handleChange.bind(this);
//     }

//     handleChange(e){
//         this.setState({ queryString: e.target.value });
//     }

//     // handleKeyDown(e){
//     //     e.preventDefault(e);
//     //     // if (e.key === 'Enter') {
//     //     //     this.props.history.push({
//     //     //         pathname: "/",
//     //     //         search: `queryString=${this.state.queryString}`
//     //     //     });
//     //     // }
//     // }

//     handleClick(e){
//         e.preventDefault();
//         if(this.state.clickCount === 0){
//             this.setState({ inputClass: "search", clickCount: this.state.clickCount + 1 });
//         }else{
//             this.setState({
//                 clickCount: 0,
//                 queryString: "",
//                 inputClass: "search hidden"
//             });
//             this.props.history.push({
//                 pathname: "/search",
//                 search: `queryString=${this.state.queryString}`
//             });
//         }
//     }

//     render(){
//         return(
//             <header className="w3-container w3-xlarge">
//                 <p className="w3-left"></p>
//                 <p className="w3-right">
//                     <Link to="/cart"><i className="fa fa-shopping-cart w3-margin-right"></i></Link>
//                     <input 
//                         className={this.state.inputClass}
//                         type="text" 
//                         placeholder="Search product..." 
//                         value={this.state.queryString}
//                         onChange={this.handleChange} 
//                         />

//                     <i className="fa fa-search" onClick={this.handleClick}></i>
//                 </p>
//             </header>
//         )
//     }
// }

export default withRouter(TopNav);
