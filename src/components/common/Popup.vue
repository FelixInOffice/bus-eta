<template>
  <div class="popup__wrapper">
    <div class="popup__container">
      <div class="popup__container--title">
        {{ title }}
      </div>
      <div class="popup__container--content">
        {{ content }}
      </div>
      <div class="popup__container--buttons">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
});
</script>