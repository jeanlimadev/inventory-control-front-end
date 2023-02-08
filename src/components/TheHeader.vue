<template>
  <header>
    <nav>
      <RouterLink class="link" to="/">Home</RouterLink>
      <RouterLink class="link" to="/products">Produtos</RouterLink>
      <RouterLink class="link" to="/customers">Clientes</RouterLink>
      <RouterLink class="link" to="/suppliers">Fornecedores</RouterLink>
      <span class="logoff" @click="logoff">Logoff</span>
    </nav>
  </header>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import "../assets/sass/components/header.scss";

export default defineComponent({
  name: "TheHeader",
  data() {
    return {};
  },
  methods: {
    logoff() {
      this.$cookies.remove("token");
      this.$router.push("/login");
    },
  },
});
</script>
