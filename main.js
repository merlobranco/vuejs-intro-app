'use strict';

var app = new Vue({
	el: '#app',
	data: {
		product: 'Socks',
		description: 'A pair of warm, fuzzy socks',
		image: './assets/vmSocks-green.jpg',
		link: 'https://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Daps&field-keywords=socks',
		inventory: 100,
		onSale: true,
		details: ['80% cotton', '20% polyester', 'Gender-neutral'],
		variants: [
			{
				variantId: 2234, 
				variantColor: 'green',
				variantImage: './assets/vmSocks-green.jpg'
			}, 
			{	
				variantId: 2235, 
				variantColor: 'blue',
				variantImage: './assets/vmSocks-blue.jpg'
			}
		],
		sizes: ['S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
		cart: 0
	},
	methods: {
		addToCart: function () {
			this.cart += 1;
		},
		changeImage: function(image) {
			this.image = image;
		},
		removeFromCart: function () {
			if (!this.cart)
				return;
			this.cart -= 1;
		},

	}
});