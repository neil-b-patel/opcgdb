<script setup lang="ts">
  import { defineNuxtLink, useRuntimeConfig } from '#imports';
  import { computed } from 'vue';

  import type { OPCard } from '@opcgdb/types';

  const config = useRuntimeConfig();

  const props = withDefaults(
    defineProps<{
      card: OPCard;
      lang?: string;
      isLink?: boolean;
      width?: number;
      class?: string;
    }>(),
    { isLink: true, lang: 'en', width: 168 }
  );

  const cardClasses = ['card', `card--${props.card.id}`];
  const Wrapper = computed(() => (props.isLink ? defineNuxtLink({}) : 'div'));

  if (props.class) {
    cardClasses.push(props.class);
  }
</script>

<template>
  <Wrapper v-bind="props.isLink ? { to: `/card/${props.card.id}` } : null" :class="cardClasses">
    <img
      :src="`${config.public.cdn_url}/cardlist/${props.lang}/${props.card.id}.webp`"
      :alt="props.card.name"
      :width="props.width"
    />
  </Wrapper>
</template>

<style scoped>
  a {
    cursor: pointer;
    display: block;
  }
  img {
    box-shadow: var(--shadow-4);
    width: 100%;
    border-radius: 14px;
  }
</style>
