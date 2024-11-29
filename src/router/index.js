import { createRouter, createWebHistory } from 'vue-router';
import Authors from '../components/Authors.vue';
import Publishers from '../components/Publishers.vue';
import AuthorDetails from '../components/AuthorDetails.vue';
import EditAuthor from '../components/EditAuthor.vue';
import CreateAuthor from '../components/AuthorCreate.vue';
import CreatePublisher from '../components/PublisherCreate.vue';
import PublisherDetails from '../components/PublisherDetails.vue';
import EditPublisher from '../components/EditPublisher.vue';

const routes = [
  { path: '/', component: Authors },
  { path: '/authors', component: Authors },
  { path: '/publishers', component: Publishers },
  { path: '/authors/:id', component: AuthorDetails },
  { path: '/authors/edit/:id', component: EditAuthor },
  { path: '/authors/create', component: CreateAuthor},
  { path: '/publishers/create', component: CreatePublisher},
  { path: '/publishers/:id', component: PublisherDetails},
  { path: '/publishers/edit/:id', component: EditPublisher},
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

