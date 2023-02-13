<template>
  <main class="page">
    <h1>Products</h1>
    <ListTable route="products" :modal-items="listItems" />
  </main>
</template>

<script lang="ts">
import ListTable from "@/components/ListTable.vue";

export default {
  name: "ProductsView",
  data() {
    return {
      listItems: [
        { name: "Nome", prop: "name", editable: true },
        { name: "Estoque", prop: "inventory", editable: false },
      ],
    };
  },
  components: { ListTable },
};
</script>
