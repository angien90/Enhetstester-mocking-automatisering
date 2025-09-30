// Verifiera att en order inte kan placeras om inte all kundinformation är korrekt ifylld.

import { describe, test, expect } from "vitest";
import { ShoppingCart } from "../utils/ShoppingCart.js";

// Hjälpfunktion som efterliknar Cart.vue → submitOrder
function submitOrder(cart, customer) {
  if (!cart.cart.length || !customer.name || !customer.email || !customer.address || !customer.zipcode) {
    return { success: false, message: "Fyll i alla fält innan du skickar beställningen!" };
  }

  return { success: true, message: `Tack för din beställning, ${customer.name}!` };
}

describe("Order - validering av kundinformation", () => {
  test("ska inte tillåta order om kundinformationen är ofullständig", () => {
    // Arrange
    const cart = new ShoppingCart();
    cart.addProduct({ id: 1, name: "Produkt A", price: 100 }, 1);

    const incompleteCustomer = { name: "", email: "", address: "", zipcode: "" };

    // Act
    const result = submitOrder(cart, incompleteCustomer);

    // Assert
    expect(result.success).toBe(false);
    expect(result.message).toBe("Fyll i alla fält innan du skickar beställningen!");
  });

  test("ska tillåta order om kundinformationen är komplett", () => {
    // Arrange
    const cart = new ShoppingCart();
    cart.addProduct({ id: 1, name: "Produkt A", price: 100 }, 1);

    const completeCustomer = {
      name: "Anna",
      email: "anna@example.com",
      address: "Storgatan 1",
      zipcode: "12345"
    };

    // Act
    const result = submitOrder(cart, completeCustomer);

    // Assert
    expect(result.success).toBe(true);
    expect(result.message).toBe("Tack för din beställning, Anna!");
  });
});
