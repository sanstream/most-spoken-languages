<template>
  <section data-view="overview">
    <header>
      <h1>The most spoken languages arround the world</h1>
    </header>
    <section v-if="noCountriesSelected">
      <h2>Nothing has been selected.</h2>

      <p>Please select a country via the map or search for it in the list.</p>

      <p>Or just select the whole world.</p>
    </section>
    <SpokenLanguageResults
      v-else
      :totalSelectedPopulation="totalSelectedPopulation"
      :selectedLocationsNames="allCountriesAreSelected ? ['the world'] : selectedLocationsNames"
      :displayedLanguages="displayedLanguages"
      :speakersPerTopLanguages="speakersPerTopLanguages"
    />
    <form>
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
      <LabeledCheckbox
        class="overview--select-the-world"
        labelText="The whole world"
        :value="allCountriesAreSelected"
        @input="handleSelectWholeWorld"
      />
    </form>
  </section>
</template>

<script>
import LocationList from '../molecules/LocationList'
import InteractiveWorldMap from '../molecules/InteractiveWorldMap'
import SpokenLanguageResults from '../organisms/SpokenLanguageResults'
import LabeledCheckbox from '../molecules/LabeledCheckbox'
import { mapState } from 'vuex'

export default {
  name: 'Overview',

  components: {
    LocationList,
    SpokenLanguageResults,
    InteractiveWorldMap,
    LabeledCheckbox,
  },

  data () {
    return {
      theWholeWorld: false,
    }
  },

  watch: {
    $route (from) {
      this.handleRouteChanges(from)
    },
  },

  mounted () {
    this.handleRouteChanges(this.$route)
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
              // There is both census data form the CIA and the UN, but the formats
              // are different, UN uses absolute numbers and CIA percentages
              let CIA = 0
              let UN = 0
              if (languages[lang.id].UN && languages[lang.id].UN.count) {
                // UN data is most precise:
                UN = languages[lang.id].UN.count
              } else if (languages[lang.id].CIA && languages[lang.id].CIA.percentage) {
                // CIA census data is less accurate and precise, so it used as a fallback option.
                CIA = (languages[lang.id].CIA.percentage / 100) * country.populationCount
              }
              output[lang.id] += CIA + UN
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
      allCountriesAreSelected: state => state.selectedCountries.length === state.noOfcountries,
      noCountriesSelected: state => state.selectedCountries.length === 0,
    }),
  },

  created () {
  },

  methods: {
    handleCountrySelection (countryId) {
      let newCollection = []
      if (this.selectedLocIds.indexOf(countryId) === -1) {
        newCollection = [ ...this.selectedLocIds, countryId, ]
      } else {
        newCollection = this.selectedLocIds.filter(id => id !== countryId)
      }

      this.$router.push({
        query: {
          countries: newCollection.join('+'),
        },
      })
    },

    handleSelectWholeWorld (isChecked) {
      if (isChecked) {
        this.$router.push({
          query: {
            countries: 'all',
          },
        })
      } else {
        this.$router.push({
          query: {
            countries: '',
          },
        })
      }
    },

    handleRouteChanges (to) {
      if (to.query.countries && to.query.countries.split('+').length) {
        const countryIds = to.query.countries.split('+')
        if (countryIds[0] === 'all') {
          this.$store.dispatch('selectAllCountries')
        } else {
          this.$store.dispatch('setSelectedCountries', countryIds)
        }
      } else {
        this.$store.dispatch('resetAllCountries')
      }
    },
  },
}
</script>

<style lang="scss">
@import '../../definitions';
[data-view="overview"] {
  display: grid;
  grid-template-columns: minmax(12rem, 25%) 75%;
  // grid-template-rows: 3em calc(50% - 3em) calc(50% - 3em);
  grid-template-areas:  "header header"
                        "left right";
  grid-gap: $base-spacing;
  height: calc(100vh - #{$base-spacing * 2});
  max-height: calc(100vh - #{$base-spacing * 2});
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;

  > * {
    max-height: 100%;
    overflow: auto;
  }

  header {
    grid-area: header;
  }

  [data-component="SpokenLanguageResults"] {
    grid-area: left;
    max-height: 100%;
  }

  form {
    grid-area: right;
    display: grid;
    grid-template-columns: calc(50% - #{$base-spacing / 4}) calc(50% - #{$base-spacing / 4});
    grid-template-areas:  "top top"
                          "middle middle"
                          "left right";
    grid-gap: $base-spacing / 2;
    height: calc(100vh - #{$base-spacing * 3});
    max-height: calc(100vh - #{$base-spacing * 3});

    > * {
      max-height: 100%;
      overflow: auto;
    }

    [data-component="InteractiveWorldMap"] {
      grid-area: top;
      max-height: fit-content;
      max-width: fit-content;
    }

    .overview--locations-by-words {
      grid-area: left;
    }

    .overview--select-the-world {
      grid-area: middle;
    }
  }

}
</style>
