<script lang="ts" setup>
  import type { OPCard } from '@opcgdb/types';

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
  @import '~/styles/media';
  .card-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: var(--spacing-md);
    margin: var(--spacing-lg) auto;
    width: 100%;

    @media (--mobile) {
      grid-template-columns: repeat(2, 1fr);
      gap: var(--spacing-sm);
    }

    @media (--medium-mobile) {
      grid-template-columns: repeat(3, 1fr);
    }
  }
</style>
