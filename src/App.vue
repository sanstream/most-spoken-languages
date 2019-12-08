<template>
  <article data-component="most-spoken-languages-app">
    <router-view></router-view>
  </article>
</template>

<script>
export default {
  name: 'App',
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
  height: 100%;
  width: 100%;
  position: absolute;
  top:0;
  left: 0;

  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;

  header {
    > h1 {
      margin: 0;
      font-size: 2rem;
    }
  }

  > [data-view]{
    margin: 0 auto;
    max-width: 1400px;
    width: auto;
    flex: 1 1 auto;
    overflow: hidden;
  }
}
</style>
