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
      type: Array,
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
      const htmlModal = this.modalItems.reduce((acc, curr) => {
        acc += `
        <div>
          <input type="text" class="swal2-input" id="item" name="${curr}" value="${
          this.item[String(curr)]
        }"/>
        </div> `;
        return acc;
      }, "");

      Swal.fire({
        title: `Edição de Item`,
        html: String(htmlModal),
        showCancelButton: true,
        cancelButtonText: "Cancelar",
        confirmButtonText: "Salvar",
        showLoaderOnConfirm: true,
        preConfirm: async () => {
          const htmlElements = document.querySelectorAll("#item");

          const htmlElementsToArray = Array.from(htmlElements);

          const objectReturn = htmlElementsToArray.reduce((acc, curr) => {
            Object.assign(acc, {
              [curr.name]: curr.value,
            });

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
