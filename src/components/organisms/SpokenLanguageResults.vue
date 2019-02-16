<template>
  <section data-component="">
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
        <div data-bar>
          <div data-range
            v-if="speakersPerTopLanguages[lang.id] > 0"
            :style="`width:${(scale(speakersPerTopLanguages[lang.id])/totalSelectedPopulation) * 100}%`"
          ></div>
        </div>
        <strong>
          {{speakersPerTopLanguages[lang.id] | formatPopulation}}
        </strong>
        speak <br>{{lang.name}}
      </li>
    </ol>
    <ContextualNote>
      The total number of speakers can be more than the population, because a lot of people speak more than one language.
    </ContextualNote>
  </section>
</template>

<script>
import numeral from 'numeral'
import * as d3Scale from 'd3-scale'
import ContextualNote from '../atoms/ContextualNote'

export default {
  components: {
    ContextualNote,
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

  computed: {
    scale () {
      const t = this.totalSelectedPopulation
      return d3Scale.scaleLinear()
        .domain([1, this.totalSelectedPopulation, ])
        .range([
          0.01 * t, // to make sure tiny ammounts are still visualised.
          1 * t,
        ])
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
