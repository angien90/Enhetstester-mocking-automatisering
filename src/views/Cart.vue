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
      },
      successMessage: ''
    }
  },
  computed: {
    subtotal() {
      return this.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    },
    discountedTotal() {
      return this.discountCode === "418_I'm_A_Teapot"
        ? this.subtotal * 0.75
        : this.subtotal;
    },
    totalExclVAT() {
      return this.discountedTotal + (this.shippingCost || 0);
    },
    vat() {
      return Math.round(this.totalExclVAT * 0.25);
    },
    totalPrice() {
      return this.totalExclVAT + this.vat;
    }
  },
  methods: {
    applyDiscount() {
      this.cartInstance.applyVoucher(this.discountCode);
    },
    increase(item) {
      item.quantity++;
    },
    decrease(item) {
      if (item.quantity > 1) {
        item.quantity--;
      } else {
        this.removeFromCart(item);
      }
    },
    clearCartHandler() {
      this.cartInstance.clearCart();
    },
    submitOrder() {
      if (!this.customer.name || !this.customer.email || !this.customer.address) {
        alert("Fyll i alla fält innan du skickar beställningen!");
        return;
      }
      // Här kan man skicka ordern till backend
      console.log("Order skickad:", {
        cart: this.cart,
        customer: this.customer,
        total: this.totalPrice
      });

      // Visa success message
      this.successMessage = `Tack för din beställning, ${this.customer.name}! Vi har mottagit din order.`;

      // Töm varukorgen och formuläret
      this.clearCart();
      this.customer = { name: '', email: '', address: '' };
    }
  }
}
</script>

<template>
  <div class="section">
    <h2>Din varukorg</h2>

    <!-- Varukorg är tom -->
    <div v-if="cart.length === 0 && !successMessage">Varukorgen är tom.</div>

    <!-- Varukorgslista -->
    <ul v-if="cart.length > 0">
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

    <!-- Footer & Formulär -->
    <div v-if="cart.length > 0 || successMessage" class="cart-footer">

      <!-- Beräkning -->
      <div v-if="cart.length > 0" class="cart-calculate">
        <p>Delsumma: {{ subtotal }} SEK</p>
        <p>Frakt: {{ shippingCost }} SEK</p>
        <p v-if="discountCode === &quot;418_I'm_A_Teapot&quot;">Rabatt: -25%</p>
        <p>Moms (25%): {{ vat }} SEK</p>
        <hr>
        <p class="cart-total">Totalt inkl. moms: {{ totalPrice }} SEK</p>
      </div>

      <!-- Formulär -->
      <form v-if="cart.length > 0" class="checkout-form" @submit.prevent="submitOrder">
        <label for="name">Namn</label>
        <input type="text" id="name" v-model="customer.name" required />

        <label for="email">E-post</label>
        <input type="email" id="email" v-model="customer.email" required />

        <label for="address">Leveransadress</label>
        <input type="text" id="address" v-model="customer.address" required />

        <label for="zipcode">Postnummer</label>
        <input type="number" id="zipcode" v-model="customer.zipcode" required />

        <div class="cart-buttons">
          <button type="button" @click="clearCartHandler">Töm varukorg</button>
          <button type="submit">Skicka beställning</button>
        </div>
      </form>

      <!-- Success-message -->
      <div v-if="successMessage" class="success-message">
        {{ successMessage }}
      </div>
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
  color: var(--color-text-light);
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
  color: var(--color-text-light);
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
  color: var(--color-text-light);
}

.cart-calculate {
  text-align: right;
  color: var(--color-text-light);
}

.cart-calculate p {
  margin: 0;
}

.checkout-form {
  display: flex;
  flex-direction: column;
}

.checkout-form label {
  color: var(--color-primary-start);
  font-weight: bold;
  margin-top: 10px;
  text-align: left;
  padding-left: 20px;
}

.checkout-form input {
  padding: 0.75rem 1rem;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-family: inherit;
}

.success-message {
  color: var(--color-primary-start);
  font-weight: 600;
  margin-top: 1rem;
}

.cart-buttons {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 1rem;
}
</style>
