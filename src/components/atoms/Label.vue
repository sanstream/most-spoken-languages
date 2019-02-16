<template>
  <label data-component="Label" :for="`#${linkedToId}`">{{text}}:</label>
</template>

<script>
export default {
  name: 'Label',
  props: {
    text: {
      required: true,
      type: String,
    },
    linkedToId: {
      required: true,
      type: String,
    },
  },
}
</script>

<style lang="scss">
@import '../../definitions';

[data-component="Label"] {
  @include highLevelLabel();
  display: block;
}

</style>
