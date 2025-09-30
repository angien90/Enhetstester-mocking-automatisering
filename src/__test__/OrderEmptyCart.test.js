// Verifiera att det inte går att beställa en tom varukorg.

import { describe, test, expect } from "vitest";
import { ShoppingCart } from "../utils/ShoppingCart.js";

function submitOrder(cart, customer) {
  if (!cart.cart.length || !customer?.name || !customer?.email || !customer?.address || !customer?.zipcode) {
    return { success: false, message: "Fyll i alla fält innan du skickar beställningen!" };
  }
  return { success: true, message: `Tack för din beställning, ${customer.name}!` };
}

describe("Order - tom varukorg", () => {
  test("ska inte tillåta order om varukorgen är tom", () => {
    const cart = new ShoppingCart();
    const customer = { name: "", email: "", address: "", zipcode: "" };

    const result = submitOrder(cart, customer);
    expect(result.success).toBe(false);
    expect(result.message).toBe("Fyll i alla fält innan du skickar beställningen!");
  });

  test("ska tillåta order om varukorgen innehåller produkter och kundinfo är ifylld", () => {
    const cart = new ShoppingCart();
    cart.addProduct({ id: 1, name: "Produkt A", price: 100 }, 1);

    const customer = { name: "Anna", email: "anna@example.com", address: "Storgatan 1", zipcode: "12345" };

    const result = submitOrder(cart, customer);
    expect(result.success).toBe(true);
    expect(result.message).toBe("Tack för din beställning, Anna!");
  });
});
