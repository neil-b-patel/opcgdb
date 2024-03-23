<script lang="ts" setup>
  import { useRoute, useRouter } from '#app';
  import { ref, watch } from 'vue';

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
  <form @submit.prevent="handleSubmit" class="search-form">
    <input type="text" v-model="search" />
    <button type="submit">Search</button>
  </form>
</template>
