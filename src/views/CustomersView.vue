<template>
  <main class="page">
    <h1>Clientes</h1>
    <ListTable route="customers" :modal-items="modalItems" />
  </main>
</template>

<script lang="ts">
import ListTable from "@/components/ListTable.vue";

export default {
  name: "CustomersView",
  data() {
    return {
      modalItems: [
        { name: "Nome", prop: "name", editable: true },
        { name: "Nº Documento", prop: "document_number", editable: true },
      ],
    };
  },
  components: { ListTable },
};
</script>
