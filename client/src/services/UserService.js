import axios from "axios";
import authHeader from "./AuthHeader";

// let url;
// if (process.env.NODE_ENV == "production") {
//   console.log("hier");
//   url = "https://studyplan.herokuapp.com";
// } else {
//   url = "http://localhost:3000";
//   console.log("hier2");
// }
const server = axios.create({
  baseURL: "https://studyplan.herokuapp.com",
});

export default {
  login(user) {
    return server
      .post("/users/login", {
        username: user.username,
        password: user.password,
      })
      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response.data;
      });
  },

  logout() {
    localStorage.removeItem("user");
  },

  register(user) {
    return server.post("users/register", {
      username: user.username,
      email: user.email,
      password: user.password,
    });
  },
  updateUser(user) {
    const id = user.id || user._id;
    return server
      .put(`users/${id}`, user, {
        headers: authHeader(),
      })
      .then((response) => {
        localStorage.setItem("user", JSON.stringify(response.data));
        return response.data;
      });
  },
  updatePassword(user, oldPassword, newPassword) {
    const id = user.id || user._id;
    return server
      .put(
        `users/${id}/updatePassword`,
        { oldPassword: oldPassword, newPassword: newPassword },
        {
          headers: authHeader(),
        }
      )
      .then((response) => {
        return response.data;
      });
  },
  resetPassword(email) {
    return server
      .post("users/reset-password", { email: email })
      .then((response) => {
        return response.data;
      });
  },
  resendVerificationEmail(email) {
    return server.post("users/resend", { email: email }).then((response) => {
      return response.data;
    });
  },
};
