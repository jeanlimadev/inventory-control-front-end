<template>
  <div class="addItem">
    <a @click="openModal">
      <ph-plusCircle weight="duotone" size="20px" cursor="pointer" />
      <span>Adicionar novo</span>
    </a>
  </div>
</template>

<script lang="ts">
import { PhPlusCircle } from "phosphor-vue";
import Swal from "sweetalert2";
import { defineComponent } from "vue";

export default defineComponent({
  name: "AddItem",
  data() {
    return {
      include: null,
    };
  },
  props: {
    route: {
      type: String,
      required: true,
    },
  },
  watch: {
    include(newValue) {
      this.$emit("included", newValue);
    },
  },
  methods: {
    async openModal() {
      // const htmlModal = this.modalItems.reduce((acc, curr) => {
      //   acc += `
      //   <div>
      //     <input type="text" class="swal2-input" id="item" name="${curr}" value="${
      //     this.item[String(curr)]
      //   }"/>
      //   </div> `;
      //   return acc;
      // }, "");

      const htmlModal = `
        <div>
          <input type="text" class="swal2-input" id="item" placeholder="Nome" />
        </div> `;

      Swal.fire({
        title: `Inclusão de Item`,
        html: String(htmlModal),
        showCancelButton: true,
        cancelButtonText: "Cancelar",
        confirmButtonText: "Salvar",
        showLoaderOnConfirm: true,
        preConfirm: async () => {
          const htmlElements = document.querySelector("#item");

          return await fetch(`${import.meta.env.VITE_API_URL}/${this.route}`, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${this.$cookies.get("token")}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: htmlElements.value,
            }),
          })
            .then((response) => response.json())
            .then((data) => {
              this.include = data;
            });
        },
      });
    },
  },
});
</script>
