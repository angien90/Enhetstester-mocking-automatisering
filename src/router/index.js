import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Cart from '../views/Cart.vue'
import AboutUs from '../views/AboutUs.vue'
import ContactUs from '../views/ContactUs.vue'
import Admin from '../views/Admin.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/cart', name: 'Cart', component: Cart },
  { path: '/AboutUs', name: 'AboutUs', component: AboutUs },
  { path: '/ContactUs', name: 'ContactUs', component: ContactUs },
  { path: '/Admin', name: 'Admin', component: Admin }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router