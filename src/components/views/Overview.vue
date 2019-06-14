<template>
  <section data-view="overview">
    <SpokenLanguageResults
      :totalSelectedPopulation="totalSelectedPopulation"
      :selectedLocationsNames="selectedLocationsNames"
      :displayedLanguages="displayedLanguages"
      :speakersPerTopLanguages="speakersPerTopLanguages"
    />
    <InteractiveWorldMap
      :selectedCountries="selectedLocIds"
      :inactiveCountries="inactiveCountryIds"
      @country="handleCountrySelection"
    />
    <div class="overview--locations-by-words">
      <LocationList
        :locsToLangs="locsToLangs"
        :selectedLocs="selectedLocIds"
        @click="handleCountrySelection"
      />
    </div>
  </section>
</template>

<script>
import LocationList from '../molecules/LocationList'
import InteractiveWorldMap from '../molecules/InteractiveWorldMap'
import SpokenLanguageResults from '../organisms/SpokenLanguageResults'
import { mapState } from 'vuex'

export default {
  name: 'Overview',

  components: {
    LocationList,
    SpokenLanguageResults,
    InteractiveWorldMap,
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
      inactiveCountryIds: state => Object.keys(state.countriesToLanguages)
        .filter(id => Object.keys(state.countriesToLanguages[id].languages).length === 0),
    }),
  },

  created () {
    this.$store.dispatch('setSelectedCountry')
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
  display: grid;
  grid-template-columns: minmax(12rem, 40%) 60%;
  grid-template-rows: 50% 50%;
  grid-gap: $base-spacing;

  [data-component="SpokenLanguageResults"] {
    grid-column-start: 1;
    grid-column-end: 2;
    grid-row-start: 1;
    grid-row-end: 3;
  }

  [data-component="InteractiveWorldMap"] {
    grid-column-start: 2;
    grid-column-end: 3;
    grid-row-start: 1;
    grid-row-end: 2;
  }

  .overview--locations-by-words {
    grid-column-start: 2;
    grid-column-end: 3;
    grid-row-start: 2;
    grid-row-end: 3;
    [data-component="location-list"] {
    }
  }
}
</style>
