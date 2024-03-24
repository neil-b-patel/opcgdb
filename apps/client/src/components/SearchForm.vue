<script lang="ts" setup>
  import { useRoute, useRouter } from '#imports';
  import { ref, watch } from 'vue';

  const props = withDefaults(defineProps<{ type: 'hp' | 'nav' }>(), {
    type: 'nav',
  });

  const search = ref('');
  const searchBox = ref<HTMLInputElement | null>(null);
  const router = useRouter();
  const route = useRoute();

  const handleSubmit = (event: Event) => {
    event.preventDefault();
    if (!search.value) return;
    router.push({ path: '/search', query: { q: search.value } });
  };

  const focusBox = () => {
    if (searchBox.value) {
      searchBox.value.focus();
    }
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
    <Icon
      name="octicon:search-16"
      class="icon"
      v-if="type === 'nav'"
      @click="focusBox"
      role="decoration"
    />
    <label for="search" class="sr-only">Search for a card</label>
    <input
      :class="['search-form__input', props.type]"
      ref="searchBox"
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

      input {
        box-sizing: border-box;

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

    &.nav {
      display: flex;
      align-items: center;
      width: 100%;

      .logo {
        position: relative;
        top: 2px;
      }

      .icon {
        color: var(--white);
        opacity: 0.8;
        width: 1.5rem;
        height: 1.5rem;
        margin-left: var(--spacing-xs);
      }

      input {
        box-sizing: border-box;
        padding: var(--spacing-xxs) var(--spacing-sm);
        height: 52px;
        line-height: 22px;
        background: none;
        border: 0;
        color: var(--white);
        font-size: var(--font-size-body);
        width: 100%;

        &:focus,
        &:active {
          border: 0;
          outline: 0;
        }
      }
    }
  }
</style>
