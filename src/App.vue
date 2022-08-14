<template>
  <Header />

  <main class="main">
     <RouterView />
  </main>

  <Footer />
</template>

<script lang="ts">
import Header from '@/components/header/Header.vue'
import Footer from '@/components/footer/Footer.vue'

export default {
  components: {
    Header,
    Footer,
  }
}
</script>
