<template>
  <div class="circle">
    <Square
      :id="0"
      :isLighted="isLighted[0]"
      @get-player-sequence="getPlayerSequence"
      @lighten-btn="lightenBtn"
    />

    <Square
      :id="1"
      :isLighted="isLighted[1]"
      @get-player-sequence="getPlayerSequence"
      @lighten-btn="lightenBtn"
    />

    <Square
      :id="2"
      :isLighted="isLighted[2]"
      @get-player-sequence="getPlayerSequence"
      @lighten-btn="lightenBtn"
    />

    <Square
      :id="3"
      :isLighted="isLighted[3]"
      @get-player-sequence="getPlayerSequence"
      @lighten-btn="lightenBtn"
    />
  </div>
</template>

<script>
export default {
  props: {
    isLighted: {
      type: Array,
      required: true,
    },
  },

  data() {
    return {};
  },

  methods: {
    getPlayerSequence(id) {
      this.$emit("get-player-sequence", id);
    },

    lightenBtn(id) {
      this.$emit("lighten-btn", id);
    },
  },
};
</script>


<style lang="scss" scoped>
.circle {
  position: relative;

  display: flex;
  flex-wrap: wrap;

  width: 340px;
  height: 340px;

  border-radius: 50%;

  overflow: hidden;

  animation: rotation 2s ease 0.2s 1 forwards;

  &:hover {
    cursor: pointer;
  }
}

@keyframes rotation {
  0% {
    transform: rotate(-180deg);
    opacity: 0;
  }

  100% {
    transform: rotate(45deg);
    opacity: 1;
  }
}
</style>