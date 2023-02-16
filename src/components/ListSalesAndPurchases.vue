<template>
  <AddPurchase
    :modal-items="modalItems"
    :route="route"
    @included="onItemDataChange"
  />
  <table>
    <thead>
      <tr>
        <th v-for="item in modalEditableItems" :key="item.name">
          {{ item.name }}
        </th>
        <th>Total</th>
        <th>Opções</th>
      </tr>
    </thead>
    <tbody :key="item.id" v-for="item in items">
      <tr>
        <td :key="name.name" v-for="name in modalEditableItems">
          {{ item[name.prop] }}
        </td>
        <td>{{ item.amount * item.cost }}</td>
        <td>
          <PurchaseOptionsIcons
            :item="item"
            :route="route"
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
import type { PropType } from "vue";
import axios from "axios";

import PurchaseOptionsIcons from "./PurchaseOptionsIcons.vue";
import AddPurchase from "./AddPurchase.vue";

import type { IModalItems } from "@/dtos/IModalItems";

import "../assets/sass/components/listComponents.scss";

export default defineComponent({
  name: "ListSalesAndPurchases",
  data() {
    const items: any[] = [];
    const modalEditableItems = this.modalItems.filter((item) => item.editable);
    return {
      items,
      showModal: false,
      modalEditableItems,
    };
  },
  props: {
    route: {
      type: String,
      required: true,
    },
    modalItems: {
      type: Array as PropType<IModalItems[]>,
      required: true,
    },
  },
  components: { PurchaseOptionsIcons, AddPurchase },
  mounted() {
    this.getItemsList();
  },
  methods: {
    async getItemsList() {
      const token = this.$cookies.get("token");

      const response = await axios
        .get(`${import.meta.env.VITE_API_URL}/${this.route}/filter`, {
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
