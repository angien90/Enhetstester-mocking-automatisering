// Verifiera att totalen (summan) av alla produkter uppdateras korrekt när produkter läggs till/tas bort.

import { describe, test, expect } from 'vitest';
import { ShoppingCart } from '../utils/ShoppingCart.js';

describe("ShoppingCart - uppdatera totalsumma", () => {
  test("ska uppdatera totalen korrekt när produkter läggs till och tas bort", () => {
    const cart = new ShoppingCart();

    const productA = { id: 1, name: "Produkt A", price: 100, vat: 0.25 };
    const productB = { id: 2, name: "Produkt B", price: 50, vat: 0.25 };

    // Lägg till produkter
    cart.addProduct(productA, 2); // 2 * 100 = 200
    cart.addProduct(productB, 3); // 3 * 50 = 150

    // Kontrollera subtotal (exkl. moms)
    expect(cart.subtotal).toBe(350);

    // Kontrollera total inkl. moms
    expect(cart.totalInclVAT).toBe(Math.round(350 + 350 * 0.25)); // 350 + 87.5 = 438

    // Ta bort Produkt B
    cart.removeProduct(productB.id, 3);

    // Kontrollera subtotal igen
    expect(cart.subtotal).toBe(200);

    // Kontrollera total inkl. moms igen
    expect(cart.totalInclVAT).toBe(Math.round(200 + 200 * 0.25)); // 200 + 50 = 250
  });
});
