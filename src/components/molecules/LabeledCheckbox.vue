<template>
  <div>
    <input
      type="checkbox"
      :value="value"
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
