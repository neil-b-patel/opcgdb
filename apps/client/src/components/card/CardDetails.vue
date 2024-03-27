<script setup lang="ts">
  import type { OPCard } from '@opcgdb/types';

  import CardImage from '~/components/CardImage.vue';
  import { useDb } from '~/composables/useDb';

  const { getCardsByNumber, getSetById } = useDb();

  defineProps<{
    card: OPCard;
  }>();
</script>

<template>
  <section class="card-details">
    <div class="inner-wrapper">
      {{ card }}
      <div class="main-info">
        <div class="image col">
          <CardImage :card="card" :width="200" :isLink="false" />
        </div>
        <div class="details col">
          <h1>{{ card.name }}</h1>

          <p v-if="card.number">Number: {{ card.number }}</p>
          <p v-if="card.cost">Cost: {{ card.cost }}</p>
          <p v-if="card.life">Life: {{ card.life }}</p>
          <p v-if="card.attribute">Attribute: {{ card.attribute }}</p>
          <p v-if="card.power">Power: {{ card.power }}</p>
        </div>
        <div class="versions col">
          <p>Set: {{ card.set }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
  .card-details {
    .main-info {
      display: flex;
      justify-content: space-evenly;

      .col {
        width: 33%;
      }
    }
  }
</style>
