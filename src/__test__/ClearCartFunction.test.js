// Verifiera att clearCart-funktionen nollställer produktlistan, totalbeloppet och momsbeloppet.

import { describe, test, expect } from "vitest";
import { ShoppingCart } from "../utils/ShoppingCart.js";

describe("ShoppingCart - clearCart", () => {
  test("ska nollställa produktlistan, totalbeloppet och momsbeloppet", () => {
    // --- Arrange ---
    const cart = new ShoppingCart();

    const productA = { id: 1, name: "Produkt A", price: 100, vat: 0.25 };
    const productB = { id: 2, name: "Produkt B", price: 50, vat: 0.12 };

    cart.addProduct(productA, 2); // 200 kr
    cart.addProduct(productB, 3); // 150 kr

    // Säkerställ att det finns värden före nollställning
    expect(cart.subtotal).toBe(350);
    expect(cart.totalVAT).toBe(68);

    // --- Act ---
    cart.clearCart();

    // --- Assert ---
    expect(cart.cart.length).toBe(0);
    expect(cart.subtotal).toBe(0);
    expect(cart.totalVAT).toBe(0);
    expect(cart.totalInclVAT).toBe(0);
  });
});
