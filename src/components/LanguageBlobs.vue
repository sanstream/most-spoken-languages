<template>
  <section data-component="language-blobs">
    <h1>Of the 90 miljon inhabitants of Japan:</h1>
    <ul>
      <li v-for="(language,ii) in displayedLanguages"
        :key="ii" 
        class="language-blobs--blob">
        <svg viewBox="0 0 50 50">
          <circle
            class="total-inhabitants"
            r="25"
            cx="25"
            cy="25" />
          <circle
            class="total-inhabitants-speaking-language"
            r="5"
            cx="25"
            cy="25" />
        </svg>
        <p>
        <em>5 mil.</em><br>
        <span>speak</span><br>
        <em>{{language}}</em>
        </p>
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  name: 'LanguageBlobs',
  props: {
    displayedLanguages: {
      type: Array,
      required: true,
    },
  },
}
</script>

<style lang="scss">
@import '../definitions';

[data-component="language-blobs"] {
  ul {
    display: flex;
    flex-wrap: wrap;
    list-style: none;
    margin: 1em 0;
    padding: 0;
  }
  .language-blobs--blob {
    flex: 1 0 auto;
    margin: 1em 2em;
    text-align: center;

    em {
      font-style: normal;
    }

    span {
      opacity: 0.5;
    }

    svg {
      width: 5em;
      height: 5em;

      .total-inhabitants {
        fill: lighten($colour-blue, 25);
      }

      .total-inhabitants-speaking-language {
        fill: $colour-red;
      }
    }
  }
}
</style>

