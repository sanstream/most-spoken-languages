<template>
  <div data-component="InteractiveWorldMap">
    <Label
      :linkedToId="'map'"
      text="Pick a country from the map"
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
  display: flex;
  flex-flow: column;
  > * {
    flex: 0 0 auto;
  }
  > [data-component="WorldMap"] {
    flex: 1 1 auto;
    max-width: 100%;
    overflow: auto;
    border: 0 none;
    overflow: auto;
    @include activeArea;
  }
}
</style>
