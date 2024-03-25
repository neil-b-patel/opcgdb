<script lang="ts" setup>
  import type { OPCard } from '@opcgdb/data';

  import CardImage from '~/components/CardImage.vue';

  const props = defineProps<{
    cards: OPCard[];
  }>();
</script>

<template>
  <section class="card-grid inner-wrapper">
    <CardImage v-for="card in props.cards" :key="card.id" :card="card" :width="300" />
  </section>
</template>

<style scoped>
  .card-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: var(--spacing-md);
    margin-top: var(--spacing-lg);
    width: 100%;
  }
</style>
