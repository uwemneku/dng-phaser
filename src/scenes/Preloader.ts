import Phaser from "phaser";
export default class Preloader extends Phaser.Scene {
  constructor() {
    super("preloader");
  }
  preload() {
    this.load.image("tiles", "public/tiles/dungeon_tiles.png");
    this.load.tilemapTiledJSON("dungeon", "public/tiles/dungeon-01.json");
  }
  create() {
    this.scene.start("game");
  }
}
