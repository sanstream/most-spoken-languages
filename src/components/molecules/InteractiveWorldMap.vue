<template>
  <div data-component="InteractiveWorldMap">
    <Label
      :linkedToId="'map'"
      text="Or pick a country from the map"
    />
    <WorldMap
      @country="$emit('country', $event)"
      :selectedCountries="selectedCountries"
      :inactiveCountries="inactiveCountries"
    />
    <ContextualNote>
      For some countries the spoken languages are unknown.
    </ContextualNote>

  </div>
</template>

<script>
import Label from '../atoms/Label'
import ContextualNote from '../atoms/ContextualNote'
import WorldMap from '../atoms/WorldMap'

export default {
  name: 'InteractiveWorldMap',

  components: {
    Label,
    ContextualNote,
    WorldMap,
  },

  props: {
    selectedCountries: {
      type: Array,
      default: () => [],
    },
    inactiveCountries: {
      type: Array,
      default: () => [],
    },
  },
}
</script>

<style lang="scss">
@import '../../definitions';

[data-component="InteractiveWorldMap"] {
  overflow: auto;

  > [data-component="WorldMap"] {
    border: 0 none;
    @include activeArea;
    display: none;
  }
}
</style>
