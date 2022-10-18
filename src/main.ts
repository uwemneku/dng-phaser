import Phaser from "phaser";
import { GameScene, PreloaderScene } from "./scenes";

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 800,
  height: 500,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
      debug: true,
    },
  },
  scene: [PreloaderScene, GameScene],
  scale: {
    zoom: 2,
  },
};

export default new Phaser.Game(config);
