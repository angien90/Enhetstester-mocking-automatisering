// Verifiera att rätt produkt tas bort, t.ex. att det verkligen är produkten med ID 1.

import { describe, test, expect } from "vitest";
import { ShoppingCart } from "../utils/ShoppingCart.js";

describe("ShoppingCart - ta bort specifik produkt", () => {
  test("ska ta bort produkten med korrekt ID", () => {
    // --- Arrange ---
    const cart = new ShoppingCart();

    const productA = { id: 1, name: "Produkt A", price: 100, vat: 0.25 };
    const productB = { id: 2, name: "Produkt B", price: 50, vat: 0.25 };
    const productC = { id: 3, name: "Produkt C", price: 200, vat: 0.25 };

    cart.addProduct(productA, 2);
    cart.addProduct(productB, 3);
    cart.addProduct(productC, 1);

    // --- Act ---
    cart.removeProduct(1, 2); // tar bort hela produkt A

    // --- Assert ---
    expect(cart.cart.find(item => item.product.id === 1)).toBeUndefined();
    expect(cart.cart.length).toBe(2);
    expect(cart.cart.find(item => item.product.id === 2)).toBeDefined();
    expect(cart.cart.find(item => item.product.id === 3)).toBeDefined();
  });
});
