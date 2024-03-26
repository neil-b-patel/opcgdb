<script setup lang="ts">
  import { computed } from 'vue';

  import Alert from '~/components/Alert.vue';
  import { useSearchResults } from '~/composables/useSearchResults';
  import { getFilterDescription } from '~/utils/getFilterDescription';

  const { currPage, totalCards, totalPages, filterMap } = useSearchResults();
  const maxCardsPerPage = 60;
  const firstCardInPage = computed(() => (currPage.value - 1) * maxCardsPerPage + 1);
  const lastCardInPage = computed(() =>
    Math.min(currPage.value * maxCardsPerPage, totalCards.value)
  );
</script>

<template>
  <Alert class="results-description">
    <p v-if="totalPages === 1">
      <span class="strong">{{ totalCards }} cards</span> {{ getFilterDescription(filterMap) }}
    </p>
    <p v-if="totalPages > 1">
      <span class="strong">
        {{ firstCardInPage }} - {{ lastCardInPage }} of {{ totalCards }} cards
      </span>
      {{ getFilterDescription(filterMap) }}
    </p>
  </Alert>
</template>
