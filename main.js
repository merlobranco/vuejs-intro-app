'use strict';

Vue.component('product-review', {
  	template: `
  		<form class="review-form" @submit.prevent="onSubmit">

  			<p v-if="errors.length" style="color: #e74c3c;">
      			<b>Please correct the following error(s):</b>
      			<ul>
        			<li v-for="error in errors">{{ error }}</li>
      			</ul>
    		</p>


		    <p>
		    	<label for="name">Name:</label>
		        <input id="name" v-model="name" placeholder="name">
		    </p>
		      
		    <p>
		        <label for="review">Review:</label>      
		        <textarea id="review" v-model="review"></textarea>
		    </p>
		      
		    <p>
		        <label for="rating">Rating:</label>
		        <select id="rating" v-model.number="rating">
		          	<option>5</option>
		          	<option>4</option>
		          	<option>3</option>
		          	<option>2</option>
		          	<option>1</option>
		        </select>
		    </p>

		    <p>Would you recommend this product?</p>
        		<label>
          			Yes
          			<input type="radio" value="Yes" v-model="recommend"/>
        		</label>
        		<label>
          			No
          			<input type="radio" value="No" v-model="recommend"/>
        		</label>
		          
		    <p>
		        <input type="submit" value="Submit">  
		    </p>    
	    
	    </form>
  	`,
  	data() { 
		return {
			name: null,
			review: null,
			rating: null,
			recommend: null,
			errors: []
		}
	},
	methods: {
		onSubmit() {
			if (this.name && this.review && this.rating && this.recommend) {
				let productReview = {
	        		name: this.name,
	        		review: this.review,
	        		rating: this.rating,
	        		recommend: this.recommend
	      		}
	      		this.$emit('review-submitted', productReview);
	      		this.name = null;
	      		this.review = null;
	      		this.rating = null;
	      		this.recommend = null;
			}
			else {
				if (!this.name)
					this.errors.push("Name required.");
				if (!this.review)
					this.errors.push("Review required.");
				if (!this.rating)
					this.errors.push("Rating required.");
				if (!this.recommend)
					this.errors.push("Recommendation required.");
			}
    	}
	}
})



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
						@click="removeFromCart"
						:class="{ disabledButton: !added }">Remove from cart</button>
			</div>

			<div>
        		<h2>Reviews</h2>
		        <p v-if="!reviews.length">There are no reviews yet.</p>
		        <ul>
		          	<li v-for="review in reviews">
		          		<p>{{ review.name }}</p>
		          		<p>Rating: {{ review.rating }}</p>
		          		<p>{{ review.review }}</p>
		          		<p v-if="review.recommend == 'Yes'">Recommended</p>
		          		<p v-else>No Recommended</p>
		          	</li>
		        </ul>
			</div>

			<product-review @review-submitted="addReview"></product-review>
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
			onSale: true,
			added: false,
			reviews: []
		}
	},
	methods: {
		addToCart: function () {
			this.added = true;
			this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId);
		},
		updateProduct: function(index) {
			this.selectedVariant = index;
		},
		removeFromCart: function () {
			this.added = false;
			this.$emit('remove-from-cart', this.variants[this.selectedVariant].variantId);
		},
		addReview: function (review) {
			this.reviews.push(review);
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
		cart: []
	},
	methods: {
		addToCart: function (id) {
			this.cart.push(id);
		},
		removeFromCart: function (id) {
			if (!this.cart.length)
				return;

			this.cart = this.cart.filter((e) => {
    			return e !== id;
			});
		}
	}	
});