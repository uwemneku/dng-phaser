import Phaser from "phaser";
import { characterAnimations } from "../@constants";
export default class Game extends Phaser.Scene {
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private mainCharacter!: Phaser.Physics.Arcade.Sprite;
  constructor() {
    super("game");
  }
  preload() {
    this.cursors = this.input.keyboard.createCursorKeys();
  }
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

    this.mainCharacter = this.physics.add.sprite(
      128,
      128,
      "fauna",
      "walk-down-3.png"
    );
    this.anims.create({
      key: "fauna-idle-down",
      frames: [{ key: "fauna", frame: "walk-down-3.png" }],
    });

    idleAnimsData.forEach(({ frame, key }) => {
      this.anims.create({
        key,
        frames: [{ key: "fauna", frame }],
      });
    });

    animsData.forEach(({ key, prefix }) => {
      this.anims.create({
        key,
        frames: this.anims.generateFrameNames("fauna", {
          start: 1,
          end: 8,
          prefix,
          suffix: ".png",
        }),
        repeat: -1,
        frameRate: 15,
      });
    });

    this.mainCharacter.anims.play("fauna-idle-side");

    this.physics.add.collider(wallsLayer, this.mainCharacter);
    this.mainCharacter.body.setSize(
      this.mainCharacter.width * 0.6,
      this.mainCharacter.height * 0.8
    );

    this.cameras.main.startFollow(this.mainCharacter, true);
  }

  update(): void {
    if (!this.cursors || !this.mainCharacter) {
      return;
    }
    const speed = 100;
    const { down, left, right, up } = this.cursors;
    const animationKey: { key: string; velocity: [number, number] } =
      down.isDown
        ? { key: characterAnimations.runDown, velocity: [0, speed] }
        : up.isDown
        ? { key: characterAnimations.runUp, velocity: [0, -speed] }
        : right.isDown
        ? { key: characterAnimations.runSide, velocity: [speed, 0] }
        : left.isDown
        ? { key: characterAnimations.runSide, velocity: [-speed, 0] }
        : { key: "", velocity: [0, 0] };
    this.mainCharacter.flipX = left.isDown ? true : false;
    this.mainCharacter.anims.play(animationKey.key, true);
    this.mainCharacter.setVelocity(...animationKey.velocity);
  }
}

const animsData: { key: string; prefix: string }[] = [
  {
    key: characterAnimations.runDown,
    prefix: "run-down-",
  },
  {
    key: characterAnimations.runSide,
    prefix: "run-side-",
  },
  {
    key: characterAnimations.runUp,
    prefix: "run-up-",
  },
];

const idleAnimsData: { key: string; frame: string }[] = [
  { key: characterAnimations.idleSide, frame: "run-side-3.png" },
  { key: characterAnimations.idleUp, frame: "run-up-3.png" },
  { key: characterAnimations.idleDown, frame: "run-down-3.png" },
];
