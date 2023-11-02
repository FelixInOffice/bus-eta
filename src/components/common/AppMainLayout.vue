<template>
  <div class="main__wrapper">
    <div class="container">
      <slot />
    </div>
    <NavBar />
  </div>
</template>

<script setup>
import NavBar from './NavBar.vue'
</script>