<template>
  <button
    data-component="button"
    type="button"
    @click="$emit('click', $event)"
  >
    <slot></slot>
  </button>
</template>

<style lang="scss">
@import '../../definitions';

[data-component="button"] {
  @include activeElement;
}
</style>
