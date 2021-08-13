<template>
  <div class="menu">
    <div class="buttons">
      <button class="startBtn" @click="startGame">{{ buttonText }}</button>
    </div>

    <div class="info">
      <p class="score score_animationRight">
        Round:
        <span class="score__num">
          {{ round }}
        </span>
      </p>
      <span class="score score_animationLeft">
        Score:
        <span class="score__num">
          {{ score }}
        </span>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isGamePlaying: {
      type: Boolean,
      required: true,
    },
    round: {
      type: Number,
      required: true,
    },
    score: {
      type: Number,
      required: true,
    },
  },
  emits: ["start-game"],
  data() {},
  methods: {
    startGame() {
      this.$emit("start-game");
    },
  },
  computed: {
    buttonText() {
      let btnText = "";
      if (this.isGamePlaying === true) {
        btnText = "Reset";
      }

      if (this.isGamePlaying === false) {
        btnText = "Start";
      }

      return btnText;
    },
  },
};
</script>

<style lang="scss" scoped>
.menu {
  display: flex;
  flex-direction: column;
  gap: 50px;

  justify-content: center;
  align-items: center;
}

.startBtn {
  width: 140px;
  height: 45px;
  padding-left: 10px;

  background: #c00001;

  font-family: serif;
  font-size: 20px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 8px;

  border-radius: 10px;

  cursor: pointer;
  color: #fff;

  transition: all 0.3s ease-in-out;

  animation: appear 4s ease 0.2s 1 forwards;

  &:hover {
    background: lighten($color: #c00001, $amount: 25%);
  }
}

@keyframes appear {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

.info {
  display: flex;
  gap: 95px;
}

.score {
  font-family: sans-serif;
  font-size: 25px;
  text-transform: uppercase;

  &__num {
    color: #3f4945;
    font-weight: 700;
  }

  &_animationLeft {
    animation: transitionLeft 2s ease 0.2s 1 forwards;
  }

  &_animationRight {
    animation: transitionRight 2s ease 0.2s 1 forwards;
  }
}

@keyframes transitionLeft {
  0% {
    transform: translateX(50vw);
    opacity: 0;
  }

  100% {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes transitionRight {
  0% {
    transform: translateX(-50vw);
    opacity: 0;
  }

  100% {
    transform: translateX(0);
    opacity: 1;
  }
}
</style>