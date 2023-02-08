<template>
  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Document Number</th>
        <th>Options</th>
      </tr>
    </thead>
    <tbody>
      <tr :key="item.id" v-for="item in items">
        <td>{{ item.name }}</td>
        <td>{{ item.document_number }}</td>
        <td>
          <OptionsIcons
            :item="item"
            route="customers"
            :modal-items="modalItems"
          />
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";
import "../assets/sass/components/listComponents.scss";

import OptionsIcons from "./OptionsIcons.vue";

interface Product {
  id: string;
  name: string;
  document_number: string;
  created_at: string;
}

export default defineComponent({
  name: "ListCustomers",
  data() {
    const items: Product[] = [];
    const modalItems = ["name", "document_number"];
    return {
      items,
      modalItems,
    };
  },
  components: { OptionsIcons },
  mounted() {
    this.getItemsList("customers");
  },
  methods: {
    async getItemsList(name: string) {
      const token = this.$cookies.get("token");

      const response = await axios
        .get(`${import.meta.env.VITE_API_URL}/${name}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => response.data);

      this.items = response;
    },
  },
});
</script>
