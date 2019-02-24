<template>
  <section data-view="overview">
    <LocationList
      :locsToLangs="locsToLangs"
      :selectedLocs="selectedLocIds"
      @click="handleCountrySelection"
    />
    <SpokenLanguageResults
      :totalSelectedPopulation="totalSelectedPopulation"
      :selectedLocationsNames="selectedLocationsNames"
      :displayedLanguages="displayedLanguages"
      :speakersPerTopLanguages="speakersPerTopLanguages"
    />
  </section>
</template>

<script>
import LocationList from '../molecules/LocationList'
import SpokenLanguageResults from '../organisms/SpokenLanguageResults'
import {mapState, } from 'vuex'

export default {
  name: 'Overview',

  components: {
    LocationList,
    SpokenLanguageResults,
  },

  computed: {
    ...mapState({
      countriesToLanguages: state => state.countriesToLanguages,
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
      selectedLocIds: state => state.selectedCountries,
      speakersPerTopLanguages: state => {
        const output = {}
        state.displayedLanguages.forEach(lang => {
          output[lang.id] = 0
        })
        state.selectedCountries.forEach(countryId => {
          state.displayedLanguages.forEach(lang => {
            const country = state.countriesToLanguages[countryId]
            const languages = country.languages
            if (languages[lang.id]) {
              // if both UN and CIA data
              if (languages[lang.id].CIA && languages[lang.id].UN) {
                const CIA = (languages[lang.id].CIA.percentage / 100) * country.populationCount
                const UN = languages[lang.id].UN.count
                output[lang.id] += (CIA + UN) / 2
              // if only UN data
              } else if (languages[lang.id].UN) {
                output[lang.id] += languages[lang.id].UN.count
              // if only CIA data
              } else if (languages[lang.id].CIA) {
                output[lang.id] += languages[lang.id].CIA.percentage * country.populationCount
              }
            }
          })
        })
        return output
      },
      selectedLocations: state => state.selectedCountries.map(id => {
        return {
          id,
          ...state.countriesToLanguages[id],
        }
      }),
      selectedLocationsNames: state => state.selectedCountries.map(id => {
        return state.countriesToLanguages[id].countryName
      }),
      totalSelectedPopulation: state => {
        let total = 0
        if (state.selectedCountries.length) {
          total = state.selectedCountries.map(id => {
            return Number(state.countriesToLanguages[id].populationCount)
          }).reduce((a, b) => a + b, 0)
        }
        return total
      },
      displayedLanguages: state => state.displayedLanguages,
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

  methods: {
    handleCountrySelection (countryId) {
      this.$store.dispatch('setSelectedCountry', countryId)
    },
  },
}
</script>

<style lang="scss">
@import '../../definitions';
[data-view="overview"] {
  display: flex;
  flex-direction: column;

  > [data-component="location-list"] {
    flex: 0 1 auto;
  }

  > [data-component="SpokenLanguageResults"] {
    flex: 1 1 auto;
  }
}
</style>