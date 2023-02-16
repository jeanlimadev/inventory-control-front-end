<template>
  <div class="optionsIcons">
    <ph-pen @click="openModal" weight="duotone" size="20px" cursor="pointer" />

    <ph-trash
      @click="deleteItem"
      weight="duotone"
      size="20px"
      cursor="pointer"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { PhPen, PhTrash } from "phosphor-vue";
import Swal from "sweetalert2";

import type { IModalInput } from "@/dtos/IModalInput";

export default defineComponent({
  name: "ProductOptions",
  data() {
    return {
      showModal: false,
      product: Object,
      isDeleted: 0,
    };
  },
  props: {
    item: {
      type: Object,
      required: true,
    },
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
    product(newValue) {
      this.$emit("onItemDataChange", newValue);
    },
    isDeleted(newValue) {
      this.$emit("onItemDataChange", newValue);
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
                    if (this.item.supplier_id === supplier.id) {
                      return `<option value="${supplier.id}" selected>${supplier.name}</option>`;
                    } else {
                      return `<option value="${supplier.id}">${supplier.name}</option>`;
                    }
                  })}
                </select> 
              </div>

              <div class="modalInput">
                <label>Produto:</label>
                <select class="swal2-input" id="item" name="Produto" accessKey="product_id">
                  ${products.map((product: any) => {
                    if (this.item.product_id === product.id) {
                      return `<option value="${product.id}" selected>${product.name}</option>`;
                    } else {
                      return `<option value="${product.id}">${product.name}</option>`;
                    }
                  })}
                </select>
              </div>
              
              <div class="modalInput">
                <label>Quantidade:</label>
                <input type="number" class="swal2-input" id="item" name="amount" value="${
                  this.item.amount
                }" accessKey="amount"/>
              </div>

              <div class="modalInput">
                <label>Preço:</label>
                <input type="number" class="swal2-input" value="${
                  this.item.cost
                }" id="item" name="cost" accessKey="cost"/>
              </div>
            </div> `;

      Swal.fire({
        title: `Edição de Item`,
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

          return await fetch(
            `${import.meta.env.VITE_API_URL}/${this.route}/${this.item.id}`,
            {
              method: "PATCH",
              headers: {
                Authorization: `Bearer ${this.$cookies.get("token")}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify(objectReturn),
            }
          )
            .then((response) => response.json())
            .then((data) => (this.product = data));
        },
      });
    },
    deleteItem() {
      Swal.fire({
        title: "Tem certeza que deseja excluir este item?",
        text: "Você não poderá desfazer esta ação!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Confirmar",
        cancelButtonText: "Cancelar",
      }).then((result) => {
        if (result.isConfirmed) {
          fetch(
            `${import.meta.env.VITE_API_URL}/${this.route}/${this.item.id}`,
            {
              method: "DELETE",
              headers: {
                Authorization: `Bearer ${this.$cookies.get("token")}`,
              },
            }
          ).then((response) => {
            if (response.status === 200) {
              Swal.fire(
                "Sucesso!",
                "Seu item foi excluído com sucesso.",
                "success"
              );
              this.isDeleted = response.status;
            }
          });
        }
      });
    },
  },
});
</script>

<style>
.optionsIcons {
  display: flex;
  justify-content: space-around;
}
</style>
