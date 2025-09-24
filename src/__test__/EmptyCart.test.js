// Verifiera att varukorgen är tom från början

import { describe, test, expect } from 'vitest'

// En enkel funktion för att skapa en lokal kopia av cart
function createLocalCart(cart) {
  return [...(cart || [])]
}

describe('Empty cart at beginning', () => {
  test('Cart är tom från början', () => {
    // Assign
    const localCart = createLocalCart([]) // Hämtar vår funktion

    // Act
    // (ingen handling behövs eftersom vi bara testar att cart startar tom)

    // Assert
    expect(localCart).toEqual([]) // Kollar att cart är tom
  })
})