import Vue from "vue";
import VueRouter from "vue-router";
import ExampleStudyPlan from "../views/ExampleStudyPlan.vue";
import Login from "../views/Login.vue";
import StudyPlan from "../views/StudyPlan.vue";
import Help from "../views/Help.vue";
import Profile from "../views/Profile.vue";
import Register from "../views/Register.vue";
import ProgramSelection from "../views/ProgramSelection.vue";
import BaseModalChildCourse from "../components/BaseModalChildCourse.vue";
import BaseModalParentCourse from "../components/BaseModalParentCourse.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  {
    path: "/select-program",
    name: "ProgramSelection",
    component: ProgramSelection,
  },
  {
    path: "/my-studyplan",
    name: "StudyPlan",
    component: StudyPlan,
    children: [
      {
        path: ":program/:version/:code/:semester",
        component: BaseModalParentCourse,
        name: "baseModalParentCourse",
      },
      {
        path: ":program/:version/:parentCode/:code/:semester",
        component: BaseModalChildCourse,
        name: "baseModalChildCourse",
      },
    ],
  },
  {
    path: "/example-studyplan",
    name: "ExampleStudyPlan",
    component: ExampleStudyPlan,
    children: [
      {
        path: ":program/:version/:code",
        component: BaseModalParentCourse,
        name: "exampleStudyplanBaseModalParentCourse",
      },
      {
        path: ":program/:version/:parentCode/:code",
        component: BaseModalChildCourse,
        name: "exampleStudyplanBaseModalChildCourse",
      },
    ],
  },
  {
    path: "/hilfe",
    name: "Help",
    component: Help,
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const publicPages = ["/login", "/register", "/help"];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem("user");

  // trying to access a restricted page + not logged in
  // redirect to login page
  if (authRequired && !loggedIn) {
    next("/login");
  } else {
    next();
  }
});

export default router;
