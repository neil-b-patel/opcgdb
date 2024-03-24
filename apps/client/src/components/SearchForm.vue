<script lang="ts" setup>
  import { useRoute, useRouter } from '#app';
  import { ref, watch } from 'vue';

  const props = withDefaults(defineProps<{ type: 'hp' | 'nav' }>(), {
    type: 'nav',
  });

  const search = ref('');
  const router = useRouter();
  const route = useRoute();

  const handleSubmit = (event: Event) => {
    event.preventDefault();
    if (!search.value) return;
    router.push({ path: '/search', query: { q: search.value } });
  };

  watch(
    () => route.path,
    (path: string) => {
      if (path !== '/search') search.value = '';
    }
  );
</script>

<template>
  <form @submit.prevent="handleSubmit" :class="['search-form', props.type]">
    <NuxtLink to="/" class="logo">
      <span class="sr-only">One Piece Card Game Database</span>
      <NuxtImg
        src="/images/logow2x.png"
        width="48"
        height="48"
        alt="One Piece Card Game Database"
      />
    </NuxtLink>
    <label for="search" class="sr-only">Search for a card</label>
    <input
      :class="['search-form__input', props.type]"
      type="text"
      v-model="search"
      name="search"
      id="search"
      autocomplete="off"
      autocapitalize="none"
      autocorrect="off"
      spellcheck="false"
      maxlength="1024"
      tabindex="1"
    />
    <button type="submit" class="sr-only">Search</button>
  </form>
</template>

<style scoped>
  .search-form {
    position: relative;

    &.hp {
      width: 100%;
      max-width: 32rem;
      padding: 0 var(--spacing-md);

      .logo {
        position: absolute;
        left: calc(var(--spacing-md) + 0.5rem);
        top: 0.5rem;
      }
    }

    &__input {
      box-sizing: border-box;
      &.hp {
        line-height: 1.25;
        border: 1px solid var(--white);
        padding: 12px 14px 12px 62px;
        font-size: 30px;
        outline: none;
        background: var(--dark-blue);
        color: var(--white);
        border-radius: 2px;
        box-shadow: var(--inner-shadow-4);
        width: 100%;

        &:active,
        &:focus {
          border-color: var(--gold);
          background: var(--main-blue);
        }
      }
    }
  }
</style>
