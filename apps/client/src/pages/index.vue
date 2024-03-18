<script setup lang="ts">
  import { cards } from '@opcgdb/data';

  const cardList = cards['en'];

  useSeoMeta({
    title: 'Home | opcgdb',
  });
</script>

<template>
  <ul>
    <li v-for="card in cardList" :key="card.id">
      <nuxt-link :to="`/card/${card.id}`">{{ card.name }}</nuxt-link>
    </li>
  </ul>
</template>
