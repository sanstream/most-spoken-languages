<template>
  <section data-component="SpokenLanguageResults">
    <h1>
      Of the
      <template>
        {{totalSelectedPopulation | formatPopulation}}
      </template>
      inhabitants of
      {{selectedLocationsNames | formatInlineNames}}:
    </h1>
    <ol>
      <li v-for="lang in displayedLanguages"
        :key="lang.id"
      >
        <PeoplePerLanguage
          :numOfSpeakers="speakersPerTopLanguages[lang.id]"
          :totalSelectedPopulation="totalSelectedPopulation"
          :language="lang"
        />
      </li>
    </ol>
    <ContextualNote>
      The total number of speakers can be more than the population, because a lot of people speak more than one language.
    </ContextualNote>
  </section>
</template>

<script>
import numeral from 'numeral'
import ContextualNote from '../atoms/ContextualNote'
import PeoplePerLanguage from '../molecules/PeoplePerLanguage'

export default {
  components: {
    ContextualNote,
    PeoplePerLanguage,
  },

  props: {
    totalSelectedPopulation: {
      type: Number,
      required: true,
    },
    selectedLocationsNames: {
      type: Array,
      required: true,
    },
    displayedLanguages: {
      type: Array,
      required: true,
    },
    speakersPerTopLanguages: {
      type: Object,
      required: true,
    },
  },

  filters: {
    formatPopulation (count) {
      const oneBillion = 1000000000
      const oneMillion = 1000000

      if (count / oneBillion > 1) {
        return `${Math.round(count / oneBillion)} billion`
      } else if (count / oneMillion > 1) {
        return `${Math.round(count / oneMillion)} million`
      } else {
        return numeral(Math.round(count)).format('0,0')
      }
    },

    formatInlineNames (names) {
      if (names.length === 1) {
        return names[0]
      } else {
        const lastIndex = names.length - 1
        const joinedText = names.filter((e, i) => i !== lastIndex).join(', ')
        return `${joinedText} and ${names[lastIndex]}`
      }
    },
  },
}
</script>

<style lang="scss">
@import '../../definitions';

[data-component="SpokenLanguageResults"]
  ol {
    display: flex;
    margin: 1em 0;
    padding: 0;
    list-style: none;
    flex-wrap: wrap;
    width: calc(100% + 0.5em);

    li {
      flex: 1 0 calc(33% - 1em);
      margin: 0 1em 1em 0;
    }
  }
</style>

