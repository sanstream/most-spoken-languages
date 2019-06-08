<template>
  <article data-component="most-spoken-languages-app">
    <header>
      <h1>The most spoken languages arround the world</h1>
    </header>
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
    flex: 0 0 auto;
    > h1 {
      margin: 0;
      font-size: $base-spacing;
    }
  }

  > [data-view]{
    margin: $base-spacing 0 0 0;
    flex: 1 1 auto;
    overflow: hidden;
  }
}
</style>
