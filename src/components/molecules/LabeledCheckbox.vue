<template>
  <label
    data-component="LabeledCheckbox"
    :data-checked="value"
  >
    <input
      type="checkbox"
      :checked="value"
      @change="$emit('input', $event.target.checked)"
      id="fancy-label"
    />
    {{labelText}}
  </label>
</template>

<script>
export default {
  name: 'LabeledCheckbox',
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
@import '../../definitions';

[data-component="LabeledCheckbox"] {
  @include activeElement;

  &[data-checked="true"] {
    border-bottom-color: $interactive-element-active-part;
  }
}
</style>
