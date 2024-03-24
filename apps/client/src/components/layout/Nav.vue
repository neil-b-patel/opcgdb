<script lang="ts" setup>
  import SearchForm from '~/components/SearchForm.vue';
</script>

<template>
  <header class="main-gradient-bg">
    <div class="inner-wrapper navbar">
      <section class="search">
        <SearchForm type="nav" />
      </section>
      <nav>
        <span class="divider" />
        <ul>
          <li>
            <NuxtLink to="/"><Icon name="fluent:window-wrench-24-regular" /> Advanced</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/"><Icon name="fluent:question-circle-24-regular" />Syntax</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/"><Icon name="jam:crown" />Sets</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/"><Icon name="ion:shuffle" />Random</NuxtLink>
          </li>
        </ul>
        <span class="divider" />
        <ul>
          <li>
            <NuxtLink to="/" title="Your decks">
              <Icon name="fluent:box-24-regular" />
              <span class="sr-only">Your decks</span>
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/" title="Your account">
              <Icon name="fluent:person-circle-24-regular" />
              <span class="sr-only">Your account</span>
            </NuxtLink>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<style scoped>
  header {
    width: 100%;
    padding: 0 var(--spacing-md);

    .inner-wrapper {
      display: flex;
      align-items: center;
    }

    .navbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .search {
      flex: 1 1;
    }

    nav {
      display: flex;
      align-items: center;

      ul {
        display: flex;
        list-style: none;
        padding: 0;
        margin: 0 var(--spacing-xs);

        li {
          margin: 0 var(--spacing-xs);
        }
      }

      a {
        color: var(--nav-link);
        text-decoration: none;
        font-size: var(--font-size-body);
        display: flex;
        align-items: center;

        .icon {
          color: var(--nav-link);
          width: 1.2rem;
          height: 1.2rem;
          margin-right: var(--spacing-xxs);
        }

        &:hover {
          text-decoration: underline;
        }
      }
    }

    .divider {
      height: 20px;
      width: 1px;
      border-right: 1px solid var(--nav-link);
    }
  }
</style>
