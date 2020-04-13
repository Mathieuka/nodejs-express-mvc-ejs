const fs = require('fs');
const pathTo = require('./utils/pathToDataFile');

const getProductsFromFile = cb => {
	fs.readFile(pathTo.data.productsJson, (err, fileContent) => {
		if (err) {
			cb([]);
		} else {
			cb(JSON.parse(fileContent));
		}
	});
};

const getCartFromFile = cb => {
	fs.readFile(pathTo.data.cartJson, (err, fileContent) => {
		if (err) {
			cb([])
		} else {
			cb(JSON.parse(fileContent));
		}
	})
}

module.exports = class Cart {
    
    constructor(cart) {
        this.cart = [];
    };

    static initCart() {
        getCartFromFile((cartFromFile) => {
            this.cart = cartFromFile;
        })
    }

    static addProductToCart(id, cb) {
		getProductsFromFile(products => {
			const product = products.find(product => product.id === id);
			this.cart.push(product);
			fs.writeFile(pathTo.data.cartJson, JSON.stringify(this.cart), err => {
				console.error('[cart.js] ', err);
			});
			cb();
		})
	}

    static getCart(cb) {
		getCartFromFile((cart) => {
			cb(cart);
		})
	}
}