import Vue from "vue";
import Vuex from "vuex";
import * as program from "@/store/modules/program.js";
import * as studyplan from "@/store/modules/studyplan.js";
import * as course from "@/store/modules/course.js";
import * as semester from "@/store/modules/semester.js";
import * as user from "@/store/modules/user.js";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    program,
    studyplan,
    course,
    semester,
    user,
  },
});
