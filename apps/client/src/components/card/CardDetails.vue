<script setup lang="ts">
  import { useRouter } from '#imports';
  import { computed, toRefs } from 'vue';

  import type { OPCard, OPLang } from '@opcgdb/types';

  import CardImage from '~/components/CardImage.vue';
  import { useDb } from '~/composables/useDb';
  import { getCardUrl } from '~/utils/getCardUrl';

  const props = defineProps<{
    card: OPCard;
  }>();
  const { card } = toRefs(props);

  const router = useRouter();
  const { getCardsByNumber, getSetById, getCardById } = useDb();
  const currLang = card.value.lang;
  // TODO: make dynamic pagination for prints
  const enCardsByNumber = getCardsByNumber(card.value.number, 'en', 1);
  const jpCardsByNumber = getCardsByNumber(card.value.number, 'jp', 1);

  const prints = {
    en: computed(() => enCardsByNumber.data?.cards || []),
    jp: computed(() => jpCardsByNumber.data?.cards || []),
  };

  const switchLang = (lang: OPLang) => {
    const newCard = getCardById(card.value.id, lang).data;

    if (newCard) {
      router.push(getCardUrl(newCard));
    } else if (prints[lang].value.length) {
      router.push(getCardUrl(prints[lang].value[0]));
    }
  };
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
          <p v-if="card.cost">Cost: {{ card.cost }}</p>
          <p v-if="card.life">Life: {{ card.life }}</p>
          <p v-if="card.attribute">Attribute: {{ card.attribute }}</p>
          <p v-if="card.power !== undefined">Power: {{ card.power }}</p>
          <p v-if="card.counter">Counter: {{ card.counter }}</p>
          <p v-if="card.effect">Effect: {{ card.effect }}</p>
          <p v-if="card.trigger">Trigger: {{ card.trigger }}</p>
        </div>
        <div class="versions col">
          <p>Set: {{ card.set }}</p>
          <p v-if="card.number">Number: {{ card.number }}</p>
          <p v-if="card.rarity">Rarity: {{ card.rarity }}</p>
          <p v-if="card.lang">Lang: {{ card.lang }}</p>
          <button
            v-if="prints['en'].value.length"
            :disabled="currLang === 'en'"
            :class="{ active: currLang === 'en' }"
            @click="switchLang('en')"
          >
            EN
          </button>
          <button
            v-if="prints['jp'].value.length"
            :disabled="currLang === 'jp'"
            :class="{ active: currLang === 'jp' }"
            @click="switchLang('jp')"
          >
            JP
          </button>
          <ul class="prints">
            <li v-for="print in prints[currLang].value" :key="print.id">
              <NuxtLink :to="getCardUrl(print)">
                {{ print.set }} - {{ getSetById(print.set, print.lang as OPLang).data?.name }}
              </NuxtLink>
            </li>
          </ul>
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
