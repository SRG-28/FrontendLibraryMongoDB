<template>
  <div class="centered-container">
    <h1>Author Details</h1>
    <div v-if="author">
      <h2>{{ author.author }} ({{ author.nationality }})</h2>
      <p>Born in {{ author.birth_year }}</p>
      <p>Nationality: {{ author.nationality }}</p>
      <h4>Books:</h4>
      <ul>
        <li v-for="book in author.books" :key="book._id">
          {{ book.title }}
        </li>
      </ul>
      <button @click="deleteAuthor(author.id)" class="btn-delete">Delete Author</button>
      <button @click="editAuthor(author.id)" class="btn-edit">Edit Author</button>
      <button @click="goBack" class="btn-back">Back</button>
    </div>
    <p v-else>Loading...</p>
  </div>
</template>

<script>
import axios from 'axios';
import { useRoute, useRouter } from 'vue-router';

export default {
  data() {
    return {
      author: null,
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
      } catch (error) {
        console.error('Error fetching author:', error);
      }
    },
    async deleteAuthor(id) {
      try {
        await axios.delete(`http://localhost:3000/authors/${id}`);
        this.$router.push('/authors');  
      } catch (error) {
        console.error('Error deleting author:', error);
      }
    },
    editAuthor(id) { 
      this.$router.push(`/authors/edit/${id}`);  
    },
    goBack() {
      this.$router.push('/authors');
    }
  }
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

h2 {
  color: #555;
  margin-bottom: 10px;
}

ul {
  list-style: none;
  padding: 0;
}

button {
  margin: 10px;
  padding: 10px 20px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
}

.btn-delete {
  background-color: #808080;
  color: white;
}
.btn-delete:hover {
  background-color: #a9a9a9;
}
.btn-delete:active {
  background-color: #696969;
}

.btn-edit {
  background-color: #32cd32;
  color: white;
}
.btn-edit:hover {
  background-color: #3cb371;
}
.btn-edit:active {
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
