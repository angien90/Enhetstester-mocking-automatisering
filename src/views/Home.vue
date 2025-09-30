<script>
import Events from '../components/Events.vue'

export default {
  components: { Events },
  props: ['cart', 'addToCart', 'removeFromCart', 'clearCart']
}
</script>

<template>
  <div class="home-page">
    <h1>Välkommen till Festivo</h1>
    <h2>- Live - Laugh - Live -</h2>

    <Events @add-to-cart="event => addToCart(event)" />
  </div>
</template>

<style scoped>
.home-page h2 {
  text-shadow: 
    2px 2px 4px rgba(0, 0, 0, 0.6), 
    0 0 6px rgba(255, 255, 255, 0.2);
}
</style>