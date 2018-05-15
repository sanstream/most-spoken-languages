<template>
  <section data-component="most-spoken-languages-app">
    <nav>
      <LocationList />
      <LocationList />
    </nav>
    <section>

    </section>
  </section>
</template>

<script>
import LocationList from './components/LocationList'

export default {
  name: 'App',

  components: {
    LocationList,
  },
}
</script>

<style lang="scss">

[data-component="most-spoken-languages-app"] {
  font-family: 'Consolas', Courier, monospace;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  padding: 3em;
  font-size: 100%;
  line-height: 1.4em;
  line-height: inherit;
  min-height: 80vh;
  display: flex;
  flex-direction: column;

  nav {
    flex: 1 1 auto;
    display: flex;
    flex-wrap: nowrap;
    max-height: 50vh;

    & > * {
      margin-right: 2em; 
    }
  }

  > section {
    flex: 1 0 auto;
  }

  [data-component="location-list"] {
    flex: 0 1 auto;
  }
}
</style>
