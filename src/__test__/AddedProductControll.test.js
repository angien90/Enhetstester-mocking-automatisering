// Verifiera/testa att den tillagda produkten har rätt namn/pris/beskrivning/produkt-ID.

import { describe, test, expect } from "vitest";
import { ShoppingCart } from "../utils/ShoppingCart.js";

describe("ShoppingCart - lägg till produkt", () => {
  test("lägger till produkt med korrekt data", () => {
    // --- Arrange ---
    const cart = new ShoppingCart();
    const product = {
      id: 1,
      name: "Biljett",
      price: 100,
      description: "Konsertbiljett",
      quantity: 1,
      vat: 0.25
    };

    // --- Act ---
    cart.addProduct(product);

    // --- Assert ---
    expect(cart.cart).toHaveLength(1);
    expect(cart.cart[0]).toMatchObject({ product, quantity: 1 });
  });
});
