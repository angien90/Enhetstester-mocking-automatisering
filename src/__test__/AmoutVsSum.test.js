// Verifiera att antal produkter som finns i varukorgen motsvarar summan av alla tillagda produkter. T.ex. om du har 3 st av produkt A och 4 st av produkt B, då ska summan av antalet produkter i varukorgen vara 3 + 4 = 7.

import { describe, test, expect } from "vitest";
import { ShoppingCart } from "../utils/ShoppingCart.js";

describe("ShoppingCart - totalt antal produkter", () => {
  test("ska visa korrekt totalt antal produkter baserat på alla tillagda produkter", () => {
    // --- Arrange ---
    const cart = new ShoppingCart();
    const productA = { id: 1, name: "Produkt A", price: 100, vat: 0.25 };
    const productB = { id: 2, name: "Produkt B", price: 50, vat: 0.12 };

    // --- Act: lägg till produkter ---
    cart.addProduct(productA, 3);
    cart.addProduct(productB, 4);

    // räkna total antal produkter
    const totalQuantity = cart.cart.reduce((sum, item) => sum + item.quantity, 0);

    // --- Assert ---
    expect(totalQuantity).toBe(7);
  });
});
