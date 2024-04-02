<script setup lang="ts">
  import { defineNuxtLink, useRuntimeConfig } from '#imports';
  import { computed } from 'vue';

  import type { OPCard } from '@opcgdb/types';

  import { getCardUrl } from '~/utils/getCardUrl';

  const config = useRuntimeConfig();

  const props = withDefaults(
    defineProps<{
      card: OPCard;
      isLink?: boolean;
      width?: number;
      class?: string;
    }>(),
    { isLink: true, lang: 'en', width: 168 }
  );

  const cardClasses = ['card', `card--${props.card.id}`];
  const Wrapper = computed(() => (props.isLink ? defineNuxtLink({}) : 'div'));
  const cardUrl = computed(() => getCardUrl(props.card));

  if (props.class) {
    cardClasses.push(props.class);
  }
</script>

<template>
  <Wrapper v-bind="props.isLink ? { to: cardUrl } : null" :class="cardClasses">
    <img
      :src="`${config.public.cdn_url}/cardlist/${props.card.lang}/${props.card.id}.webp`"
      :alt="props.card.name"
      :width="props.width"
    />
  </Wrapper>
</template>

<style scoped>
  .card {
    aspect-ratio: 5/7;
    display: block;
    margin: 0;
    line-height: 0;
    border-radius: 16px;
    position: relative;
    background-color: #dddbdd;
    overflow: hidden;

    &::after {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      transform: translateX(-100%);
      background: linear-gradient(
        to right,
        rgba(255, 255, 255, 0) 0%,
        rgba(255, 255, 255, 0.2) 20%,
        rgba(255, 255, 255, 0.5) 60%,
        rgba(255, 255, 255, 0) 100%
      );
      animation: shimmer 4s 10s;
      content: '';
      pointer-events: none;
    }

    a {
      cursor: pointer;
    }

    img {
      box-shadow: var(--shadow-4);
      width: 100%;
      border-radius: 14px;
      vertical-align: middle;
      aspect-ratio: 5/7;
      position: relative;
      z-index: 1;
    }

    @keyframes shimmer {
      100% {
        transform: translateX(100%);
      }
    }
  }
</style>
