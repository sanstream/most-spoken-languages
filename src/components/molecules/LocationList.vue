<template>
<div  data-component="location-list">
  <Label 
    :linkedToId="uid"
    text="Choose a location"
  />
  <ol>
    <li
      v-for="loc in locsToLangs"
      :key="loc.id"
      :data-selected="String(selectedLocs.indexOf(loc.id) > -1)"
      :value="loc.id"
      @click="$emit('click', loc.id)"
    >
      {{loc.countryName}}
    </li>
  </ol>
  <ContextualNote>
    It is possible to select multiple countries.
  </ContextualNote>
</div>
</template>

<script>
import Label from '../atoms/Label'
import ContextualNote from '../atoms/ContextualNote'

export default {
  name: 'LocationList',

  components: {
    Label,
    ContextualNote,
  },

  props: {
    locsToLangs: {
      type: Array,
      required: true,
    },
    selectedLocs: {
      type: Array,
      required: true,
    },
  },

  data () {
    return {
      selected: this.selectedLocs,
      uid: String(this._uid),
    }
  },

  watch: {
    selectedLocs (newValue) {
      this.selected = this.selectedLocs
    },
  },
}
</script>

<style lang="scss">
@import '../../definitions';

[data-component="location-list"] {
  display: flex;
  flex-wrap: nowrap;
  flex-direction: column;

  > * {
    flex: 0 0 auto;
  }

  ol {
    flex: 1 1 auto;
    overflow-y: auto;
    min-width: 9em;
    border: 0 none;
    @include activeArea;
    padding: 1em * 0.5;
    list-style: none;
    margin: 0;
    padding: 1em * 0.5;
    width: 100%;
  }

  li {
    line-height: 1.5em;
    padding: 0.3em 0.5em;
    color: #222;
    cursor: pointer;

    &[data-selected="true"] {
      border-left: 3px solid $interactive-element-active-part;
      color: $interactive-element-active-part;
    }
  }
}
</style>
