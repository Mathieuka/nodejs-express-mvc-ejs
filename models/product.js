const fs = require('fs');
const path = require('path');

const pathToProductsJson = path.join(
	path.dirname(process.mainModule.filename),
	'data',
	'products.json'
);

const getProductsFromFile = cb => {
	fs.readFile(pathToProductsJson, (err, fileContent) => {
		if (err) {
			cb([]);
		} else {
			cb(JSON.parse(fileContent));
		}
	});
};

module.exports = class Product {
	constructor(title, imageUrl, description, price) {
		this.title = title;
		this.imageUrl = imageUrl;
		this.description = description;
		this.price = price;
		this.id = Date.now().toString();
	}

	save() {
		getProductsFromFile(products => {
			products.push(this);
			fs.writeFile(pathToProductsJson, JSON.stringify(products), err => {
				console.log('[save function] ', err)
			});
		});
	}

	static fetchAll(cb) {
		getProductsFromFile(cb);
	}

	static findById(id, cb) {
		getProductsFromFile(products => {
		const product = products.find(product => product.id === id);
		cb(product);
		})
	}
};


