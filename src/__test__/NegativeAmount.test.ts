// Hantera negativa produktantal i varukorgen (t.ex. -1 produkt). Exempel: Säkerställ att produkten tas bort om värdet är 0 eller lägre. 

import { describe, test, expect } from 'vitest';
import { ShoppingCart } from "../utils/ShoppingCart.js";

describe("ShoppingCart - hantera negativa produktantal", () => {
  test("ska ta bort produkter om kvantiteten blir 0 eller lägre", () => {
    // --- Arrange ---
    const cart = new ShoppingCart();
    const productA = { id: 1, name: "Produkt A", price: 100, vat: 0.25 };
    const productB = { id: 2, name: "Produkt B", price: 50, vat: 0.25 };

    cart.addProduct(productA, 2); // kvantitet 2
    cart.addProduct(productB, 1); // kvantitet 1

    // --- Act: försök ta bort för många av produkt B ---
    cart.removeProduct(productB.id, 2); // borde ta bort helt

    // --- Assert: produkt B ska vara borttagen ---
    expect(cart.cart.find(item => item.product.id === productB.id)).toBeUndefined();

    // --- Act: ta bort exakt rätt antal av produkt A ---
    cart.removeProduct(productA.id, 2); // kvantitet blir 0 → borttagen

    // --- Assert: varukorgen ska vara tom ---
    expect(cart.cart.length).toBe(0);
  });
});