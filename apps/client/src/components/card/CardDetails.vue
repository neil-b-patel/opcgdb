<script setup lang="ts">
  import { useRouter } from '#imports';
  import { computed, toRefs } from 'vue';

  import type { OPCard, OPLang } from '@opcgdb/types';

  import AttributeImage from '~/components/AttributeImage.vue';
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
      <div class="main-info">
        <div class="image col">
          <CardImage :card="card" :width="200" :isLink="false" />
        </div>
        <div class="details col">
          <h1 class="row name">
            <span class="name">{{ card.name }}</span>
            <AttributeImage v-if="card.attribute" :attribute="card.attribute" />
          </h1>

          <div class="row">
            <span class="cell" v-if="card.cost">
              <span class="label">Cost</span> {{ card.cost }}
            </span>
            <span class="cell" v-if="card.life">
              <span class="label">Life</span> {{ card.life }}
            </span>
            <span class="cell" v-if="card.power !== undefined">
              <span class="label">Power</span> {{ card.power }}
            </span>
            <span class="cell" v-if="card.counter">
              <span class="label">Counter</span> {{ card.counter }}
            </span>
          </div>

          <p class="row" v-if="card.effect"><span class="label">Effect</span> {{ card.effect }}</p>
          <p class="row" v-if="card.trigger">
            <span class="label">Trigger</span> {{ card.trigger }}
          </p>
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
  @import '~/styles/media';

  .card-details {
    .main-info {
      padding: var(--spacing-lg) 0;
      display: flex;
      justify-content: space-evenly;

      @media (--mobile) {
        flex-direction: column;
      }

      .col {
        width: 33%;
        @media (--mobile) {
          width: 100%;
          margin-bottom: var(--spacing-lg);
        }
      }
    }

    .image {
      .card {
        @media (--mobile) {
          max-width: 300px;
          margin: 0 auto;
        }
      }
    }

    .details {
      position: relative;
      top: var(--spacing-lg);
      left: calc(var(--spacing-md) * -1);
      border: 1px solid var(--gray);
      border-top: 4px solid var(--main-blue);
      border-bottom: 4px solid var(--main-blue);
      border-radius: 3px;
      display: flex;
      flex-direction: column;
      height: fit-content;

      @media (--mobile) {
        position: static;
      }

      p.row {
        display: block;
        .label {
          display: block;
          margin-bottom: var(--spacing-sm);
          font-size: var(--font-size-bigbody);
        }
      }

      .row {
        padding: var(--spacing-sm);
        padding-left: calc(var(--spacing-md) + var(--spacing-sm));
        border-bottom: 1px solid var(--gray);
        display: flex;
        align-items: center;
        flex-wrap: wrap;

        @media (--mobile) {
          padding-left: var(--spacing-sm);
        }

        &:last-child {
          border-bottom: none;
        }

        .name {
          font-weight: 700;
          font-size: var(--font-size-bigbody);
        }

        .label {
          font-weight: 700;
          display: inline-block;
          margin-right: var(--spacing-xs);

          @media (--mobile) {
            width: 50%;
          }
        }

        .cell {
          width: 50%;
          margin-bottom: var(--spacing-sm);
          &:last-child {
            margin-bottom: 0;
          }

          @media (--mobile) {
            width: 100%;
          }
        }

        &.name {
          justify-content: space-between;
          align-items: flex-start;
        }
      }
    }
  }
</style>
