<template>
  <div data-component="PeoplePerLanguage">
    <div data-bar>
      <div data-range
           v-if="numOfSpeakers > 0"
           :style="`width:${(scale(numOfSpeakers)/totalSelectedPopulation) * 100}%`"
      ></div>
    </div>
    <strong
      class="number-of-speakers"
    >
      {{numOfSpeakers | formatPopulation}}
    </strong>
    speak <br>{{language.name}}
  </div>
</template>

<script>
import numeral from 'numeral'
import * as d3Scale from 'd3-scale'

export default {
  name: 'PeoplePerLanguage',
  props: {
    numOfSpeakers: {
      required: true,
      type: Number,
    },
    totalSelectedPopulation: {
      required: true,
      type: Number,
    },
    language: {
      required: true,
      type: Object,
    },
  },

  computed: {
    scale () {
      const t = this.totalSelectedPopulation
      return d3Scale.scaleLinear()
        .domain([ 1, this.totalSelectedPopulation, ])
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
  },
}
</script>

<style lang="scss">
@import '../../definitions';

[data-component="PeoplePerLanguage"] {
  [data-bar] {
    $data-bar-height: 8px;
    margin: 0.5em 0;
    width: 100%;
    height: $data-bar-height;
    border-radius: $data-bar-height * 0.25;
    position: relative;
    overflow: hidden;
    background-color: $interactive-element-background;

    [data-range] {
      position: absolute;
      top: 0;
      left: 0;
      height: $data-bar-height;
      background-color: $colour-red;
    }
  }

  .number-of-speakers {
    color: $colour-blue;
  }
}
</style>
