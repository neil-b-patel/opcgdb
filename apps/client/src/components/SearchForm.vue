<script lang="ts" setup>
  import { useRouter } from '#app';
  import { ref } from 'vue';

  const search = ref('');
  const router = useRouter();

  const handleSubmit = () => {
    if (!search.value) return;
    router.push({ path: '/search', query: { q: search.value } });
  };
</script>

<template>
  <form @submit.prevent="handleSubmit" class="search-form">
    <input type="text" v-model="search" />
    <button type="submit">Search</button>
  </form>
</template>
