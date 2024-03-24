<script setup lang="ts">
  import { useRuntimeConfig, useSeoMeta } from '#imports';

  import SearchForm from '~/components/SearchForm.vue';
  import { useRandomCards } from '~/composables/useRandomCards';

  const config = useRuntimeConfig();

  const bottomCards = useRandomCards(7);

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

      <ClientOnly>
        <div class="cards">
          <div class="cards-inner inner-wrapper">
            <div v-for="(card, idx) in bottomCards" :class="['card', `card--${idx}`]">
              <NuxtLink class="card" :to="`/`">
                <img
                  :src="`${config.public.cdn_url}/cardlist/en/${card.id}.webp`"
                  :alt="card.name"
                  width="168"
                />
              </NuxtLink>
            </div>
          </div>
        </div>
      </ClientOnly>
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

    & > .inner-wrapper {
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

    .form {
      position: relative;
    }

    .cards {
      position: absolute;
      bottom: 0;
      height: 200px;
      left: 0;
      overflow: hidden;
      position: absolute;
      width: 100%;

      .cards-inner {
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
  }
</style>
