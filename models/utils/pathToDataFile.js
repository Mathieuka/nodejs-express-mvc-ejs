const path = require('path');

const productsJson = path.join(
	path.dirname(process.mainModule.filename),
	'data',
	'products.json'
);

const cartJson = path.join(
	path.dirname(process.mainModule.filename),
	'data',
	'cart.json'
);

exports.data = {
    productsJson,
    cartJson
}