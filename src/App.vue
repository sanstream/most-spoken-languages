<template>
  <section data-component="most-spoken-languages-app">
    <nav>
      <LocationList />
    </nav>
    <LanguageBlobs :displayedLanguages="displayedLanguages" />
  </section>
</template>

<script>
import LocationList from './components/LocationList'
import LanguageBlobs from './components/LanguageBlobs'
import {mapState, } from 'vuex'

export default {
  name: 'App',

  components: {
    LocationList,
    LanguageBlobs,
  },

  computed: mapState({
    displayedLanguages: state => state.displayedLanguages,
  }),
}
</script>

<style lang="scss">
@import './definitions';

[data-component="most-spoken-languages-app"] {
  font-family: 'Montserrat', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: $text-colour;
  font-size: 100%;
  line-height: 1.4em;
  background-color: $background-colour;
  padding: 3em;
  line-height: inherit;
  min-height: 100vh;
  min-width: 100vw;
  display: absolute;
  top:0;
  left: 0;

  [data-component="location-list"] {
    flex: 0 1 auto;
  }
}
</style>
