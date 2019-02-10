<template>
  <section>
    <LocationList
      :locsToLangs="locsToLangs"
      :selectedLocs="selectedLocs"
    />
  </section>
</template>

<script>
import LocationList from '../LocationList'
import {mapState, } from 'vuex'

export default {
  name: 'Overview',

  components: {
    LocationList,
  },

  computed: {
    ...mapState({
      locsToLangs: state => {
        let collection = Object.keys(state.countriesToLanguages).map(id => {
          return {
            id,
            ...state.countriesToLanguages[id],
          }
        })
        // sort by population count, cause that's where the majority is from:
        collection.sort((a, b) => {
          const popA = Number(a.populationCount)
          const popB = Number(b.populationCount)

          if (popA > popB) {
            return -1
          } else if (popA < popB) {
            return 1
          } else {
            return 0
          }
        })
        return collection
      },
      selectedLocs: state => state.selectedCountries,
    }),
  },

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