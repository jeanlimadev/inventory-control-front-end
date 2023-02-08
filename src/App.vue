<template>
  <TheHeader v-if="!$route.meta.hideNavBar" />
  <RouterView />
</template>

<script setup lang="ts">
import { RouterView } from "vue-router";
import TheHeader from "./components/TheHeader.vue";
</script>
