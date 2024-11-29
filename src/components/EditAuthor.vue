<template>
  <div class="centered-container">
    <h1>Edit Author</h1>
    <form @submit.prevent="updateAuthor" class="edit-form">
      <label for="author">Author Name:</label>
      <input type="text" v-model="author.author" required />

      <label for="nationality">Nationality:</label>
      <input type="text" v-model="author.nationality" required />

      <label for="birth_year">Birth Year:</label>
      <input type="number" v-model="author.birth_year" required />

      <div class="buttons-container">
        <button type="submit" class="btn-update">Update Author</button>
        <button type="button" class="btn-back" @click="goBack">Back</button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
import { useRoute, useRouter } from 'vue-router';

export default {
  data() {
    return {
      author: {
        author: '',
        nationality: '',
        birth_year: '',
      },
      authorId: '', 
    };
  },
  async created() {
    await this.fetchAuthor();
  },
  methods: {
    async fetchAuthor() {
      const route = useRoute();
      try {
        const response = await axios.get(`http://localhost:3000/authors/${route.params.id}`);
        this.author = response.data;
        this.authorId = response.data.id; 
      } catch (error) {
        console.error('Error fetching author:', error);
      }
    },
    async updateAuthor() {
      try {
        await axios.put(`http://localhost:3000/authors/${this.authorId}`, this.author);
        this.$router.push(`/authors`); 
      } catch (error) {
        console.error('Error updating author:', error);
      }
    },
    goBack() {
      this.$router.push(`/authors`); 
    },
  },
};
</script>

<style scoped>
.centered-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

h1 {
  color: #333;
  margin-bottom: 20px;
}

form {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 300px;
}

label {
  margin-bottom: 5px;
  text-align: left;
  width: 100%;
}

input {
  margin-bottom: 15px;
  padding: 10px;
  width: 100%;
  border-radius: 5px;
  border: 1px solid #ccc;
}

.buttons-container {
  display: flex;
  gap: 10px;
}

button {
  padding: 10px 20px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-update {
  background-color: #32cd32;
  color: white;
}

.btn-update:hover {
  background-color: #3cb371;
}

.btn-update:active {
  background-color: #228b22;
}

.btn-back {
  background-color: #1e90ff;
  color: white;
}

.btn-back:hover {
  background-color: #4682b4;
}

.btn-back:active {
  background-color: #4169e1;
}
</style>
