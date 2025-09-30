// Verifiera/testa att den tillagda produkten har rätt namn/pris/beskrivning/produkt-ID.

import { describe, test, expect } from "vitest";
import { mount } from "@vue/test-utils";
import Event from "../components/Event.vue"; 

describe("Event.vue - lägg till produkt via komponent", () => {
  test("addToCart-emission skickar korrekt produkt", async () => {
    // --- Arrange ---
    const wrapper = mount(Event);
    const firstEvent = wrapper.vm.events[0];

    // --- Act ---
    await wrapper.find("button").trigger("click"); // klicka på första "Boka biljett"

    // --- Assert ---
    // Kolla att event emitterade 'add-to-cart' med rätt produktdata
    const emitted = wrapper.emitted("add-to-cart");
    expect(emitted).toHaveLength(1);
    expect(emitted[0][0]).toMatchObject({
      id: firstEvent.id,
      name: firstEvent.name,
      price: firstEvent.price,
      description: firstEvent.description,
      quantity: firstEvent.quantity,
    });
  });
});