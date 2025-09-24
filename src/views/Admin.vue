<script>
export default {
  data() {
    return {
      events: [
        { id: 1, name: 'Konsert: The Rolling Tones', date: '2025-10-15', location: 'Stockholm Arena', price: 450, image: '' },
        { id: 2, name: 'Standup: Skrattfest med Anna K', date: '2025-11-05', location: 'Göteborg Comedy Club', price: 299, image: '' },
      ],
      newEvent: {
        newEvent: { name: '', date: '', location: '', price: '', image: '' },
        editingId: null,
        editEvent: { name: '', date: '', location: '', price: '', image: '' }
      }
    }
  },
  methods: {
    addEvent() {
        if (!this.newEvent.name || !this.newEvent.date) return;
        const id = this.events.length ? Math.max(...this.events.map(e => e.id)) + 1 : 1;
        this.events.push({ ...this.newEvent, id });
        this.resetForm();
    },
    removeEvent(event) {
        this.events = this.events.filter(e => e.id !== event.id);
    },
    startEdit(event) {
        this.editingId = event.id;
        this.editEvent = { ...event }; // kopiera värdena
    },
    saveEdit() {
        const index = this.events.findIndex(e => e.id === this.editingId);
        if (index !== -1) {
        this.events[index] = { ...this.editEvent, id: this.editingId };
        }
        this.editingId = null;
        this.editEvent = { name: '', date: '', location: '', price: '', image: '' };
    },
    cancelEdit() {
        this.editingId = null;
        this.editEvent = { name: '', date: '', location: '', price: '', image: '' };
    },
    resetForm() {
      this.newEvent = { name: '', date: '', location: '', price: '', image: '' };
    }
  }
}
</script>

<template>
    <div class="section">
        <div class="admin">
            <h2>Hantera Evenemang</h2>

            <!-- Lägg till nytt event -->
            <div class="add-event">
            <h3>Lägg till nytt event</h3>
            <input v-model="newEvent.name" placeholder="Namn" />
            <input v-model="newEvent.date" type="date" placeholder="Datum" />
            <input v-model="newEvent.location" placeholder="Plats" />
            <input v-model="newEvent.price" type="number" placeholder="Pris" />
            <input v-model="newEvent.image" placeholder="Bild URL" />
            <button @click="addEvent">Lägg till</button>
            </div>

            <!-- Lista över events -->
            <div class="event-list">
            <h3>Nuvarande evenemang</h3>
            <ul>
                <li v-for="event in events" :key="event.id">
                    <div v-if="editingId === event.id">
                    <input v-model="editEvent.name" placeholder="Namn" />
                    <input v-model="editEvent.date" type="date" placeholder="Datum" />
                    <input v-model="editEvent.location" placeholder="Plats" />
                    <input v-model="editEvent.price" type="number" placeholder="Pris" />
                    <input v-model="editEvent.image" placeholder="Bild URL" />
                    <button @click="saveEdit">Spara</button>
                    <button @click="cancelEdit">Avbryt</button>
                    </div>
                    <div v-else>
                        <h3>{{ event.name }}</h3>
                        <p><strong>Datum:</strong> {{ event.date }}</p>
                        <p><strong>Plats:</strong> {{ event.location }}</p>
                        <p><strong>Pris:</strong> {{ event.price }} SEK</p>
                        <div class="event-card-button">
                            <button @click="startEdit(event)">Ändra</button>
                            <button @click="removeEvent(event)">Ta bort</button>
                        </div>
                    </div>
                </li>
            </ul>
            </div>
        </div>
    </div>
</template>

<style scoped>
.admin {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}

.add-event {
    background-color: rgba(255, 255, 255, 0.1); 
    backdrop-filter: blur(10px); 
    -webkit-backdrop-filter: blur(10px);
    border-radius: 8px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    transition: transform 0.2s, box-shadow 0.2s;
    padding: 30px;
    margin-bottom: 30px;
}

.add-event input {
  display: block;
  margin: 5px 0;
  padding: 6px;
  width: 100%;
  box-sizing: border-box;
  border-radius: 8px;
}

.add-event button {
    margin-top: 20px;
}

.event-list {
    display: flex;
    flex-direction: column;
    background-color: rgba(255, 255, 255, 0.1); 
    backdrop-filter: blur(10px); 
    -webkit-backdrop-filter: blur(10px);
    border-radius: 8px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    transition: transform 0.2s, box-shadow 0.2s;
    padding: 30px;
    gap: 0;
    width: 700px;
}

.event-list ul {
  list-style: none;
  padding: 20px;
  -webkit-backdrop-filter: blur(10px);
  border-radius: 8px;
}

.event-list li {
  padding: 6px;
  border-bottom: 1px solid #ccc;
  background-color: var(--color-bg-dark);
  border-radius: 8px;
  color: var(--color-text-dark);
  margin-bottom: 10px;
}

.event-card-button {
    display:flex; 
    justify-content: center;
    gap: 30px;
    margin: 10px;
}
</style>
