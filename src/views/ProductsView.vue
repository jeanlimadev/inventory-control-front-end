<template>
  <main class="page">
    <div>
      <h1>Products</h1>
      <List />
    </div>
  </main>
</template>

<script lang="ts">
import List from "@/components/ListProducts.vue";

export default {
  name: "ProductsView",
  components: { List },
};
</script>
