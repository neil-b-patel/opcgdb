<script setup lang="ts">
  import CardImage from '~/components/CardImage.vue';
  import { useRandomCards } from '~/composables/useRandomCards';

  const bottomCards = useRandomCards(7);
</script>

<template>
  <ClientOnly>
    <div class="cards">
      <div class="cards__inner inner-wrapper">
        <CardImage v-for="(card, idx) in bottomCards" :card="card" :class="`card--${idx}`" />
      </div>
    </div>
  </ClientOnly>
</template>

<style scoped>
  .cards {
    position: absolute;
    bottom: 0;
    height: 200px;
    left: 0;
    overflow: hidden;
    position: absolute;
    width: 100%;

    &__inner {
      position: relative;
      bottom: 0;
      width: 655px;
      display: flex;
      overflow: hidden;
      height: 100%;
    }

    .card {
      display: block;
      cursor: pointer;
      position: absolute;
      width: 168px;
      height: 200px;
      transition: 0.3s var(--ease-1);
      transform: translateY(0);
      box-shadow: var(--shadow-3);

      &:hover {
        transform: translateY(-10px);
      }

      &--0 {
        top: 15%;
        left: 0;
      }

      &--1 {
        top: 10%;
        left: 25%;
      }

      &--2 {
        top: 12%;
        left: 50%;
      }

      &--3 {
        top: 15%;
        right: 0;
      }

      &--4 {
        top: 45%;
        left: 10%;
      }
      &--5 {
        top: 37%;
        left: 37%;
      }
      &--6 {
        top: 40%;
        right: 10%;
      }
    }
  }
</style>
