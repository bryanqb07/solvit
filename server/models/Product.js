const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "user"
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "category"
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  width: {
    type: Number,
    required: true
  },
  height: {
    type: Number,
    required: true
  },
  flatInstallationFee: { type: Number },
  perFtInstallationFee: { type: Number },
  unitPrice: { type: Number },
  perFtUnitPriceThreeMonths: { type: Number },
  perFtUnitPriceSixMonths: { type: Number },
  perFtUnitPriceNineMonths: { type: Number },
  perFtUnitPriceTwelveMonths: { type: Number }
  // price: { type: Number }
  // image: {
  //   type: String
  // }
  // photo: {
  //   type: Schema.Types.ObjectId,
  //   ref: "category"
  // }
});

ProductSchema.index({ name: "text", description: "text" });

ProductSchema.statics.updateProductCategory = (productId, categoryId) => {
    const Product = mongoose.model("product");
    const Category = mongoose.model("category");

    // delete product from old category
    return Product.findById(productId).then(product => {
        if (product.category){
            Category.findById(product.category).then(oldcategory => {
                oldcategory.products.pull(product);
                return oldcategory.save();
            });
        }
        // find the category and push product, then update product's category
        return Category.findById(categoryId).then(newCategory => {
            product.category = newCategory;
            newCategory.products.push(product);

            return Promise.all([product.save(), newCategory.save()]).then(
                ([product, newCategory]) => product
            );
        });
    });
};

ProductSchema.methods.computePrice = function(totalFeet, duration){
  const priceObject = {};
  priceObject.installationFee = this.flatInstallationFee + this.perFtInstallationFee * totalFeet;
  
  if (duration <= 90){
    priceObject.price = this.perFtUnitPriceThreeMonths * totalFeet;
  } 
  else if(duration > 90 && duration <= 180){
    priceObject.price = this.perFtUnitPriceSixMonths * totalFeet;
  }    
  else if(duration > 180 && duration <= 270){
    priceObject.price = this.perFtUnitPriceNineMonths * totalFeet;
  }
      
  else if(duration > 270 && duration <= 365){
    priceObject.price = this.perFtUnitPriceTwelveMonths * totalFeet;
  }
  else{
      throw "Invalid price quote params";
  }
  
  return priceObject;
};

module.exports = mongoose.model("product", ProductSchema);