'use strict';

var app = new Vue({
	el: '#app',
	data: {
		brand: 'Vue Mastery',
		product: 'Socks',
		description: 'A pair of warm, fuzzy socks',
		selectedVariant: 0,
		// image: './assets/vmSocks-green.jpg',
		link: 'https://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Daps&field-keywords=socks',
		onSale: true,
		details: ['80% cotton', '20% polyester', 'Gender-neutral'],
		variants: [
			{
				variantId: 2234, 
				variantColor: 'green',
				variantImage: './assets/vmSocks-green.jpg',
				variantQuantity: 10
			}, 
			{	
				variantId: 2235, 
				variantColor: 'blue',
				variantImage: './assets/vmSocks-blue.jpg',
				variantQuantity: 0
			}
		],
		sizes: ['S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
		cart: 0,
		onSale: true
	},
	methods: {
		addToCart: function () {
			this.cart += 1;
		},
		updateProduct: function(index) {
			this.selectedVariant = index;
		},
		removeFromCart: function () {
			if (!this.cart)
				return;
			this.cart -= 1;
		},

	},
	computed: {
		title() {
			return this.brand + ' ' + this.product;
		},
		image() {
			return this.variants[this.selectedVariant].variantImage;
		},
		inventory() {
			return this.variants[this.selectedVariant].variantQuantity;
		},
		sale() {
          	if (this.onSale) {
            	return this.brand + ' ' + this.product + ' are on sale!'
          	} 
          	return  this.brand + ' ' + this.product + ' are not on sale'
        }
	}
});