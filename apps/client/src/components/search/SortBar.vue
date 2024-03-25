<script setup lang="ts">
  import { useRoute, useRouter } from '#imports';

  import { useSearchResults } from '~/composables/useSearchResults';

  const router = useRouter();
  const route = useRoute();

  const { view, sort, order } = useSearchResults();

  const onFilterUpdate = () => {
    router.push({
      path: '/search',
      query: {
        ...route.query,
        view: view.value,
        sort: sort.value,
        order: order.value,
      },
    });
  };
</script>

<template>
  <section class="filters">
    <div class="inner-wrapper">
      <label>
        <span>View as:</span>
        <select class="cta" v-model="view" @change="onFilterUpdate">
          <option value="images">Images</option>
          <option value="list">List</option>
          <option value="text-only">Text Only</option>
        </select>
      </label>
      <label>
        <span>Sort by</span>
        <select class="cta short" v-model="sort" @change="onFilterUpdate">
          <option value="name">Name</option>
          <option value="set">Set</option>
          <option value="category">Category</option>
          <option value="rarity">Rarity</option>
          <option value="cost">Cost</option>
          <option value="power">Power</option>
        </select>
      </label>
      <label>
        <span class="sr-only">Order</span><span>:</span>
        <select class="cta" v-model="order" @change="onFilterUpdate">
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </label>
    </div>
  </section>
</template>

<style scoped>
  .filters {
    background: var(--light-gray);
    border-bottom: 1px solid var(--light-blue);

    .inner-wrapper {
      display: flex;
      align-items: center;
      padding: var(--spacing-xs) 0;

      label {
        display: flex;
        align-items: center;
        span {
          margin-right: var(--spacing-xs);
        }
      }

      .cta {
        margin-right: var(--spacing-md);
        &.short {
          margin-right: var(--spacing-xs);
        }
      }
    }
  }
</style>
