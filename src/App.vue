<template>
  <div>
    <nav>
      <router-link to="/authors" class="nav-link">Authors</router-link> 
      <router-link to="/publishers" class="nav-link">Publishers</router-link>
    </nav>
    <router-view></router-view>
  </div>
</template>

<style scoped>
nav {
  margin-bottom: 20px;
  margin-top: 20px;
  padding: 10px;
  border-radius: 5px;
  display: flex;
  justify-content: center;
}

.nav-link {
  color: white;
  background-color: #b22222; 
  padding: 10px 20px;
  text-decoration: none;
  margin-right: 10px;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.nav-link:hover {
  background-color: red; 
}

.nav-link:active {
  background-color: #8b0000; 
}
</style>
