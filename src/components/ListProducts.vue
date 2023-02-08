<template>
  <AddItem route="products" @included="onItemDataChange" />
  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Estoque</th>
        <th>Opções</th>
      </tr>
    </thead>
    <tbody>
      <tr :key="item.id" v-for="item in items">
        <td>{{ item.name }}</td>
        <td>{{ item.inventory }}</td>
        <td>
          <OptionsIcons
            :item="item"
            route="products"
            :modal-items="modalItems"
            @onItemDataChange="onItemDataChange"
          />
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";

import OptionsIcons from "./OptionsIcons.vue";
import AddItem from "./AddItem.vue";

import "../assets/sass/components/listComponents.scss";

interface Product {
  id: string;
  name: string;
  created_at: string;
  inventory: number;
}

export default defineComponent({
  name: "ListProducts",
  data() {
    const items: Product[] = [];
    const modalItems = ["name"];
    return {
      items,
      showModal: false,
      modalItems,
    };
  },
  components: { OptionsIcons, AddItem },
  mounted() {
    this.getItemsList();
  },
  methods: {
    async getItemsList() {
      const token = this.$cookies.get("token");

      const response = await axios
        .get(`${import.meta.env.VITE_API_URL}/products`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => response.data);

      this.items = response;
    },
    onItemDataChange() {
      this.getItemsList();
    },
  },
});
</script>
