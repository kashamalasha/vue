Vue.component('product',{
  props: {
    premium: {
      type: Boolean,
      required: true
    }
  },
  template: `
    <div>
      <h1>{{ title }}</h1>
      <button @click="addToCart">Add</button>
      <button @click="removeFromCart">Remove</button>
      <p>Shipping: {{ shipping }}</p>
      <p v-if="reviews.length > 0">Avg rating: {{ avgRating }} from {{ reviews.length }}</p>
      <p v-else>No rating yet</p>
      <product-review @review-submited="addReview"></product-review>
    </div>
  `,
  data() {
    return {
      product: 'Test',
      brand: 'My',
      reviews: []
    }
  },
  methods: {
    addToCart() {
      this.$emit('add-to-cart', this.title);
    },
    removeFromCart() {
      this.$emit('remove-from-cart', 'remove')
    },
    addReview(productReview) {
      this.reviews.push(productReview)
    }
  },
  computed: {
    title() {
      return this.product + ' ' + this.brand
    },
    shipping() {
      if (this.premium) {
        return 'Free'
      }
      return '2.99'
    }
    ,
    avgRating() {
      let sum = null
      if (this.reviews.length > 0) {
        for (let i = 0; i < this.reviews.length; i++) {
          sum = sum + this.reviews[i].rating
        }
        let avgRating = sum / this.reviews.length
        return Math.round(avgRating * 100) / 100
      } else {
        return 0
      }
      
    }
  }
})

Vue.component('product-review',{
  template: `
    <form class="product-review" @submit.prevent="onSubmit">
      <h3 v-if="errors.length">Data required:</h3> 
      <p v-if="errors.length">
        <ul>
          <li v-for="error in errors">{{ error }}</li>
        </ul>
      </p>
      <p>
        <input type="checkbox" v-model="isRecommend">Would you recommend?</input>
      </p>
      <p>
        <label for="name">Name:</label>
        <input id="name" v-model="name">
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
      <p>
        <input type="submit">
      </p>
    </form>
  `,
  data() {
    return {
      name: null,
      rating: null,
      isRecommend: null,
      errors: [ ]
    }
  },
  computed: {
  },
  methods: {
    onSubmit() {
      if (this.name && this.rating) {
        let productReview = {
          name: this.name,
          rating: this.rating,
          isRecommend: this.isRecommend
        }
        this.$emit('review-submited', productReview)
        this.name = null,
        this.rating = null,
        this.isRecommend = false,
        this.errors = []
      } else {
        if (this.errors.length) this.errors = []
        if (!this.name) this.errors.push("Name required")
        if (!this.rating) this.errors.push("Rating required")
      }
    //this.errors = []
    }
  }
})


var app = new Vue ({
  el: '#app',
  data: {
    premium: true,
    cart: []
  },
  methods: {
    updateCart(name){
      if (name === 'remove') {
        this.cart.pop()
      } else {
        this.cart.push(name);
      }
    }
  }
})