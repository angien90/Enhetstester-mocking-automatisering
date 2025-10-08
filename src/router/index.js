import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Cart from '../views/Cart.vue'
import AboutUs from '../views/AboutUs.vue'
import ContactUs from '../views/ContactUs.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/cart', name: 'Cart', component: Cart },
  { path: '/AboutUs', name: 'AboutUs', component: AboutUs },
  { path: '/ContactUs', name: 'ContactUs', component: ContactUs }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
