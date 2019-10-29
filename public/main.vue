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
      <button v-on:click="pushMe">Push Me! = {{ count }}</button>
      <p>Shipping: {{ shipping }}</p>
    </div>
  `,
  data() {
    return {
      product: 'Test',
      brand: 'My',
      count: 0
    }
  },
  methods: {
    pushMe() {
      this.count++;
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
  }
})


var app = new Vue ({
  el: '#app',
  data: {
    premium: true
  }
})