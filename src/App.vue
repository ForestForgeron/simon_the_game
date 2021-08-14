<template>
  <div class="app">
    <div class="wrapper">
      <h1 class="title">Simon Says</h1>
      <p class="version">v1.5.3</p>
      <Circle :isLighted="isLighted" @click-square="clickSquare" />
      <div class="menu-wrapper">
        <Menu
          :isGamePlaying="isGamePlaying"
          :round="round"
          :score="score"
          @start-game="startGame"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { useSound } from "@vueuse/sound";
import simon1 from "./assets/simonSound1.mp3";
import simon2 from "./assets/simonSound2.mp3";
import simon3 from "./assets/simonSound3.mp3";
import simon4 from "./assets/simonSound4.mp3";
import simonDeath from "./assets/mario-smert.mp3";
import simonCoin from "./assets/marioCoin.mp3";
import simonOst from "./assets/mario-minor.mp3";
export default {
  setup() {
    const sound1 = useSound(simon1, { volume: 0.5 });
    const sound2 = useSound(simon2, { volume: 0.5 });
    const sound3 = useSound(simon3, { volume: 0.5 });
    const sound4 = useSound(simon4, { volume: 0.5 });
    const sound5 = useSound(simonDeath, { volume: 0.5 });
    const sound6 = useSound(simonCoin, { volume: 0.3 });
    const sound7 = useSound(simonOst, { volume: 0.15 });

    const sounds = [sound1, sound2, sound3, sound4, sound5, sound6, sound7];

    return {
      sounds,
    };
  },
  data() {
    return {
      isGamePlaying: false,
      isClickable: false,
      round: 1,
      score: 0,
      isMusicPlaying: false,

      gameSequence: [],
      isLighted: [false, false, false, false],
      playerSequence: [],
    };
  },

  methods: {
    startGame() {
      this.isGamePlaying = true;

      this.round = 1;
      this.score = 0;
      this.gameSequence = [];
      this.playerSequence = [];
      this.playSound(6);
      this.createGameSequence();
    },

    clickSquare(id) {
      if (this.isClickable === true) {
        this.getPlayerSequence(id);
      }
    },

    playSound(Id) {
      this.sounds[Id].stop();

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
      this.isClickable = false;
      let from = 0;
      const to = this.round;

      const timerId = setInterval(() => {
        let randNum = Math.floor(Math.random() * 4);

        this.gameSequence.push(randNum);

        this.lightenBtn(randNum);

        from++;
        if (from == to) {
          clearInterval(timerId);
          this.isClickable = true;
        }
      }, 1000);
    },

    getPlayerSequence(Id) {
      this.playerSequence.push(Id);
      this.lightenBtn(Id);

      if (this.playerSequence.length == this.gameSequence.length) {
        this.compareSequences();
      }
    },

    compareSequences() {
      let hits = 0;
      for (let i = 0; i < this.gameSequence.length; i++) {
        if (this.gameSequence[i] !== this.playerSequence[i]) {
          this.sounds[6].stop();
          this.playSound(4);
          hits = 0;
          this.isGamePlaying = false;
          break;
        }

        if (this.gameSequence[i] === this.playerSequence[i]) {
          hits++;
          this.score += 10;
          this.playSound(5);
        }
      }

      if (this.gameSequence.length === hits) {
        this.gameSequence = [];
        this.playerSequence = [];
        this.round++;

        this.createGameSequence();
      }
    },
  },
};
</script>

<style lang="scss">
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;

  -webkit-tap-highlight-color: transparent;
}

.menu-wrapper {
  margin-top: 50px;
}

.app {
  display: flex;
  flex-direction: column;

  align-items: center;

  width: 100vw;
  height: 100vh;

  background: #f6d89e;
}

.wrapper {
  position: relative;
  display: flex;
  flex-direction: column;

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
</style>
