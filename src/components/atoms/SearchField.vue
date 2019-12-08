<template>
  <input
    data-component="SearchField"
    type="search"
    :value="value"
    @input="$emit('input',$event.target.value)"
  />
</template>

<script>
export default {
  name: 'SearchField',
  props: {
    value: {
      type: String,
    },
  },
}
</script>

<style lang="scss">
@import '../../definitions';
[data-component="SearchField"] {
  border: 0 none;
  @include activeArea;
  padding: 1em;
}
</style>
