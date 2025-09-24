<script>
export default {
  name: "ContactUs",
  data() {
    return {
      name: "",
      email: "",
      message: "",
      successMessage: ""
    };
  },
  methods: {
    submitForm() {
      // Här kan du senare koppla på API eller e-posttjänst
      this.successMessage = `Tack, ${this.name}! Vi har mottagit ditt meddelande.`;
      this.name = "";
      this.email = "";
      this.message = "";
    }
  }
}
</script>

<template>
  <div class="section">
    <div class="contact-page">
      <h2>Kontakta oss</h2>
      <p>Har du frågor om biljetter, evenemang eller behöver support? Vi finns här för dig!</p>

      <form class="contact-form" @submit.prevent="submitForm">
        <label for="name">Namn</label>
        <input id="name" v-model="name" type="text" required />

        <label for="email">E-post</label>
        <input id="email" v-model="email" type="email" required />

        <label for="message">Meddelande</label>
        <textarea id="message" v-model="message" rows="5" required></textarea>

        <button type="submit">Skicka meddelande</button>
      </form>

      <div v-if="successMessage" class="success-message">
        {{ successMessage }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.contact-page {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}

.contact-page p {
  color: var(--color-text-light);
  font-weight: bold;
}

.contact-form {
  display: flex;
  flex-direction: column;
}

.contact-form label {
  color: var(--color-primary-start);
  font-weight: bold;
  margin-top: 10px;
  text-align: left;
  padding-left: 20px;
}

.contact-form input,
.contact-form textarea {
  padding: 0.75rem 1rem;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-family: inherit;
}

.success-message {
  color: var(--color-primary-start);
  font-weight: 600;
  margin-top: 1rem;
}

button {
  margin-top: 40px;
  margin-bottom: 40px;
}
</style>
