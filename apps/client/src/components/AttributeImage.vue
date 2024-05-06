<script setup lang="ts">
  import { useRuntimeConfig } from '#imports';
  import { computed } from 'vue';

  const config = useRuntimeConfig();

  const props = defineProps<{
    attribute: string;
  }>();

  const attributeUrl = computed(() => {
    return `${config.public.cdn_url}/cardlist/attributes/${props.attribute.toLowerCase()}.webp`;
  });
</script>

<template>
  <div class="wrapper">
    <img :src="attributeUrl" alt="" :width="62" />
    <span>{{ props.attribute }}</span>
  </div>
</template>

<style scoped>
  .wrapper {
    display: inline-flex;
    justify-content: center;
    align-items: center;
  }
  img {
    display: block;
    width: var(--size-4);
    margin-right: var(--spacing-xxs);
  }

  span {
    text-align: center;
  }
</style>
