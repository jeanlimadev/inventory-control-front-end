<template>
  <div class="addItem">
    <a @click="openModal">
      <ph-plus-circle weight="duotone" size="20px" cursor="pointer" />
      <span>Adicionar novo</span>
    </a>
  </div>
</template>

<script lang="ts">
import { PhPlusCircle } from "phosphor-vue";
import Swal from "sweetalert2";
import { defineComponent } from "vue";

import type { IModalItems } from "@/dtos/IModalItems";
import type { HtmlAttributes } from "csstype";
import type { IModalInput } from "@/dtos/IModalInput";

import "../assets/sass/components/addItem.scss";

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
    modalItems: {
      type: Object,
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
      const htmlModal = this.modalItems.reduce(
        (acc: HtmlAttributes, curr: IModalItems) => {
          if (curr.editable) {
            acc += `
            <div class="modalItem">
              <div class="modalInput">
                <label>${curr.name}:</label>
                <input type="text" class="swal2-input" id="item" name="${curr.name}" accessKey="${curr.prop}"/>  
              </div>
            </div> `;
          }

          return acc;
        },
        ""
      );

      Swal.fire({
        title: `Inclusão de Item`,
        html: String(htmlModal),
        showCancelButton: true,
        cancelButtonText: "Cancelar",
        confirmButtonText: "Salvar",
        showLoaderOnConfirm: true,
        preConfirm: async () => {
          const htmlElements = document.querySelectorAll("#item");

          const htmlElementsToArray = Array.from(htmlElements) as IModalInput[];

          const hasEmptyInput = htmlElementsToArray.find(
            (element) => !element.value.trim()
          );

          if (hasEmptyInput) {
            Swal.showValidationMessage(
              `O campo ${hasEmptyInput.name} é obrigatório!`
            );
            return;
          }

          const objectReturn = htmlElementsToArray.reduce((acc, curr) => {
            Object.assign(acc, {
              [curr.accessKey]: curr.value,
            });

            return acc;
          }, {});

          return await fetch(`${import.meta.env.VITE_API_URL}/${this.route}`, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${this.$cookies.get("token")}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(objectReturn),
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
