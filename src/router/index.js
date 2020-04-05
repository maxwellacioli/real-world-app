import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Repository from "../views/Repository.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/repository/:name",
    name: "Repository",
    component: Repository,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
