export class ShoppingCart {
  cart = [];
  discountCode = null;

  addProduct(product, quantity = 1) {
    const existing = this.cart.find(i => i.product.id === product.id);
    if (existing) {
      existing.quantity += quantity;
    } else {
      this.cart.push({ product, quantity });
    }
  }

  removeProduct(productId, quantity = 1) {
    const index = this.cart.findIndex(i => i.product.id === productId);
    if (index !== -1) {
      this.cart[index].quantity -= quantity;
      if (this.cart[index].quantity <= 0) {
        this.cart.splice(index, 1);
      }
    }
  }

  clearCart() {
    this.cart = [];
    this.discountCode = null;
  }

  saveToLocalStorage() {
    localStorage.setItem("cart", JSON.stringify(this.cart));
  }

  loadFromLocalStorage(orderStatus) {
    const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    if (orderStatus === "paid") {
      this.clearCart();
    } else {
      this.cart = savedCart;
    }
  }

  applyVoucher(code) {
    this.discountCode = code;
  }

  get subtotal() {
    return this.cart.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );
  }

  get totalVAT() {
    return this.cart.reduce(
      (sum, item) =>
        sum + item.product.price * item.quantity * item.product.vat,
      0
    );
  }

  get totalInclVAT() {
    const total = this.cart.reduce(
      (sum, item) =>
        sum + item.product.price * item.quantity * (1 + item.product.vat),
      0
    );

    return this.discountCode === "418_I'm_A_Teapot"
      ? Math.round(total * 0.75)
      : Math.round(total);
  }
}
