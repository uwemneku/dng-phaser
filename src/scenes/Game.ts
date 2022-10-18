import Phaser from "phaser";
export default class Game extends Phaser.Scene {
  constructor() {
    super("game");
  }
  preload() {}
  create() {
    const map = this.make.tilemap({ key: "dungeon" });
    const tilesSet = map.addTilesetImage("dungeon", "tiles");

    map.createLayer("Ground", tilesSet);
    const wallsLayer = map.createLayer("Walls", tilesSet);
    wallsLayer.setCollisionByProperty({ collides: true });

    const debugGraphics = this.add.graphics().setAlpha(7);
    wallsLayer.renderDebug(debugGraphics, {
      tileColor: null,
      collidingTileColor: new Phaser.Display.Color(243, 234, 48, 235),
      faceColor: new Phaser.Display.Color(40, 39, 47, 225),
    });
  }
}
