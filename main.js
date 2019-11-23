'use strict';

Vue.component('product-details', {
 	props: {
    	details: {
      		type: Array,
      		required: true
    	}
  	},
  	template: `
  		<ul>
      		<li v-for="detail in details">{{ detail }}</li>
    	</ul>
  	`
})

Vue.component('product', {
	props: {
		premium: {
			type: Boolean,
			required: true
		}
	},
	template: `
		<div class="product">
			<div class="product-image">	
				<img v-bind:src="image">
			</div>
			<div class="product-info">
				<h1>{{ title }}</h1>
				<p>{{ description }}</p>
				<a :href="link">More products like this</a>
				<p v-if="inventory > 10">In Stock</p>
				<p v-else-if="inventory <= 10 && inventory > 0">Almost sold out!</p>
				<p v-else
				   :class="{ outOfStock: inventory == 0 }">Out of Stock</p>
				<!-- <span v-show="onSale">On Sale!</span> -->
				<p style="color: #e74c3c;">{{ sale }}</p>

				<p>Shipping: {{ shipping }}</p>

				<product-details :details="details"></product-details>
				
				<ul>
					<li style="display: inline; list-style-type: none;" v-for="size in sizes"> {{ size }}</li>
				</ul>
				<div v-for="(variant, index) in variants" 
					:key="variant.variantId"
					class="color-box"
					:style="{ backgroundColor: variant.variantColor }"
					@mouseover="updateProduct(index)">
				</div>

				<button v-on:click="addToCart" 
						:disabled="inventory == 0"
						:class="{ disabledButton: inventory == 0 }">Add to cart</button>
				<button style="width: 140px;" 
						@click="removeFromCart">Remove from cart</button>
			</div>
		</div>
	`,
	data() { 
		return {
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
			onSale: true
		}
	},
	methods: {
		addToCart: function () {
			this.$emit('add-to-cart');
		},
		updateProduct: function(index) {
			this.selectedVariant = index;
		},
		removeFromCart: function () {
			this.$emit('remove-from-cart');
		}
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
        },
        shipping() {
        	if (this.premium) {
        		return 'Free';
        	}
        	return 2.99;
        }
	}
});

var app = new Vue({
	el: '#app',
	data: {
		premium: true,
		cart: 0
	},
	methods: {
		addToCart: function () {
			this.cart += 1;
		},
		removeFromCart: function () {
			if (!this.cart)
				return;
			this.cart -= 1;
		}
	}	
});