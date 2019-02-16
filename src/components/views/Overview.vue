<template>
  <section data-view="overview">
    <LocationList
      :locsToLangs="locsToLangs"
      :selectedLocs="selectedLocIds"
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
}
</script>

<style lang="scss">
@import '../../definitions';
[data-view="overview"] {
  ol {
    display: flex;
    margin: 1em 0;
    padding: 0;
    list-style: none;
    flex-wrap: wrap;
    width: calc(100% + 0.5em);

    li {
      flex: 1 0 calc(33% - 1em);
      margin: 0 1em 1em 0;

      [data-bar] {
        $data-bar-height: 8px;
        margin: 0.5em 0;
        width: 100%;
        height: $data-bar-height;
        border-radius: $data-bar-height * 0.25;
        position: relative;
        overflow: hidden;
        background-color: $colour-inactive-blue;

        [data-range] {
          position: absolute;
          top: 0;
          left: 0;
          height: $data-bar-height;
          background-color: $interactive-element-active-part;
        }
      }
    }
  }
}
</style>