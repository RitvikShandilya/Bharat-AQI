const Product = require('../database/models/productModel');

module.exports.createProduct = async (serviceData) => {
    try {
    let product = new Product({ ...serviceData });
    return await product.save();
    } catch (error) {
        console.log('Something went wrong, Service is createProduct', error);
        throw new Error(error);
    }
}

module.exports.getAllProducts = async (serviceData) => {
    try {
        let products = await Product.find({});
        return products;
    } catch (error) {
        console.log('Something went wrong, Service is createProduct', error);
        throw new Error(error);
    }
}