<template>
  <div
    :class="squareColor"
    @click="getPlayerSequence"
    @mousedown="lightenBtn"
  ></div>
</template>

<script>
export default {
  props: {
    id: {
      type: Number,
      required: true,
    },
    isLighted: {
      type: Boolean,
      required: true,
    },
  },
  emits: ["get-player-sequence", "lighten-btn"],
  data() {
    return {};
  },
  methods: {
    getPlayerSequence() {
      this.$emit("get-player-sequence", this.id);
    },

    lightenBtn() {
      this.$emit("lighten-btn", this.id);
    },
  },

  computed: {
    squareColor() {
      let squareClass = { square: true, lightened: this.isLighted };

      if (this.id === 0) {
        squareClass["green"] = true;
      }

      if (this.id === 1) {
        squareClass["red"] = true;
      }

      if (this.id === 2) {
        squareClass["yellow"] = true;
      }

      if (this.id === 3) {
        squareClass["blue"] = true;
      }

      return squareClass;
    },
  },
};
</script>

<style lang="scss" scoped>
.square {
  width: 50%;
  height: 50%;

  border: 1.5px black solid;
}

.green {
  background: #225e1c;

  &.lightened {
    background: lighten($color: #225e1c, $amount: 25%);
  }
}

.red {
  background: #e82e08;

  &.lightened {
    background: lighten($color: #e82e08, $amount: 25%);
  }
}

.yellow {
  background: #ffc02a;

  &.lightened {
    background: lighten($color: #ffc02a, $amount: 25%);
  }
}

.blue {
  background: #1c465e;

  &.lightened {
    background: lighten($color: #1c465e, $amount: 25%);
  }
}
</style>