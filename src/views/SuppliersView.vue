<template>
  <main class="page">
    <h1>Fornecedores</h1>
    <ListTable route="suppliers" :modal-items="modalItems" />
  </main>
</template>

<script lang="ts">
import ListTable from "@/components/ListTable.vue";

export default {
  name: "SuppliersView",
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
