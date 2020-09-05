<template>
  <div
    class="overlay"
    :style="overlayStyles.root"
  >
    <div
      class="overlay__content"
      :style="overlayStyles.content"
    >
      <div class="bg-gray-800 shadow rounded">
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    overlayStyles() {
      return {
        root: {
          position: 'fixed',
          zIndex: 200,
          top: 0,
          left: 0,
          width: '100%',
          height: '100vh',
          background: 'rgba(0, 0, 0, 0.5)',
        },
        content: {
          position: 'fixed',
          zIndex: 201,
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          maxWidth: '100%',
        }
      }
    }
  }
}
</script>
