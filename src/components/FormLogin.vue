<template>
  <div class="container">
    <form @submit.prevent="$emit('handleSubmit', user)">
      <div class="input-div">
        <label> Email: </label>
        <input
          type="email"
          placeholder="example@email.com"
          v-model="user.email"
        />
      </div>
      <div class="input-div">
        <label> Password: </label>
        <input type="password" v-model="user.password" />
      </div>
      <button type="submit">Login</button>
      <span class="errorMessage">{{ errorMessage }}</span>
    </form>
    <div class="banner">
      <img class="banner-login" src="../../images/banner-login.jpg" alt="" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import "../assets/sass/components/login.scss";

export default defineComponent({
  name: "FormLogin",
  data() {
    return {
      user: {
        email: "",
        password: "",
      },
    };
  },
  mounted() {},
  props: {
    errorMessage: {
      type: String,
      required: false,
    },
  },
  emits: ["handleSubmit"],
});
</script>
