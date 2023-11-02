<template>
  <div class="navBar__wrapper">
    <RouterLink
      class="navBar__wrapper--navItem"
      v-for="(navItem, idx) in navMenu.content"
      :to="{name: navItem.pathName, params: {id: navItem.id}}"
      :key="idx"
      replace
    >
      {{ navItem.name }}
    </RouterLink>
  </div>
</template>

<script setup>
import navMenu from "@/pageData/navMenu";
import { RouterLink } from "vue-router";
</script>
