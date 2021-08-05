<template>
  <div class="app">
    <h1 class="title">Simon Says</h1>
    <div class="circle">
      <div class="centerPoint"></div>
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
      <button class="startBtn" @click="startGame">Start</button>

      <p class="score">
        Round:
        <span class="score__num">
          {{ round }}
        </span>
      </p>
    </div>
    <span class="score">
      Score:
      <span class="score__num">
        {{ score }}
      </span>
    </span>
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
  gap: 20px;

  justify-content: center;
  align-items: center;

  width: 100vw;
  height: 100vh;

  padding: 40px;

  background: grey;
}
.title {
  font-size: 40px;
  text-align: center;
  color: rgb(165, 22, 22);
}

.centerPoint {
  position: absolute;
  left: calc(50% - 25px);
  top: calc(50% - 25px);

  width: 50px;
  height: 50px;

  border: 1.5px rgb(139, 138, 138) solid;
  border-radius: 50%;
  background: silver;
}

.circle {
  position: relative;

  display: flex;
  flex-wrap: wrap;

  width: 300px;
  height: 300px;

  border: 20px solid silver;
  border-radius: 50%;

  overflow: hidden;

  &:hover {
    cursor: pointer;
  }
}

.square {
  width: 50%;
  height: 50%;

  border: 1.5px rgb(139, 138, 138) solid;
}

.green {
  background: #45aa25;

  &.lightened {
    background: lighten($color: #45aa25, $amount: 25%);
  }
}

.red {
  background: #aa2525;

  &.lightened {
    background: lighten($color: #aa2525, $amount: 25%);
  }
}

.yellow {
  background: #aaaa25;

  &.lightened {
    background: lighten($color: #aaaa25, $amount: 25%);
  }
}

.blue {
  background: #2525aa;

  &.lightened {
    background: lighten($color: #2525aa, $amount: 25%);
  }
}

.startBtn {
  width: 80px;
  height: 40px;

  background: silver;

  font-size: 16px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;

  border-radius: 10px;

  cursor: pointer;

  transition: all 0.3s ease-in-out;

  &:hover {
    background: greenyellow;
  }
}

.score {
  font-size: 25px;

  &__num {
    color: rgb(5, 92, 5);
    //color: rgb(15, 15, 221);
    font-weight: 700;
  }
}

.menu {
  display: flex;
  gap: 20px;

  justify-content: center;
  align-items: center;
}
</style>
