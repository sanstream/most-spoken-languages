import languageData from '../../research/refined-data/world-languages.json'
import Vuex from 'vuex'
import Vue from 'vue'

const state = {
  countriesToLanguages: languageData,
  noOfcountries: Object.keys(languageData).length,
  displayedLanguages: [
    {
      id: 'zh',
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
  setSelectedCountries (context, ids) {
    context.commit('setSelectedCountries', ids)
  },

  selectAllCountries (context) {
    context.commit('selectAllCountries')
  },

  resetAllCountries (context) {
    context.commit('setSelectedCountries', [])
  },
}

const mutations = {
  setSelectedCountries (state, data) {
    state.selectedCountries = data
  },

  selectAllCountries (state) {
    state.selectedCountries = Object.keys(state.countriesToLanguages)
  },

  resetSelectedCountries (state) {
    state.selectedCountries = []
  },
}

Vue.use(Vuex)
export default new Vuex.Store({
  state,
  actions,
  mutations,
})
