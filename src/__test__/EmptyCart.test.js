// Verifiera att varukorgen är tom från början

import { describe, test, expect } from "vitest";
import { ShoppingCart } from "../utils/ShoppingCart.js";

describe("ShoppingCart - initialt tillstånd", () => {
  test("varukorgen är tom från början", () => {
    // --- Arrange ---
    const cart = new ShoppingCart();

    // --- Act ---
    // (ingen handling behövs – vi kollar bara initial state)

    // --- Assert ---
    expect(cart.cart).toHaveLength(0);
    expect(cart.subtotal).toBe(0);
    expect(cart.totalVAT).toBe(0);
  });
});
