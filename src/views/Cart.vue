<script>
import { ShoppingCart } from "../utils/ShoppingCart.js";

export default {
  props: {
    cart: Array,
    removeFromCart: Function,
    clearCart: Function,
    shippingCost: Number,
    appliedDiscount: Boolean
  },
  data() {
    return {
      cartInstance: new ShoppingCart(),
      discountCode: '',
      customer: {
        name: '',
        email: '',
        address: '',
        zipcode: ''
      }
    }
  },
  computed: {
    subtotal() {
      return this.cartInstance.subtotal;
    },
    discountedTotal() {
      return this.cartInstance.discountedTotal;
    },
    totalPrice() {
      return this.cartInstance.totalInclVAT + this.shippingCost;
    }
  },
  methods: {
    applyDiscount() {
      this.cartInstance.applyVoucher(this.discountCode);
    },
    increase(item) {
      this.cartInstance.addProduct(item.product, 1);
    },
    decrease(item) {
      this.cartInstance.removeProduct(item.product.id, 1);
    },
    clearCartHandler() {
      this.cartInstance.clearCart();
    },
    submitOrder() {
      if (!this.customer.name || !this.customer.email || !this.customer.address) {
        alert("Fyll i alla fält innan du skickar beställningen!");
        return;
      }
      // här skulle du skicka ordern till backend
      console.log("Order skickad:", {
        cart: this.cart,
        customer: this.customer,
        total: this.totalPrice
      });
      alert("Tack för din beställning, " + this.customer.name + "!");
      this.$emit('submit-order', { cart: this.cart, customer: this.customer });

      // valfritt: töm varukorgen och formuläret
      this.clearCart();
      this.customer = { name: '', email: '', address: '' };
    }
  }
}
</script>

<template>
   <div class="section">
    <h2>Din varukorg</h2>
    <div v-if="cart.length === 0">Varukorgen är tom.</div>
    
    <ul v-else>
      <li v-for="item in cart" :key="item.id" class="cart-item">
        <span>{{ item.name }}</span>
        <span>Datum: {{ item.date }}</span>
        <div class="quantity-controls">
          <button @click="decrease(item)">-</button>
          <span>{{ item.quantity }}</span>
          <button @click="increase(item)">+</button>
        </div>
        <span>{{ item.price * item.quantity }} SEK</span>
        <button @click="removeFromCart(item)">❌</button>
      </li>
    </ul>

    <div v-if="cart.length > 0" class="cart-footer">
      <div class="cart-calculate">
        <p>Delsumma: {{ subtotal }} SEK</p>
        <p>Frakt: {{ shippingCost }} SEK</p>
        <p v-if="discountCode === &quot;418_I'm_A_Teapot&quot;">Rabatt: -25%</p>
        <p>Moms (25%): {{ Math.round((discountedTotal + shippingCost) * 0.25) }} SEK</p>
      </div>
      <hr>
      <p class="cart-total">Totalt inkl. moms: {{ totalPrice }} SEK</p>
      
      <form class="checkout-form" @submit.prevent="submitOrder">
        <div class="form-group">
          <label for="name">Namn</label>
          <input type="text" id="name" v-model="customer.name" required />
        </div>

        <div class="form-group">
          <label for="email">E-post</label>
          <input type="email" id="email" v-model="customer.email" required />
        </div>

        <div class="form-group">
          <label for="address">Leveransadress</label>
          <input type="text" id="address" v-model="customer.address" required />
        </div>

        <div class="form-group">
          <label for="zip-code">Postnummer</label>
          <input type="number" id="zip-code" v-model="customer.zipcode" required />
        </div>

        <div class="cart-buttons">
          <button type="button" @click="clearCart">Töm varukorg</button>
          <button type="submit">Skicka beställning</button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
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
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin: 8px 0;
}

.quantity-controls button {
  width: 30px;
  height: 30px;
  font-size: 18px;
  font-weight: bold;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  background-color: rgba(255,255,255,0.2);
  color: var(--color-text-dark);
  transition: background 0.2s;
  display: flex;          
  justify-content: center;    
  align-items: center;    
  color: black;
}

.quantity-controls button:hover {
  background-color: rgba(255,255,255,0.4);
}

.quantity-controls span {
  min-width: 20px;
  text-align: center;
  font-weight: bold;
  color: var(--color-text-dark);
    color: black;
}

.discount {
  margin-top: 1rem;
  display: flex;
  gap: 0.5rem;
}

.cart-total {
  font-weight: 700;
  font-size: 1.2rem;
  margin-top: 0;
  text-align: right;
}

.cart-calculate {
  text-align: right;
}

.cart-calculate p {
  margin: 0;
}

.checkout-form {
  margin: 1rem 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.form-group {
  display: flex;
  flex-direction: column;
  text-align: left;
}

.form-group label {
  font-size: 0.9rem;
  margin-bottom: 4px;
}

.form-group input {
  padding: 6px 10px;
  border-radius: 6px;
  border: 1px solid #ccc;
}

.cart-buttons {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 1rem;
}

.cart-buttons {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 1rem;
}
</style>
