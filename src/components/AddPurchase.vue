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

import type { IModalInput } from "@/dtos/IModalInput";

import "../assets/sass/components/addItem.scss";

export default defineComponent({
  name: "AddSaleOrPurchase",
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
      const products = await fetch(`${import.meta.env.VITE_API_URL}/products`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${this.$cookies.get("token")}`,
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => data);

      const suppliers = await fetch(
        `${import.meta.env.VITE_API_URL}/suppliers`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${this.$cookies.get("token")}`,
            "Content-Type": "application/json",
          },
        }
      )
        .then((response) => response.json())
        .then((data) => data);

      const htmlModal = `
            <div class="modalItem">
              <div class="modalInput">
                <label>Nome:</label>
                <select class="swal2-input" id="item" name="Cliente" accessKey="supplier_id">
                  ${suppliers.map((supplier: any) => {
                    return `<option value="${supplier.id}">${supplier.name}</option>`;
                  })}
                </select> 
              </div>

              <div class="modalInput">
                <label>Produto:</label>
                <select class="swal2-input" id="item" name="Produto" accessKey="product_id">
                  ${products.map((product: any) => {
                    return `<option value="${product.id}">${product.name}</option>`;
                  })}
                </select>
              </div>
              
              <div class="modalInput">
                <label>Quantidade:</label>
                <input type="number" class="swal2-input" id="item" name="amount" accessKey="amount"/>
              </div>

              <div class="modalInput">
                <label>Preço:</label>
                <input type="number" class="swal2-input" id="item" name="cost" accessKey="cost"/>
              </div>
            </div> `;

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
            if (curr.accessKey === "amount" || curr.accessKey === "cost") {
              Object.assign(acc, {
                [curr.accessKey]: Number(curr.value),
              });
            } else {
              Object.assign(acc, {
                [curr.accessKey]: curr.value,
              });
            }

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
