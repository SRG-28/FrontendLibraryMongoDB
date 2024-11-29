<template>
    <div class="centered-container">
      <h1>Edit Publisher</h1>
      <form @submit.prevent="updatePublisher" class="edit-form">
        <label for="publisher">Publisher Name:</label>
        <input type="text" v-model="publisher.publisher" required />
  
        <label for="country">Country:</label>
        <input type="text" v-model="publisher.country" required />
  
        <label for="founded">Founded Year:</label>
        <input type="number" v-model="publisher.founded" required />
  
        <label for="genre">Genere:</label>
        <input type="text" v-model="publisher.genere" required />
  
        <div class="buttons-container">
          <button type="submit" class="btn-update">Update Publisher</button>
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
        publisher: {
          publisher: '',
          country: '',
          founded: '',
          genre: '',
        },
        publisherId: '',
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
          this.publisherId = response.data.id;
        } catch (error) {
          console.error('Error fetching publisher:', error);
        }
      },
      async updatePublisher() {
        try {
          await axios.put(`http://localhost:3000/publishers/${this.publisherId}`, this.publisher);
          this.$router.push('/publishers'); 
        } catch (error) {
          console.error('Error updating publisher:', error);
        }
      },
      goBack() {
        this.$router.push('/publishers'); 
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
  