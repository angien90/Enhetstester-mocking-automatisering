// Bonus: Verifiera att när sidan laddas om så behålls föregående beställning i varukorgen om den inte är "betald". T.ex. via localStorage.

import { describe, test, expect, beforeEach } from 'vitest';
import { ShoppingCart } from '../utils/ShoppingCart.js';

class LocalStorageMock {
  constructor() { this.store = {}; }
  clear() { this.store = {}; }
  getItem(key) { return this.store[key] || null; }
  setItem(key, value) { this.store[key] = value.toString(); }
  removeItem(key) { delete this.store[key]; }
}

global.localStorage = new LocalStorageMock();

describe("ShoppingCart - behåll obetald beställning vid omladdning", () => {
  let cart;

  beforeEach(() => {
    localStorage.clear();
    cart = new ShoppingCart();
  });

  test("ska behålla varukorgen i localStorage om order inte är betald", () => {
    cart.addProduct({ id: 1, name: "Produkt A", price: 100 }, 2);
    cart.addProduct({ id: 2, name: "Produkt B", price: 50 }, 1);
    cart.saveToLocalStorage();

    const newCart = new ShoppingCart();
    newCart.loadFromLocalStorage("unpaid");

    expect(newCart.cart.length).toBe(2);
    expect(newCart.cart.find(item => item.product.id === 1)).toBeDefined();
    expect(newCart.cart.find(item => item.product.id === 2)).toBeDefined();
  });

  test("ska inte behålla varukorgen om order är betald", () => {
    cart.addProduct({ id: 1, name: "Produkt A", price: 100 }, 2);
    cart.saveToLocalStorage();

    const newCart = new ShoppingCart();
    newCart.loadFromLocalStorage("paid");

    expect(newCart.cart.length).toBe(0);
  });
});
