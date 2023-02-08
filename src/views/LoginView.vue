<template>
  <FormLogin :errorMessage="errorMessage" @handleSubmit="submitLogin" />
</template>

<script lang="ts">
import FormLogin from "../components/FormLogin.vue";
import { defineComponent } from "vue";

interface User {
  email: string;
  password: string;
}

export default defineComponent({
  name: "TheLogin",
  components: { FormLogin },
  data() {
    return {
      errorMessage: "",
    };
  },
  methods: {
    async submitLogin(user: User) {
      if (!user.email) {
        this.errorMessage = "O campo e-mail é obrigatório";
        return;
      } else if (!user.password) {
        this.errorMessage = "O campo password é obrigatório";
        return;
      }

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/users/auth`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        }
      )
        .then((response) => response.json())
        .then((data) => {
          return data;
        });

      if (response.error) {
        this.errorMessage = "Email ou senha incorretos!";
      }

      if (response.token) {
        this.$cookies.set("token", response.token);
      }

      if (this.$route.query.redirect) {
        this.$router.push(String(this.$route.query.redirect));
      } else {
        this.$router.push("/");
      }
    },
  },
});
</script>
