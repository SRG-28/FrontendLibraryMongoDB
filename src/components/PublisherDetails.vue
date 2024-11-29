<template>
    <div class="centered-container">
      <h1>Publisher Details</h1>
      <div v-if="publisher">
        <h2>{{ publisher.publisher }} ({{ publisher.country }})</h2>
        <p>Founded in {{ publisher.founded }}</p>
        <p>Country: {{ publisher.country }}</p>
        <p>Genere: {{ publisher.genere }}</p>
        <h4>Books:</h4>
        <ul>
          <li v-for="book in publisher.books" :key="book.book_id">
            {{ book.title }}
          </li>
        </ul>
        <button @click="deletePublisher(publisher.id)" class="btn-delete">Delete Publisher</button>
        <button @click="editPublisher(publisher.id)" class="btn-edit">Edit Publisher</button>
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
        publisher: null,
      };
    },
    async created() {
      await this.fetchPublisher();
    },
    methods: {
      async fetchPublisher() {
        const route = useRoute();
        try {
          const response = await axios.get(`http://localhost:3000/publishers/${route.params.id}`);
          this.publisher = response.data;
        } catch (error) {
          console.error('Error fetching publisher:', error);
        }
      },
      async deletePublisher(id) {
        try {
          await axios.delete(`http://localhost:3000/publishers/${id}`);
          this.$router.push('/publishers');
        } catch (error) {
          console.error('Error deleting publisher:', error);
        }
      },
      editPublisher(id) {
        this.$router.push(`/publishers/edit/${id}`);
      },
      goBack() {
        this.$router.push('/publishers');
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
  