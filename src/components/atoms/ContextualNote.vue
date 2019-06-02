<template>
  <div data-component="ContextualNote">
    <em>
      <slot>Please put the note here</slot>
    </em>
  </div>
</template>

<style lang="scss">
[data-component="ContextualNote"] {
  em {
    opacity: 0.8;
    font-size: 0.9em;
  }
}
</style>
