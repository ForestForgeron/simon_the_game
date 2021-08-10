<template>
  <div class="app">
    <div class="wrapper">
      <h1 class="title">Simon Says</h1>
      <p class="version">v1.3.5</p>
      <div class="circle">
        <div
          class="square green"
          :class="{ lightened: isLighted[0] }"
          @click="getPlayerSequence(0)"
          @mousedown="lightenBtn(0)"
        ></div>
        <div
          class="square red"
          :class="{ lightened: isLighted[1] }"
          @click="getPlayerSequence(1)"
          @mousedown="lightenBtn(1)"
        ></div>
        <div
          class="square yellow"
          :class="{ lightened: isLighted[2] }"
          @click="getPlayerSequence(2)"
          @mousedown="lightenBtn(2)"
        ></div>
        <div
          class="square blue"
          :class="{ lightened: isLighted[3] }"
          @click="getPlayerSequence(3)"
          @mousedown="lightenBtn(3)"
        ></div>
      </div>
      <div class="menu">
        <div class="buttons">
          <button class="startBtn" @click="startGame">Start</button>
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
    </div>
  </div>
</template>

<script>
import { useSound } from "@vueuse/sound";
import simon1 from "../assets/simonSound1.mp3";
import simon2 from "../assets/simonSound2.mp3";
import simon3 from "../assets/simonSound3.mp3";
import simon4 from "../assets/simonSound4.mp3";

export default {
  setup() {
    const sound1 = useSound(simon1);
    const sound2 = useSound(simon2);
    const sound3 = useSound(simon3);
    const sound4 = useSound(simon4);

    const sounds = [sound1, sound2, sound3, sound4];

    return {
      sounds,
    };
  },
  data() {
    return {
      round: 1,
      score: 0,
      gameSequence: [],
      isLighted: [false, false, false, false],
      playerSequence: [],
    };
  },

  methods: {
    startGame() {
      this.round = 1;
      this.score = 0;
      this.gameSequence = [];
      this.playerSequence = [];

      this.createGameSequence();
    },

    playSound(Id) {
      this.sounds[Id].play();
    },

    lightenBtn(Id) {
      this.isLighted[Id] = !this.isLighted[Id];

      this.playSound(Id);

      setTimeout(() => {
        this.isLighted[Id] = !this.isLighted[Id];
      }, 300);
    },

    createGameSequence() {
      let from = 0;
      const to = this.round;

      const timerId = setInterval(() => {
        let randNum = Math.floor(Math.random() * 4);

        this.gameSequence.push(randNum);
        console.log("game num: " + randNum);

        this.lightenBtn(randNum);

        from++;
        if (from == to) {
          clearInterval(timerId);
        }
      }, 1000);
    },

    getPlayerSequence(Id) {
      this.playerSequence.push(Id);

      console.log("player num: " + Id);

      if (this.playerSequence.length == this.gameSequence.length) {
        this.compareSequences();
      }
    },

    compareSequences() {
      let hits = 0;
      for (let i = 0; i < this.gameSequence.length; i++) {
        if (this.gameSequence[i] !== this.playerSequence[i]) {
          console.log("loose");
          this.startGame();
          break;
        }

        if (this.gameSequence[i] === this.playerSequence[i]) {
          hits++;
          this.score += 10;
        }
      }

      if (this.gameSequence.length == hits) {
        console.log("win");
        this.gameSequence = [];
        this.playerSequence = [];
        this.round++;
        this.createGameSequence();
      }
    },
  },
};
</script>


<style lang="scss" scoped>
.app {
  display: flex;
  flex-direction: column;
  //gap: 20px;

  //justify-content: center;
  align-items: center;

  width: 100vw;
  height: 100vh;

  //padding: 40px;

  background: #f6d89e;
}

.wrapper {
  position: relative;
  display: flex;
  flex-direction: column;
  //gap: 30px;

  //justify-content: center;
  align-items: center;

  width: 350px;
  height: 100vh;
}

.title {
  margin-top: 10px;
  margin-bottom: 10px;

  font-family: "Comic Sans MS", "Comic Sans", cursive;
  font-size: 50px;
  text-align: center;

  color: #a5340a;

  animation: moveDown 2s ease 0.2s 1 forwards;
}

@keyframes moveDown {
  from {
    transform: translateY(-10vh);
  }

  to {
    transform: translateY(0);
  }
}

.version {
  color: #a5340a;
  margin-bottom: 20px;
  font-size: 21px;

  animation: appear 2s ease 0.2s 1 forwards;
}

.circle {
  position: relative;

  display: flex;
  flex-wrap: wrap;

  width: 340px;
  height: 340px;

  border-radius: 50%;

  overflow: hidden;

  //transform: rotate(45deg);

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

  animation: appear 3s ease 0.2s 1 forwards;

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
  gap: 100px;
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

.menu {
  display: flex;
  flex-direction: column;
  gap: 50px;

  justify-content: center;
  align-items: center;

  margin-top: 50px;
}

@media screen and(max-width: 960px) {
  .wrapper {
    width: 100vw;
    height: 100vh;
  }

  .circle {
  }
}
</style>