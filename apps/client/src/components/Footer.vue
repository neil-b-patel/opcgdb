<script setup>
  import FooterColumn from '~/components/FooterColumn.vue';
</script>

<template>
  <footer>
    <div class="inner-wrapper">
      <div class="links">
        <FooterColumn
          title="Cards"
          :links="[
            { title: 'Advanced', href: '/' },
            { title: 'Syntax Guide', href: '/' },
            { title: 'All Sets', href: '/' },
            { title: 'Random Card', href: '/' },
          ]"
        />
        <FooterColumn title="OPCGDB" :links="[{ title: 'Site FAQs & Help', href: '/' }]" />
        <FooterColumn
          title="Account"
          :links="[
            { title: 'Your Account', href: '/' },
            { title: 'Register', href: '/' },
            { title: 'Terms of Service', href: '/' },
            { title: 'Contact Us', href: '/' },
            { title: 'Privacy & Security', href: '/' },
          ]"
        />
        <FooterColumn
          title="Developers"
          :links="[
            { title: 'API Documentation', href: '/' },
            { title: 'Card Objects', href: '/' },
            { title: 'Card Imagery', href: '/' },
            { title: 'Bulk Data', href: '/' },
            { title: 'API Changelog', href: '/' },
          ]"
        />
        <FooterColumn
          title="More"
          :links="[
            { title: 'Donate to OPCGDB', href: '/' },
            { title: 'Patreon', href: '/' },
            { title: 'GitHub', href: '/' },
          ]"
        />
      </div>
      <div class="footnote">
        <p>
          Portions of OPCGDB are unofficial Fan Content. The literal and graphical information
          presented on this site about the One Piece Card Game, including card images and, is
          copyright of Eiichiro Oda/Shueisha, Toei Animation and Bandai. OPCGDB is not produced by
          or endorsed by Eiichiro Oda/Shueisha, Toei Animation and Bandai.
        </p>

        <p>
          The Slack, Discord, Cash App, PayPal, and Patreon logos are copyright their respective
          owners. OPCGDB is not produced by or endorsed by these services.
        </p>

        <p>
          Card prices and promotional offers represent daily estimates and/or market values provided
          by our affiliates. Absolutely no guarantee is made for any price information. See stores
          for final prices and details. All other content © {{ new Date().getFullYear() }} OPCGDB,
          LLC.
        </p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
  footer {
    padding: var(--spacing-lg) 2.5% var(--spacing-xl) 2.5%;
    background: var(--footer-bg);
    color: var(--footer-color);

    .links {
      display: flex;

      justify-content: space-between;

      @media (max-width: 768px) {
        flex-direction: column;
      }
    }

    .footnote {
      color: var(--footer-footnote);
      max-width: 700px;

      p {
        margin-top: var(--spacing-md);
        font-size: var(--font-size-caption);
      }
    }
  }
</style>
