// Verifiera att längden på arrayen är 0 om alla produkter är borttagna.

import { describe, test, expect } from "vitest";
import { ShoppingCart } from "../utils/ShoppingCart.js";

describe("ShoppingCart - removeProduct", () => {
  test("ska ha längd 0 när alla produkter är borttagna", () => {
    // --- Arrange ---
    const cart = new ShoppingCart();
    const productA = { id: 1, name: "Produkt A", price: 100, vat: 0.25 };
    const productB = { id: 2, name: "Produkt B", price: 50, vat: 0.12 };

    cart.addProduct(productA, 2);
    cart.addProduct(productB, 1);

    // --- Act: ta bort alla produkter ---
    cart.removeProduct(productA.id, 2); // tar bort Produkt A
    cart.removeProduct(productB.id, 1); // tar bort Produkt B

    // --- Assert: varukorgen ska vara tom ---
    expect(cart.cart.length).toBe(0);
  });
});
