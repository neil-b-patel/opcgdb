<script setup lang="ts">
  import { cards } from '@opcgdb/data';

  const route = useRoute();

  useSeoMeta({
    title: `Card ${route.params.id} | opcgdb`,
  });

  const card = cards['en'].find((card) => card.id === route.params.id);
</script>

<template>
  <div>
    <h1>{{ card.name }}</h1>
    <img :src="`/cardlist/en/${card.id}.png`" :alt="card.name" />
    <table>
      <tbody>
        <tr v-if="card.id">
          <td>id</td>
          <td>{{ card.id }}</td>
        </tr>
        <tr v-if="card.number">
          <td>number</td>
          <td>{{ card.number }}</td>
        </tr>
        <tr v-if="card.set">
          <td>set</td>
          <td>{{ card.set }}</td>
        </tr>
        <tr v-if="card.rarity">
          <td>rarity</td>
          <td>{{ card.rarity }}</td>
        </tr>
        <tr v-if="card.color">
          <td>color</td>
          <td>{{ card.color.join(', ') }}</td>
        </tr>
        <tr v-if="card.category">
          <td>category</td>
          <td>{{ card.category }}</td>
        </tr>
        <tr v-if="card.type">
          <td>type</td>
          <td>{{ card.type.join(', ') }}</td>
        </tr>
        <tr v-if="card.name">
          <td>name</td>
          <td>{{ card.name }}</td>
        </tr>
        <tr v-if="card.cost">
          <td>cost</td>
          <td>{{ card.cost }}</td>
        </tr>
        <tr v-if="card.life">
          <td>life</td>
          <td>{{ card.life }}</td>
        </tr>
        <tr v-if="card.attribute">
          <td>attribute</td>
          <td>{{ card.attribute }}</td>
        </tr>
        <tr v-if="card.effect">
          <td>effect</td>
          <td>{{ card.effect }}</td>
        </tr>
        <tr v-if="card.power">
          <td>power</td>
          <td>{{ card.power }}</td>
        </tr>
        <tr v-if="card.counter">
          <td>counter</td>
          <td>{{ card.counter }}</td>
        </tr>
        <tr v-if="card.trigger">
          <td>trigger</td>
          <td>{{ card.trigger }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
