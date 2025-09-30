<script>
export default {
  props: {
    cart: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    cartCount() {
      // Räknar ihop alla quantity från produkterna
      return this.cart.reduce((sum, item) => sum + item.quantity, 0);
    }
  }
}
</script>

<template>
  <header class="site-header">
    <div class="logo">
      🎶 Festivo
    </div>
    <nav>
      <ul>
        <li><router-link to="/">Hem</router-link></li>
        <li>
          <router-link to="/cart">
            Varukorg <span v-if="cartCount > 0" class="cart-badge">{{ cartCount }}</span>
          </router-link>
        </li>
        <li><router-link to="/AboutUs">Om oss</router-link></li>
        <li><router-link to="/ContactUs">Kontaka oss</router-link></li>
      </ul>
    </nav>
  </header>
</template>

<style scoped>
.site-header {
  background-color: #222;
  color: #fff;
  padding: 10px 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  font-size: 1.5rem;
  font-weight: bold;
}

nav ul {
  list-style: none;
  display: flex;
  gap: 20px;
  margin: 0;
  padding: 0;
}

nav a {
  color: #fff;
  text-decoration: none;
  font-weight: 500;
  padding-bottom: 2px;              
  border-bottom: 2px solid transparent; 
  transition: border-color 0.3s;
}

nav a:hover {
  border-bottom-color: var(--color-primary-start);
}

nav a.router-link-exact-active {
  border-bottom-color: var(--color-primary-start);
}

.cart-badge {
  background: var(--color-primary-start);
  color: var(--color-text-dark);
  border-radius: 50%;
  padding: 2px 8px;
  font-size: 0.8rem;
}
</style>
