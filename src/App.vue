<template>
  <main data-component="most-spoken-languages-app">
    <header>
      <div>
        <h1>The most spoken languages arround the world
          <br>
          <small>
            by
            <a
              href="https://www.sanstream.nl"
              target="_blank"
            >Studio Sanstream</a>
            &copy; 2019
          </small>
        </h1>
      </div>
    </header>
    <div class="msl-content">
      <transition
        name="slide"
        mode="in-out"
      >
        <router-view  class="msl-view"/>
      </transition>
    </div>
  </main>
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
  font-size: 80%;
  line-height: 1.4em;
  background-color: $background-colour;
  padding: 0 0 3rem 0;
  line-height: inherit;

  min-height: 100vh;
  min-width: 100vw;
  height: 100%;
  width: 100%;
  max-height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  @media screen and (min-width: $medium-screen){
    font-size: 100%;
  }

  header {
    flex: 0 0;
    background-color: $background-colour;
    position: relative;
    z-index: 1;
    width: 100%;
    padding: 0 2rem;
    border-bottom: 1px solid $colour-yellow;

    h1 {
      max-width: 1400px;
      width: auto;
      margin: 2rem auto;
      font-size: 1.1rem;

      small,
      small a {
        color: $text-colour;
        font-weight: 500;
        font-size: 0.9rem;
      }
    }

    @media screen and (min-width: $medium-screen){
      h1 {
        font-size: 2rem;
      }
    }
  }

  .msl-content {
    flex: 1 0;
    padding: 2rem 2rem 0 2rem;
  }

  .msl-view {
    max-width: 1400px;
    margin: 0 auto;
    height: calc(100vh - 12rem);
  }
}

.slide-enter-active {
  transition: transform 0.5s 0.5s ease;
}

.slide-leave-active {
  transition: transform 0.5s ease;
}

.slide-enter-to, .slide-leave {
  transform: translate(0, 0);
  opacity: 0;
}

.slide-enter, .slide-leave-to {
  opacity: 1;
  transform: translate(0, -1400px);
}
</style>
