<script setup lang="ts">
  import { defineProps } from 'vue';

  withDefaults(
    defineProps<{
      type?: 'info' | 'warning' | 'error' | 'success';
    }>(),
    { type: 'info' }
  );
</script>
<template>
  <section :class="['alert', type]">
    <div class="inner-wrapper">
      <slot />
    </div>
  </section>
</template>

<style scoped>
  .alert {
    &.info {
      background: var(--white-blue);
      border-bottom: 1px solid var(--light-blue);

      :deep(.strong) {
        color: var(--main-blue);
      }
    }

    &.warning {
      background: var(--white-yellow);
      border-bottom: 1px solid var(--light-yellow);

      .strong {
        color: var(--main-yellow);
      }
    }

    &.error {
      background: var(--white-red);
      border-bottom: 1px solid var(--light-red);

      .strong {
        color: var(--main-red);
      }
    }

    &.success {
      background: var(--white-green);
      border-bottom: 1px solid var(--light-green);

      :deep(.strong) {
        color: var(--main-green);
      }
    }

    .inner-wrapper {
      display: flex;
      align-items: center;

      padding: var(--spacing-xs) 0;
    }
  }
</style>
