<script setup lang="ts">
  import { useRoute, useRouter } from '#imports';
  import { computed, onMounted, ref, watch } from 'vue';

  import { type OPLang, OPLangSchema } from '@opcgdb/types';

  import CardDetails from '~/components/card/CardDetails.vue';
  import { useDb } from '~/composables/useDb';

  const { getCardById } = useDb();
  const card = ref();
  const route = useRoute();
  const router = useRouter();
  const routeParams = computed(() => router.currentRoute.value.params);
  const queryParams = computed(() => router.currentRoute.value.query);

  const setup = () => {
    try {
      const lang: OPLang =
        typeof routeParams.value.lang === 'string'
          ? OPLangSchema.parse(routeParams.value.lang)
          : OPLangSchema.parse(routeParams.value.lang.join(''));
      const cardSet: string = routeParams.value.number[0];
      const pathNumber: string = routeParams.value.number[1];
      const printNumber: string = queryParams.value.p ? `_p${queryParams.value.p}` : '';

      const cardId = `${cardSet.toUpperCase()}-${pathNumber.toUpperCase()}${printNumber}`;
      card.value = getCardById(cardId, lang).data;
      if (!card) {
        throw createError({ statusCode: 404, statusMessage: 'Card not found' });
      }
      const sluggedName = card.value.name.toLowerCase().replace(/ /g, '-');
      if (sluggedName !== routeParams.value.number[2]) {
        router.replace(`/card/${lang}/${cardSet}/${pathNumber}/${sluggedName}`);
      }
    } catch (error) {
      throw createError({ statusCode: 404, statusMessage: 'Invalid card language' });
    }
  };

  onMounted(() => {
    setup();
  });

  watch(
    () => route.query,
    () => {
      setup();
    }
  );
</script>

<template>
  <div v-if="card">
    <CardDetails :card="card" />
  </div>
</template>
