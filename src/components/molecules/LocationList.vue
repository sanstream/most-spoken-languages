<template>
  <div  data-component="location-list">
    <Label
      :linkedToId="uid"
      text="Choose a location"
    />
    <SearchField
      class="location-list--filter-field"
      v-model="filterText"
      placeholder="Type text to filter..."
    />
    <ol>
      <li
        v-for="loc in filteredLocations"
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
import SearchField from '../atoms/SearchField'

export default {
  name: 'LocationList',

  components: {
    Label,
    ContextualNote,
    SearchField,
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
      filterText: '',
    }
  },

  watch: {
    selectedLocs (newValue) {
      this.selected = this.selectedLocs
    },
  },

  computed: {
    filteredLocations () {
      if (this.filterText.length) {
        const test = new RegExp(this.filterText, 'ig')
        return this.locsToLangs.filter(loc => test.test(loc.countryName))
      } else {
        return this.locsToLangs
      }
    },
  },
}
</script>

<style lang="scss">
@import '../../definitions';
[data-component="location-list"] {
  max-height: 100%;
  max-width: 20rem;
  display: flex;
  flex-wrap: nowrap;
  flex-direction: column;

  > * {
    flex: 0 0 auto;
  }

  .location-list--filter-field {
    margin-bottom: 2rem;
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
