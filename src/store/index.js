import * as languageData from '../../research/refined-data/world-languages.json'
import Vuex from 'vuex'
import Vue from 'vue'

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
    'Punjabi',
  ],
  selected: null,
}

Vue.use(Vuex)
export default new Vuex.Store({
  state,
})
