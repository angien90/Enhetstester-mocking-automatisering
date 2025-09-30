// Testa att om det läggs till en produkt, så ökar length på cart-variabeln.

import { describe, test, expect } from "vitest";
import { ShoppingCart } from "../utils/ShoppingCart.js";

describe("ShoppingCart - addProduct", () => {
  test("ska öka längden på cart när en produkt läggs till", () => {
    // --- Arrange ---
    const cart = new ShoppingCart();
    const product = { id: 1, name: "Produkt A", price: 100, vat: 0.25 };

    // --- Assert: börjar tom ---
    expect(cart.cart.length).toBe(0);

    // --- Act: lägg till produkt ---
    cart.addProduct(product, 1);

    // --- Assert: längden ska öka till 1 ---
    expect(cart.cart.length).toBe(1);
  });
});
