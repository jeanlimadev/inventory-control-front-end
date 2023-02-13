<template>
  <AddItem
    :modal-items="modalItems"
    :route="route"
    @included="onItemDataChange"
  />
  <table>
    <thead>
      <tr>
        <th v-for="item in modalItems" :key="item.name">{{ item.name }}</th>
        <th>Opções</th>
      </tr>
    </thead>
    <tbody :key="item.id" v-for="item in items">
      <tr>
        <td :key="name" v-for="name in modalItems">{{ item[name.prop] }}</td>
        <td>
          <OptionsIcons
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

import OptionsIcons from "./OptionsIcons.vue";
import AddItem from "./AddItem.vue";

import type { IModalItems } from "@/dtos/IModalItems";

import "../assets/sass/components/listComponents.scss";

export default defineComponent({
  name: "ListProducts",
  data() {
    const items: [] = [];
    return {
      items,
      showModal: false,
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
  components: { OptionsIcons, AddItem },
  mounted() {
    this.getItemsList();
  },
  methods: {
    async getItemsList() {
      const token = this.$cookies.get("token");

      const response = await axios
        .get(`${import.meta.env.VITE_API_URL}/${this.route}`, {
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
