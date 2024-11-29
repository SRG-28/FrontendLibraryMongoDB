<template>
  <div class="centered-container">
    <h1>Publishers List</h1>
    <ul v-if="publishers.length">
      <li v-for="publisher in publishers" :key="publisher._id" class="publisher-item">
        <h2>{{ publisher.publisher }} ({{ publisher.country }})</h2>
        <p>Founded in {{ publisher.founded }}</p>  
        <button @click="viewPublisher(publisher.id)" class="btn-view-details">View Details</button>
      </li>
      <button @click="createPublisher" class="btn-create">Create a new publisher</button>
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
      publishers: []
    };
  },
  created() {
    this.fetchPublishers();
  },
  methods: {
    async fetchPublishers() {
      try {
        const response = await axios.get('http://localhost:3000/publishers');
        this.publishers = response.data;
      } catch (error) {
        console.error('Error fetching publishers:', error);
      }
    },
    viewPublisher(id) {
      this.$router.push(`/publishers/${id}`);
    },
    createPublisher() {
      this.$router.push('/publishers/create');
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

.publisher-item {
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
