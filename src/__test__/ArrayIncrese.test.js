// Verifiera att längden på arrayen minskar när en produkt tas bort helt

import { describe, test, expect } from "vitest";
import { ShoppingCart } from "../utils/ShoppingCart.js";

describe("ShoppingCart - removeProduct", () => {
  test("Längden på cart minskar när en produkt tas bort helt", () => {
    // --- Arrange ---
    const cart = new ShoppingCart();
    const product1 = { id: 1, name: "Konsert: The Rolling Tones", price: 450, vat: 0.25 };
    const product2 = { id: 2, name: "Konsert: Jazz Explosion", price: 375, vat: 0.25 };

    cart.addProduct(product1, 1);
    cart.addProduct(product2, 1);

    // --- Act: ta bort produkt 2 ---
    cart.removeProduct(product2.id, 1); // kvantitet 1 tas bort → produkten försvinner

    // --- Assert ---
    expect(cart.cart).toHaveLength(1);
    expect(cart.cart[0].product.id).toBe(1);
  });
});
