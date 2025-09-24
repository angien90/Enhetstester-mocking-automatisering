<script>
export default {
  data() {
    return {
      events: [
        { id: 1, name: 'Konsert: The Rolling Tones', date: '2025-10-15', location: 'Stockholm Arena', price: 450, image: 'https://images.unsplash.com/photo-1507874457470-272b3c8d8ee2?w=600&h=400&fit=crop', quantity: 1 },
        { id: 2, name: 'Standup: Skrattfest med Anna K', date: '2025-11-05', location: 'Göteborg Comedy Club', price: 299, image: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=600&h=400&fit=crop', quantity: 1 },
        { id: 3, name: 'Teater: Hamlet (modern tolkning)', date: '2025-12-01', location: 'Malmö Stadsteater', price: 390, image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&h=400&fit=crop', quantity: 1 },
        { id: 4, name: 'Festival: Summer Beats', date: '2026-06-10', location: 'Gärdet, Stockholm', price: 1200, image: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?w=600&h=400&fit=crop', quantity: 1 },
        { id: 5, name: 'Opera: Carmen', date: '2026-02-20', location: 'Kungliga Operan, Stockholm', price: 650, image: 'https://picsum.photos/id/1025/400/300', quantity: 1 },
        { id: 6, name: 'Barnteater: Alfons Åberg', date: '2025-12-15', location: 'Linköpings Teater', price: 180, image: 'https://images.pexels.com/photos/32070157/pexels-photo-32070157.jpeg?auto=compress&cs=tinysrgb&w=600', quantity: 1 },  
        { id: 7, name: 'Jazzkväll med Lars Jansson Trio', date: '2026-01-18', location: 'Nefertiti, Göteborg', price: 320, image: 'https://images.pexels.com/photos/733767/pexels-photo-733767.jpeg?auto=compress&cs=tinysrgb&w=600', quantity: 1 },
        { id: 8, name: 'Musikal: Mamma Mia!', date: '2026-03-05', location: 'Chinateatern, Stockholm', price: 720, image: 'https://images.pexels.com/photos/14235671/pexels-photo-14235671.jpeg?auto=compress&cs=tinysrgb&w=600', quantity: 1 },
        { id: 9, name: 'Föreläsning: Framtidens AI', date: '2026-04-12', location: 'Uppsala Universitet', price: 150, image: 'https://images.pexels.com/photos/1072851/pexels-photo-1072851.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop', quantity: 1 },
        { id: 10, name: 'Komedikväll: Standup Mix', date: '2026-05-01', location: 'Lund Comedy Club', price: 250, image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&h=400&fit=crop', quantity: 1 },
        { id: 11, name: 'Rock Night Live', date: '2026-08-15', location: 'Stockholms stadion', price: 550, image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&h=400&fit=crop', quantity: 1 },
        { id: 12, name: 'Klassisk Kväll: Beethoven & Mozart', date: '2026-09-10', location: 'Konserthuset, Göteborg', price: 780, image: 'https://images.pexels.com/photos/2032476/pexels-photo-2032476.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop', quantity: 1 }
      ]
    }
  },
  methods: {
    addToCart(event) {
      // Skickar hela event-objektet inklusive quantity
      this.$emit('add-to-cart', { ...event });
      // Återställ antal till 1 efter bokning
      event.quantity = 1;
    },
    increase(event) {
      event.quantity++;
    },
    decrease(event) {
      if (event.quantity > 1) event.quantity--;
    }
  }
}
</script>

<template>
  <div class="section">
    <h2>Kommande evenemang</h2>
    <div class="event-list">
      <div v-for="event in events" :key="event.id" class="event-item">
        <img :src="event.image" :alt="event.name" class="event-image" />
        <h3>{{ event.name }}</h3>
        <p><strong>Datum:</strong> {{ event.date }}</p>
        <p><strong>Plats:</strong> {{ event.location }}</p>
        <p><strong>Pris:</strong> {{ event.price }} SEK</p>

        <!-- Kvantitet -->
        <div class="quantity-controls">
          <button @click="decrease(event)">-</button>
          <span>{{ event.quantity }}</span>
          <button @click="increase(event)">+</button>
        </div>

        <button @click="addToCart(event)">Boka biljett</button>
      </div>
    </div>
  </div>
</template>


<style scoped>
.event-list {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: center;
}

.event-list img {
  width: 100%;
  height: 200px; 
  object-fit: cover; 
  border-radius: 8px;
}

.event-item {
  width: 220px;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 12px;
  text-align: center;
  background-color: var(--color-bg-dark); 
  backdrop-filter: blur(10px); 
  -webkit-backdrop-filter: blur(10px);
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  transition: transform 0.2s, box-shadow 0.2s;
}

.event-item button{
    margin-top: 10px;  
}

.event-item:hover {
  transform: scale(1.02);
}

.event-image {
  width: 100%;
  height: auto;
  border-radius: 6px;
}

.quantity-controls {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin: 8px 0;
}

.quantity-controls button {
  width: 30px;
  height: 30px;
  font-size: 18px;
  font-weight: bold;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  background-color: rgba(255,255,255,0.2);
  color: var(--color-text-dark);
  transition: background 0.2s;
  display: flex;          
  justify-content: center;    
  align-items: center;    
}

.quantity-controls button:hover {
  background-color: rgba(255,255,255,0.4);
}

.quantity-controls span {
  min-width: 20px;
  text-align: center;
  font-weight: bold;
  color: var(--color-text-dark);
}
</style>
