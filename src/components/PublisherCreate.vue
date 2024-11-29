<template>
    <div class="centered-container">
      <h1>Create Publisher</h1>
      <form @submit.prevent="createPublisher" class="create-form">
        <label for="publisher">Publisher Name:</label>
        <input type="text" v-model="newPublisher.publisher" required />
  
        <label for="country">Country:</label>
        <input type="text" v-model="newPublisher.country" required />
  
        <label for="founded">Founded Year:</label>
        <input type="number" v-model="newPublisher.founded" required />
        <input type="hidden" v-model="newPublisher.fields" />
  
        <label for="genere">Genre:</label>
        <input type="text" v-model="newPublisher.genere" required />
  
        <label for="book_title">Book Title:</label>
        <input type="text" v-model="newBook.title" @input="updateFields" required />
  
        <div class="buttons-container">
          <button type="submit" class="btn-create">Create Publisher</button>
          <button type="button" class="btn-back" @click="goBack">Back</button>
        </div>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import { ref } from 'vue';
  
  export default {
    setup() {
      const newPublisher = ref({
        publisher: '',
        country: '',
        founded: '',
        genere: '',
        fields: '',
        books: [] 
      });
  
      const newBook = ref({
        book_id: null, 
        title: ''
      });
  
      const goBack = () => {
        window.history.back();
      };
  
      const createPublisher = async () => {
        try {
          newBook.value.book_id = await getNextBookId();
  
          newPublisher.value.fields = newBook.value.title; 
  
          newPublisher.value.books = [newBook.value];
  
          await axios.post('http://localhost:3000/publishers', {
            ...newPublisher.value,
            id: await getNextId() 
          });
  
          goBack(); 
        } catch (error) {
          console.error('Error creating publisher:', error);
        }
      };
  
      const getNextId = async () => {
        try {
          const response = await axios.get('http://localhost:3000/publishers');
          const publishers = response.data;
          return publishers.length ? Math.max(...publishers.map(publisher => publisher.id)) + 1 : 1; 
        } catch (error) {
          console.error('Error fetching publishers:', error);
          return 1; 
        }
      };
  
      const getNextBookId = async () => {
        try {
          const response = await axios.get('http://localhost:3000/publishers');
          const publishers = response.data;
          const allBooks = publishers.flatMap(publisher => publisher.books);
          return allBooks.length ? Math.max(...allBooks.map(book => book.book_id)) + 1 : 1; 
        } catch (error) {
          console.error('Error fetching publishers:', error);
          return 1; 
        }
      };
  
      const updateFields = () => {
        newPublisher.value.fields = newBook.value.title; 
      };
  
      return {
        newPublisher,
        newBook,
        createPublisher,
        goBack,
        updateFields
      };
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
  }
  
  .btn-create {
    background-color: #32cd32;
    color: white;
  }
  .btn-create:hover {
    background-color: #3cb371;
  }
  .btn-create:active {
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
  