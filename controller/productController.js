const productService = require('../service/productService');

module.exports.createProduct = async (req, res) => {
    let response = {};
    try {
        const responseFromService = await productService.createProduct(req.body);
        response.status = 200;
        response.message = 'Product created successfully';
        response.body = responseFromService;
    } catch (error) {
        console.log('Something went wrong, controller is createProduct', error);
        response.status = 400;
        response.message = error.message;
        response.body = {};
    }
    return res.status(response.status).send(response);
}

module.exports.getAllProducts = async (req, res) => {
    let response = {};
    try {
        const responseFromService = await productService.getAllProducts();
        response.status = 200;
        response.message = 'Product fetched successfully';
        response.body = responseFromService;
    } catch (error) {
        console.log('Something went wrong, controller is getAllProducts', error);
        response.status = 400;
        response.message = error.message;
        response.body = {};
    }
    return res.status(response.status).send(response);
}
