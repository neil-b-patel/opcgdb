<script setup lang="ts">
  import { useRouter } from '#imports';
  import { computed } from 'vue';

  import { useSearchResults } from '~/composables/useSearchResults';

  const router = useRouter();

  const props = defineProps<{
    section: 'top' | 'bottom';
  }>();

  const { view, sort, order, currPage, totalPages } = useSearchResults();
  const q = router.currentRoute.value.query.q || {};
  const linkToFirstPage = computed(() => ({ path: '/search', query: { q, p: 1 } }));
  const linkToPrevPage = computed(() => ({ path: '/search', query: { q, p: currPage.value - 1 } }));
  const linkToNextPage = computed(() => ({ path: '/search', query: { q, p: currPage.value + 1 } }));
  const linkToLastPage = computed(() => ({ path: '/search', query: { q, p: totalPages.value } }));

  const objetToQueryUrlPath = (obj: Record<string, any>) => {
    return `${obj.path}?${Object.entries(obj.query)
      .map(([key, val]) => `${key}=${val}`)
      .join('&')}`;
  };

  const onFilterUpdate = () => {
    router.push({
      path: '/search',
      query: {
        ...router.currentRoute.value.query,
        view: view.value,
        sort: sort.value,
        order: order.value,
      },
    });
  };

  const onPaginationClick = () => {
    window.scrollTo({ top: 0 });
  };
</script>

<template>
  <section :class="['action-bar', props.section]">
    <div class="inner-wrapper">
      <div class="filters" v-if="section === 'top'">
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
            <option value="number">Number</option>
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
      <div class="pagination">
        <NuxtLink
          @click="onPaginationClick"
          :to="objetToQueryUrlPath(linkToFirstPage)"
          class="cta"
          :disabled="currPage === 1"
          title="First page"
        >
          <Icon name="fluent:arrow-previous-24-regular" /><span class="sr-only">First Page</span>
        </NuxtLink>
        <NuxtLink
          @click="onPaginationClick"
          :to="objetToQueryUrlPath(linkToPrevPage)"
          class="cta"
          :disabled="currPage === 1"
          title="Previous page"
        >
          <Icon name="fluent:chevron-left-24-regular" /><span>Previous</span
          ><span class="sr-only"> Page</span>
        </NuxtLink>
        <NuxtLink
          @click="onPaginationClick"
          :to="objetToQueryUrlPath(linkToNextPage)"
          class="cta"
          :disabled="currPage === totalPages"
          title="Next page"
        >
          <span>Next</span><span class="sr-only"> Page</span
          ><Icon name="fluent:chevron-right-24-regular" />
        </NuxtLink>
        <NuxtLink
          @click="onPaginationClick"
          :to="objetToQueryUrlPath(linkToLastPage)"
          class="cta"
          :disabled="currPage === totalPages"
          title="Last page"
        >
          <span class="sr-only">Last Page</span><Icon name="fluent:arrow-next-24-regular" />
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<style scoped>
  @import '~/styles/media';

  .action-bar {
    &.top {
      background: var(--light-gray);
      border-bottom: 1px solid var(--light-blue);
    }

    &.bottom {
      margin-bottom: var(--spacing-sm);
    }

    .inner-wrapper {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      padding: var(--spacing-xs) 0;
    }

    .filters {
      display: flex;
      align-items: center;

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

    .pagination {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      flex: 1 1;
      a {
        margin-left: var(--spacing-xs);
      }
    }
  }
</style>
