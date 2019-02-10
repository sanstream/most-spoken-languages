<template>
<div  data-component="location-list">
  <Label 
    :linkedToId="uid"
    text="Choose a location"
  />
  <select
    :id="uid"
    v-model="model"
    multiple
  >
    <option
      v-for="loc in locsToLangs"
      :key="loc.id"
      :data-selected="String(selectedLocs.indexOf(loc.id) > -1)"
      :value="loc.id">
        {{loc.countryName}}
      </option>
  </select>
  <div>
    <em>
      Hold the Ctrl key to select multiple countries.
    </em>
  </div>
</div>
</template>

<script>
import Label from './Label'

export default {
  name: 'LocationList',

  components: {
    Label,
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
      model: [],
      uid: String(this._uid),
    }
  },
}
</script>

<style lang="scss">
@import '../definitions';

[data-component="location-list"] {
  min-width: 9em;
  overflow-y: auto;
  margin: 1em 0;
  padding: 1em * 0.5;  

  select {
    border: 0 none;
    @include activeArea;
    padding: 1em * 0.5;
    list-style: none;
    margin: 0;
    padding: 1em * 0.5;
    width: 100%;
  }

  option {
    line-height: 1.5em;
    padding: 0.3em 0.5em;
    height: 2em;
    color: #222;
    cursor: pointer;
  &[data-selected="true"] {
      border-left: 3px solid $interactive-element-active-part;
      color: $interactive-element-active-part;
    }
  }
}
</style>
