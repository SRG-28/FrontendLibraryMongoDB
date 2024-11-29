<template>
  <div class="centered-container">
    <h1>Create Author</h1>
    <form @submit.prevent="createAuthor" class="create-form">
      <label for="author">Author Name:</label>
      <input type="text" v-model="newAuthor.author" required />

      <label for="nationality">Nationality:</label>
      <input type="text" v-model="newAuthor.nationality" required />

      <label for="birth_year">Birth Year:</label>
      <input type="number" v-model="newAuthor.birth_year" required />
      <input type="hidden" v-model="newAuthor.fields" />

      <label for="book_title">Book Title:</label>
      <input type="text" v-model="newBook.title" @input="updateFields" required />

      <div class="buttons-container">
        <button type="submit" class="btn-create">Create Author</button>
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
    const newAuthor = ref({
      author: '',
      nationality: '',
      birth_year: '',
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

    const createAuthor = async () => {
      try {
        newBook.value.book_id = await getNextBookId();

        newAuthor.value.fields = newBook.value.title; 

        newAuthor.value.books = [newBook.value];

        await axios.post('http://localhost:3000/authors', {
          ...newAuthor.value,
          id: await getNextId() 
        });

        goBack(); 
      } catch (error) {
        console.error('Error creating author:', error);
      }
    };

    const getNextId = async () => {
      try {
        const response = await axios.get('http://localhost:3000/authors');
        const authors = response.data;
        return authors.length ? Math.max(...authors.map(author => author.id)) + 1 : 1; 
      } catch (error) {
        console.error('Error fetching authors:', error);
        return 1; 
      }
    };

    const getNextBookId = async () => {
      try {
        const response = await axios.get('http://localhost:3000/authors');
        const authors = response.data;
        const allBooks = authors.flatMap(author => author.books);
        return allBooks.length ? Math.max(...allBooks.map(book => book.book_id)) + 1 : 1; 
      } catch (error) {
        console.error('Error fetching authors:', error);
        return 1; 
      }
    };

    const updateFields = () => {
      newAuthor.value.fields = newBook.value.title; 
    };

    return {
      newAuthor,
      newBook,
      createAuthor,
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
