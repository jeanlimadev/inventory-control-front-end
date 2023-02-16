<template>
  <main class="page">
    <h1>Compras</h1>
    <ListSalesAndPurchases route="purchases" :modal-items="listItems" />
  </main>
</template>

<script lang="ts">
import ListSalesAndPurchases from "@/components/ListSalesAndPurchases.vue";

export default {
  name: "PurchasesView",
  data() {
    return {
      listItems: [
        { name: "Fornecedor", prop: "supplier_name", editable: true },
        { name: "Produto", prop: "product_name", editable: true },
        { name: "Quantidade", prop: "amount", editable: true },
        { name: "Custo", prop: "cost", editable: true },
      ],
    };
  },
  components: { ListSalesAndPurchases },
};
</script>
