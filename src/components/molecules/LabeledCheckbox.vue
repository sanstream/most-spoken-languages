<template>
  <div data-component="LabeledCheckbox">
    <input
      type="checkbox"
      :checked="value"
      @change="$emit('input', $event.target.checked)"
      id="fancy-label"
    />
    <Label
      linkedToId="fancy-label"
      :text="labelText"
    />
  </div>
</template>

<script>
import Label from '../atoms/Label.vue'
export default {
  name: 'LabeledCheckbox',
  components: {
    Label,
  },
  props: {
    value: {
      type: Boolean,
      required: false,
      default: false,
    },
    labelText: {
      type: String,
      required: true,
    },
  },
}
</script>

<style lang="scss">
[data-component="LabeledCheckbox"] {
  cursor: pointer;
  > * {
    cursor: inherit;
  }

  label {
    padding-left: 1em;
  }
}
</style>
