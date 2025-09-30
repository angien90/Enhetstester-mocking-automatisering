// Verifiera/testa att nästa tillagda produkt har rätt namn, pris, beskrivning och produkt-ID.

import { describe, test, expect } from "vitest";
import { ShoppingCart } from "../utils/ShoppingCart.js";

describe("ShoppingCart - nästa tillagda produkt", () => {
  test("nästa produkt har rätt namn, pris, beskrivning och produkt-ID", () => {
    // Arrange
    const cart = new ShoppingCart();

    const firstProduct = {
      id: 1,
      name: "Konsert: The Rolling Tones",
      price: 450,
      description: "En biljett till sommarfestivalen"
    };

    const nextProduct = {
      id: 2,
      name: "Konsert: Jazz Explosion",
      price: 375,
      description: "En biljett till jazzkvällen"
    };

    // Act
    cart.addProduct(firstProduct, 1);
    cart.addProduct(nextProduct, 1);

    const lastProduct =
      cart.cart[cart.cart.length - 1].product;

    // Assert
    expect(lastProduct).toMatchObject({
      id: 2,
      name: "Konsert: Jazz Explosion",
      price: 375,
      description: "En biljett till jazzkvällen"
    });
  });
});
