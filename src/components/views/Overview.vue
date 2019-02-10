<template>
  <section>
    DATA VIZ HERE PLEASE
  </section>
</template>

<script>
  export default {
    name: 'Overview',

    created () {
      this.$store.dispatch('setSelectedCountry')
    },

    watch: {
      '$route' () {
        this.$store.dispatch('setSelectedCountry')
      },
    },
  }
</script>

<style scoped>

</style>