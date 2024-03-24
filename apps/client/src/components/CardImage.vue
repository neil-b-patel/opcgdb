<script setup lang="ts">
  import { useRuntimeConfig } from '#imports';

  import type { OPCard } from '@opcgdb/data';

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

  if (props.class) {
    cardClasses.push(props.class);
  }
</script>

<template>
  <component
    :is="props.isLink ? 'NuxtLink' : 'div'"
    v-bind="props.isLink ? { to: `/card/${props.card.id}` } : null"
    :class="cardClasses"
  >
    <img
      :src="`${config.public.cdn_url}/cardlist/${props.lang}/${props.card.id}.webp`"
      :alt="props.card.name"
      :width="props.width"
    />
  </component>
</template>
