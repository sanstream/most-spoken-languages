<template>
<div  data-component="location-list">
  <Label 
    :linkedToId="id"
    text="Choose a location"
  />
  <ol :id="id">
      <li v-for="(c, index) in dummyList" 
        :key="index">
        <input type="checkbox" 
          :id="`location-list-item-${id}-${index}`">
        <label :for="`location-list-item-${id}-${index}`">{{c}}</label>
      </li>
  </ol>
</div>
</template>

<script>
import Label from './Label'

export default {
  name: 'LocationList',

  components: {
    Label,
  },

  data () {
    console.log(this)
    return {
      id: this._uid,
      dummyList: [
        'Azerbejan',
        'the Netherlands',
        'Spain',
        'Azerbejan',
        'the Netherlands',
        'Spain',
        'Azerbejan',
        'the Netherlands',
        'Spain',
        'Azerbejan',
        'the Netherlands',
        'Spain',
        'Azerbejan',
        'the Netherlands',
        'Spain',
      ],
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

  ol {
    @include activeArea;
    padding: 1em * 0.5;
    list-style: none;
    margin: 0;
    padding: 1em * 0.5;
  }

  li {
    line-height: 1.5em;

    > input[type="checkbox"] {
      display: none;
    }

    > input[type="checkbox"]:checked ~ label {
      border-bottom: 2px solid $interactive-element-active-part;
      color: #222;
    }

    > label {
      display: block;
      padding: 2px 0.2em 0 0.2em;
      margin: 0.3em 0;
      border-bottom: 1px solid transparentize($color: $interactive-element-active-part, $amount: 1);
      cursor: pointer;
      transition: border-bottom 0.2s ease;
      
      &:hover {
        border-bottom: 1px solid lighten($interactive-element-active-part, 20);      
      }
    }
  }
}
</style>
