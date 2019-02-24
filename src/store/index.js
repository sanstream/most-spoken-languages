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
  setSelectedCountry (context, id) {
    if (id) {
      context.commit('setSelectedCountry', [ id, ])
    } else if (!id && router.currentRoute.query.countries) {
      const ids = router.currentRoute.query.countries.split('|')
      context.commit('setSelectedCountry', ids)
    } else {
      context.commit('setSelectedCountry', [])
    }
  },
}

const mutations = {
  setSelectedCountry (state, data) {
    data.forEach(cId => {
      const atPosition = state.selectedCountries.indexOf(cId)
      if (atPosition === -1) {
        state.selectedCountries.push(cId)
      } else {
        state.selectedCountries.splice(atPosition, 1)
      }
    })

    router.push({
      query: {
        countries: state.selectedCountries.join('|'),
      },
    })
  },
}

Vue.use(Vuex)
export default new Vuex.Store({
  state,
  actions,
  mutations,
})
