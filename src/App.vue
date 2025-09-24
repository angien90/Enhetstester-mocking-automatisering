<script>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import Cart from './views/Cart.vue'
import festivalImage from './assets/festival_2.webp'

export default {
  components: { Header, Footer, Cart },
  data() {
    return {
      cart: [],
      festivalImage,
      shippingCost: 50,
      appliedDiscount: false
    }
  },
  methods: {
    addToCart(event) {
      const existing = this.cart.find(item => item.id === event.id);
      if (existing) {
        existing.quantity += event.quantity; // lägg till antal
      } else {
        this.cart.push({ ...event }); // nytt objekt
      }
    },
    increaseQuantity(event) {
      const item = this.cart.find(i => i.id === event.id);
      if (item) item.quantity++;
    },
    decreaseQuantity(event) {
      const item = this.cart.find(i => i.id === event.id);
      if (item && item.quantity > 1) item.quantity--;
    },
    removeFromCart(event) {
      this.cart = this.cart.filter(i => i.id !== event.id);
    },
    clearCart() {
      this.cart = [];
    }
  }
}
</script>

<template>
  <div id="app">
    <Header />

    <main class="main-content"
      :style="{ backgroundImage: `url(${festivalImage})` }">
      <div class="content-wrapper">
        <!-- skicka vidare cart och metoder till alla vyer -->
        <router-view
          :cart="cart"
          :add-to-cart="addToCart"
          :remove-from-cart="removeFromCart"
          :clear-cart="clearCart"
          :shipping-cost="shippingCost"
        />
      </div>
    </main>

    <Footer />
  </div>
</template>

<style>
.content-wrapper {
  max-width: 1000px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  padding: 20px; 
}
</style>