import * as languageData from '../../research/refined-data/world-languages.json'
import Vuex from 'vuex'
import Vue from 'vue'
import router from '../router'

const state = {
  countriesToLanguages: languageData,
  displayedLanguages: [
    {
      id: 'cn',
      name: 'Mandarin Chinese',
    },
    {
      id: 'es',
      name: 'Spanish',
    },
    {
      id: 'en',
      name: 'English',
    },
    {
      id: 'hi',
      name: 'Hindi',
    },
    {
      id: 'ar',
      name: 'Arabic',
    },
    {
      id: 'pt',
      name: 'Portuguese',
    },
    {
      id: 'bn',
      name: 'Bengali',
    },
    {
      id: 'ru',
      name: 'Russian',
    },
    {
      id: 'ja',
      name: 'Japanese',
    },
  ],
  selectedCountries: [],
}

const actions = {
  setSelectedCountry (context) {
    const ids = router.currentRoute.query.countries
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
