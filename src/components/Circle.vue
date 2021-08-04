<template>
  <div class="app">
    <div class="circle">
      <div
        class="green"
        :style="isLighted[0] ? 'opacity: .6;' : ''"
        @click="getPlayerSequence(0)"
      ></div>
      <div
        class="yellow"
        :style="isLighted[1] ? 'opacity: .6;' : ''"
        @click="getPlayerSequence(1)"
      ></div>
      <div
        class="red"
        :style="isLighted[2] ? 'opacity: .6;' : ''"
        @click="getPlayerSequence(2)"
      ></div>
      <div
        class="blue"
        :style="isLighted[3] ? 'opacity: .6;' : ''"
        @click="getPlayerSequence(3)"
      ></div>
    </div>
    <div class="menu">
      <button class="start" @click="startGame">Start!</button>
      <p class="score">Round: {{ round }}</p>
    </div>
    <span>Score: {{ score }} </span>
  </div>
</template>

<script>
export default {
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

    lightenBtn(Id) {
      this.isLighted[Id] = !this.isLighted[Id];

      setTimeout(() => {
        this.isLighted[Id] = !this.isLighted[Id];
      }, 500);
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
}
.circle {
  display: flex;
  flex-wrap: wrap;
  width: 400px;
  height: 400px;

  border: 20px solid silver;
  border-radius: 50%;

  overflow: hidden;
}

.circle div {
  width: 50%;
  height: 50%;

  border: 3px black solid;
}

.green {
  background: rgba(6, 78, 6, 1);
}

.red {
  background: rgba(255, 0, 0, 1);
}

.yellow {
  background: rgba(255, 255, 0, 1);
}

.blue {
  background: rgba(0, 0, 255, 1);
}

.start {
  width: 100px;
  height: 50px;

  background: grey;

  font-size: 18px;

  cursor: pointer;

  &:hover {
    background: greenyellow;
  }
}

.score {
  font-size: 20px;
}

.menu {
  display: flex;
  gap: 20px;

  justify-content: center;
  align-items: center;
}
</style>
