<template>
  <button
    class="relative"
    :style="boxStyle"
    @click="onClick"
  >
    <span
      class="absolute top-0 left-0 z-0 w-full h-full"
      :style="bgStyle"
    />
    <span
      v-if="dataObj.event"
      class="absolute top-0 left-0 w-full h-full p-2 flex flex-wrap items-end justify-end z-1"
    >
      <svg
        v-for="(event, idx) in dataObj.event.sources"
        :key="idx"
        viewBox="0 0 6 6"
        width="6"
        height="6"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        class="text-orange-500"
      >
        <circle
          cx="3"
          cy="3"
          r="3"
        />
      </svg>
    </span>
    <span
      class="flex items-center justify-center h-full relative text-sm sm:text-base"
      :style="textStyle"
    >
      <slot />
    </span>
  </button>
</template>

<script>
export default {
  props: {
    dataObj: {
      type: Object,
      required: true,
    },
  },
  computed: {
    boxStyle() {
      return {
        width: this.dataObj.width,
        height: this.dataObj.height,
        cursor: this.dataObj.cursor,
        border: this.dataObj.border,
      }
    },
    bgStyle() {
      return {
        backgroundColor: this.dataObj.backgroundColor,
      }
    },
    circleStyle() {
      return {
        color: this.dataObj.invBackgroundColor,
      }
    },
    textStyle() {
      return {
        color: this.dataObj.color,
      }
    },
  },
  methods: {
    onClick() {
      const { event, numOfCases } = this.dataObj
      if (event) {
        this.$emit('click', { event, numOfCases })
      }
    },
  },
}
</script>
