<script setup lang="ts">
  import { useSeoMeta } from '#imports';

  import HomeCards from '~/components/home/HomeCards.vue';
  import SearchForm from '~/components/SearchForm.vue';

  definePageMeta({
    layout: 'home',
  });

  useSeoMeta({
    title: 'One Piece Card Game Search',
  });
</script>

<template>
  <section class="home">
    <div class="inner-wrapper">
      <h1><span>OPCGDB</span> is a powerful <span>One Piece Card Game</span> search</h1>
      <SearchForm type="hp" />
      <HomeCards />
    </div>
  </section>
</template>

<style scoped>
  .home {
    color: var(--white);
    background: rgb(29, 28, 37);
    background: linear-gradient(
      180deg,
      rgba(29, 28, 37, 1) 0%,
      rgba(23, 31, 64, 1) 30%,
      rgba(30, 42, 90, 1) 100%
    );
    height: 100vh;

    .inner-wrapper {
      align-items: center;
      display: flex;
      justify-content: center;
      flex-direction: column;
      height: 100%;
      overflow: hidden;
    }

    h1 {
      font-size: var(--font-size-head);
      margin: -8% auto 2rem auto;
      font-weight: 300;
      text-align: center;
      padding: 0 var(--spacing-md);

      span {
        font-weight: 400;
      }
    }
  }
</style>
