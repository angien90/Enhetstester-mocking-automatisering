// Verifiera att momssatsen är korrekt när produkternas antal uppdateras (t.ex. 25% för varor, 12% för livsmedel och 6% för kultur (tidningar, böcker, musik, teater)).

import { describe, test, expect } from "vitest";
import { ShoppingCart } from "../utils/ShoppingCart.js";

describe("ShoppingCart", () => {
  test("ska räkna moms korrekt", () => {
    const cart = new ShoppingCart();

    const productGoods = { id: 1, name: "Produkt", price: 100, vat: 0.25 };
    const productFood = { id: 2, name: "Mat", price: 50, vat: 0.12 };
    const productCulture = { id: 3, name: "Bok", price: 200, vat: 0.06 };

    cart.addProduct(productGoods, 2);
    cart.addProduct(productFood, 3);
    cart.addProduct(productCulture, 1);

    expect(cart.totalVAT).toBe(80); // 50 + 18 + 12
    expect(cart.totalInclVAT).toBe(Math.round(cart.subtotal + 80));
  });

  test("ska ge 25% rabatt vid teapot-koden", () => {
    const cart = new ShoppingCart();
    const productGoods = { id: 1, name: "Produkt", price: 100, vat: 0.25 };

    cart.addProduct(productGoods, 1);
    cart.applyVoucher("418_I'm_A_Teapot");

    const withoutDiscount = 100 + 25; // pris + moms
    const withDiscount = withoutDiscount * 0.75;

    expect(cart.totalInclVAT).toBe(Math.round(withDiscount));
  });
});