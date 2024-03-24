<script setup lang="ts">
  const props = defineProps<{
    title: string;
    links: { title: string; href: string }[];
  }>();
</script>

<template>
  <nav>
    <h2>{{ props.title }}</h2>
    <ul>
      <li v-for="link in props.links" :key="link.title">
        <NuxtLink :to="link.href">{{ link.title }}</NuxtLink>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
  nav {
    width: 18%;
    h2 {
      margin-bottom: 0.5rem;
      border-bottom: 1px solid var(--footer-color);
      text-transform: uppercase;
      padding-bottom: var(--spacing-xs);
    }

    ul {
      list-style: none;
      padding: 0;
      margin: 0;
      margin-bottom: var(--spacing-md);
    }

    a {
      color: var(--footer-link);
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
  }
</style>
