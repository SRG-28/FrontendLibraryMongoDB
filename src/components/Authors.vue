<template>
  <div class="centered-container">
    <h1>Authors List</h1>
    <ul v-if="authors.length">
      <li v-for="author in authors" :key="author._id" class="author-item">
        <h2>{{ author.author }} ({{ author.nationality }})</h2>
        <p>Born in {{ author.birth_year }}</p>
        <button @click="viewAuthor(author.id)" class="btn-view-details">View Details</button>
      </li>
      <button @click="createAuthor" class="btn-create">Create a new author</button>
    </ul>
    <p v-else>Loading...</p>
  </div>
</template>

<script>
import axios from 'axios';
import { useRouter } from 'vue-router';

export default {
  data() {
    return {
      authors: []
    };
  },
  created() {
    this.fetchAuthors();
  },
  methods: {
    async fetchAuthors() {
      try {
        const response = await axios.get('http://localhost:3000/authors');
        this.authors = response.data;
      } catch (error) {
        console.error('Error fetching authors:', error);
      }
    },
    viewAuthor(id) {
      this.$router.push(`/authors/${id}`);
    },
    createAuthor() {
      this.$router.push('/authors/create'); 
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

.author-item {
  margin-bottom: 20px;
}

p {
  margin-bottom: 10px;
}

.btn-view-details {
  background-color: #1862ac; 
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button {
  margin: 10px;
  padding: 10px 20px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
} 
.btn-view-details:hover {
  background-color: #4682b4; 
}

.btn-view-details:active {
  background-color: #104e8b; 
}
.btn-create {
  background-color: orange;
  color: white;
}
.btn-create:hover {
  background-color: rgb(153, 104, 12);
}
.btn-create:active {
  background-color: rgb(153, 104, 12);
}
</style>

  