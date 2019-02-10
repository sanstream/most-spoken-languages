import * as languageData from '../../research/refined-data/world-languages.json'
import Vuex from 'vuex'
import Vue from 'vue'
import router from '../router'

const state = {
  countriesToLanguages: languageData,
  displayedLanguages: [
    'Mandarin Chinese',
    'Spanish',
    'English',
    'Hindi',
    'Arabic',
    'Portuguese',
    'Bengali',
    'Russian',
    'Japanese',
  ],
  selectedCountries: [],
}

const actions = {
  setSelectedCountry (context) {
    const ids = router.currentRoute.params.countryIds
    if (ids) {
      context.commit('setSelectedCountry', ids.split('|'))
    } else {
      context.commit('setSelectedCountry', [])
    }
  },
}

const mutations = {
  setSelectedCountry (state, data) {
    state.selectedCountries = data
  },
}

Vue.use(Vuex)
export default new Vuex.Store({
  state,
  actions,
  mutations,
})
