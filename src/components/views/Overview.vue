<template>
  <section
    data-view="overview"
  >
    <form>
      <InteractiveWorldMap
        class="overview--map"
        :selectedCountries="selectedLocIds"
        :inactiveCountries="inactiveCountryIds"
        @country="handleCountrySelection"
      />
      <section
        class="overview-manual-selection"
      >
        <div class="Popper"
             ref="popout"
             role="dialog"
             v-show="showPopup"
        >
          <LocationList
            :locsToLangs="locsToLangs"
            :selectedLocs="selectedLocIds"
            @click="handleCountrySelection"
          />
        </div>

        <Button
          ref="findButton"
          @click="showPopup = !showPopup"
        >
          Find a country
        </Button>
        &ensp;or&ensp;
        <LabeledCheckbox
          class="overview--select-the-world"
          labelText="select the whole world"
          :value="allCountriesAreSelected"
          @input="handleSelectWholeWorld"
        />
      </section>
    </form>
    <section
      v-if="noCountriesSelected"
      class="overview--no-data"
    >
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
  </section>
</template>

<script>
import InteractiveWorldMap from '../molecules/InteractiveWorldMap'
import SpokenLanguageResults from '../organisms/SpokenLanguageResults'
import LabeledCheckbox from '../molecules/LabeledCheckbox'
import LocationList from '../molecules/LocationList'
import Popper from 'popper.js'
import Button from '../atoms/Button'
import { mapState } from 'vuex'

export default {
  name: 'Overview',

  components: {
    SpokenLanguageResults,
    InteractiveWorldMap,
    LabeledCheckbox,
    Button,
    LocationList,
  },

  data () {
    return {
      theWholeWorld: false,
      showPopup: false,
      popperRef: null,
    }
  },

  watch: {
    $route (from) {
      this.handleRouteChanges(from)
    },
  },

  mounted () {
    this.handleRouteChanges(this.$route)
    this.$nextTick(() => {
      this.popperRef = new Popper(this.$refs.findButton, this.$refs.popout, {
        placement: 'top-start',
      })
    })
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
  overflow: auto;

  .overview--map {
    max-width: $medium-screen;
  }

  .overview-manual-selection {
    margin: 1rem 0;
    > * {
      display: inline-block;
    }

    .Popper {
      padding: 2rem;
      z-index: 20;
      // width: $medium-screen;
      // max-width: 90vw;
      height: 400px;
      max-height: 50vh;
      overflow: auto;
      box-shadow: 1px 1px 5px $non-interactive-element-background;
      background-color: $background-colour;
    }
  }
}

@media screen and (min-width: $medium-screen) {
  [data-view="overview"] {
    display: flex;
    flex-direction: row;
    > form {
      flex: 2 1;
    }

    > .overview--no-data,
    > [data-component="SpokenLanguageResults"] {
      flex: 1 0;
      padding-left: 2rem;
    }
  }
}
</style>
