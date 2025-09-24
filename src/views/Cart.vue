<script>
export default {
  props: {
    cart: Array,
    appliedDiscount: Boolean,
    shippingCost: Number
  },
  data() {
    return {
      discountCode: '',
      localCart: [] // tom array som default
    }
  },
  computed: {
    totalPrice() {
      const subtotal = this.localCart.reduce((sum, item) => sum + item.price * item.quantity, 0);
      const discounted = this.appliedDiscount ? subtotal * 0.75 : subtotal;
      return discounted + this.shippingCost;
    }
  },
  created() {
    if (this.cart) {
      this.localCart = [...this.cart]
    }
  },
  methods: {
    removeFromCart(item) {
      this.localCart = this.localCart.filter(i => i.id !== item.id);
    },
    clearCart() {
      this.localCart = [];
    },
    increase(item) {
      const cartItem = this.localCart.find(i => i.id === item.id);
      if (cartItem) cartItem.quantity++;
    },
    decrease(item) {
      const cartItem = this.localCart.find(i => i.id === item.id);
      if (cartItem && cartItem.quantity > 1) cartItem.quantity--;
    },
    applyDiscount() {
      this.$emit('apply-discount', this.discountCode);
    }
  }
}
</script>

<template>
  <div class="cart">
    <h2>Din varukorg</h2>
    <div v-if="cart.length === 0">Varukorgen är tom.</div>
    
    <ul v-else>
      <li v-for="item in localCart" :key="item.id" class="cart-item">
        <span>{{ item.name }}</span>
        <div class="quantity-controls">
          <button @click="decrease(item)">-</button>
          <span>{{ item.quantity }}</span>
          <button @click="increase(item)">+</button>
        </div>
        <span>{{ item.price * item.quantity }} SEK</span>
        <button @click="removeFromCart(item)">❌</button>
      </li>
    </ul>

    <div v-if="localCart.length > 0" class="cart-footer">
      <p>Frakt: {{ shippingCost }} SEK</p>
      <p class="cart-total">Totalt: {{ totalPrice }} SEK</p>
      <button @click="clearCart">Töm varukorg</button>
    </div>
  </div>
</template>

<style scoped>
.cart {
  margin-top: 20px;
  padding: 1rem;
  border-radius: 12px;
  background: rgba(255,255,255,0.1);
  backdrop-filter: blur(6px);
}

.cart-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  margin: 8px 0;
}

ul {
  padding: 0;
}

.quantity-controls {
  display: flex;
  align-items: center;
  gap: 6px;
}

.quantity-controls button {
  width: 28px;
  height: 28px;
  font-size: 16px;
  font-weight: bold;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  background: rgba(255,255,255,0.2);
  transition: background 0.2s;
}
.quantity-controls button:hover {
  background: rgba(255,255,255,0.4);
}

.discount {
  margin-top: 1rem;
  display: flex;
  gap: 0.5rem;
}

.cart-total {
  font-weight: 700;
  font-size: 1.2rem;
  margin-top: 1rem;
  text-align: right;
}
</style>
