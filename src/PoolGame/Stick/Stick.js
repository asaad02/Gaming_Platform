/* eslint-disable require-jsdoc */
/* eslint-disable max-len */
export default class Stick {
  /**
   * Creates an instance of a Stick.
   * @param {number} x - The initial x position of the stick on the canvas.
   * @param {number} y - The initial y position of the stick on the canvas.
   * @param {string} image - The path to the stick's image file.
   */
  constructor(x, y, image) {
    this.x = x;
    this.y = y;
    this.visible = true;
    this.angle = 0; // Initial angle of the stick, 0 means horizontal.
    this.scale = 0.5; // Scale factor to adjust the stick size, if necessary.
    this.image = new Image();
    this.image.src = image;
    this.loaded = false; // Flag to check if the image has been loaded.
    // Once the image is loaded, update the loaded flag to true.
    this.image.onload = () => {
      this.loaded = true;
    };
  }

  /**
   * Updates the stick's position and angle to follow the mouse cursor around the white ball.
   * This creates the effect of aiming the stick at the white ball from the mouse cursor's position.
   *
   * @param {number} whiteBallX - The X position of the white ball.
   * @param {number} whiteBallY - The Y position of the white ball.
   * @param {number} ballRadius - The X position of the mouse.
   * @param {number} mouseX - The X position of the mouse, adjusted for the canvas coordinate system.
   * @param {number} mouseY - The Y position of the mouse, adjusted for the canvas coordinate system.
   * @param {number} power - The power level to determine the distance from the white ball.
   */
  updatePositionAroundBall(whiteBallX, whiteBallY, ballRadius, mouseX, mouseY, power) {
    mouseX -= 100;
    mouseY -= 100;
    let angle;
    this.x = whiteBallX;
    this.y = whiteBallY;

    const distanceFromBall = 2 * ballRadius + (power * 5); // Adjusted distance based on power

    if ((mouseX >= whiteBallX) && (mouseY <= whiteBallY)) {
      // we are in the top right quadrant
      angle = Math.atan((mouseY - whiteBallY) / (mouseX - whiteBallX)) + Math.PI;

      this.x -= Math.cos(this.angle) * distanceFromBall;
      this.y -= Math.sin(this.angle) * distanceFromBall;
    } else if ((mouseX <= whiteBallX) && (mouseY <= whiteBallY)) {
      // we are in the top left quadrant
      angle = Math.PI - Math.atan((mouseY - whiteBallY) / (whiteBallX - mouseX)) + Math.PI;

      this.x -= Math.cos(this.angle) * distanceFromBall;
      this.y -= Math.sin(this.angle) * distanceFromBall;
    } else if ((mouseX <= whiteBallX) && (mouseY >= whiteBallY)) {
      // we are in the bottom left quadrant
      angle = Math.atan((whiteBallY - mouseY) / (whiteBallX - mouseX));

      this.x -= Math.cos(this.angle) * distanceFromBall;
      this.y -= Math.sin(this.angle) * distanceFromBall;
    } else {
      // we are in the bottom right quadrant
      angle = Math.PI - Math.atan((whiteBallY - mouseY) / (mouseX - whiteBallX));

      this.x -= Math.cos(this.angle) * distanceFromBall;
      this.y -= Math.sin(this.angle) * distanceFromBall;
    }

    this.angle = angle;
  }

  /**
   * Draws the stick on the canvas.
   * @param {CanvasRenderingContext2D} ctx - The 2D rendering context for the canvas.
   */
  draw(ctx) {
    // Do not draw the stick if the image hasn't been loaded.
    if (!this.loaded) return;

    ctx.save(); // Save the current canvas state.
    // Translate the canvas origin to the stick's position. This makes rotation around this point easier.
    ctx.translate(this.x, this.y);
    // Rotate the canvas to the stick's angle.
    ctx.rotate(this.angle);
    // Apply scaling if the stick image needs to be resized.
    ctx.scale(this.scale, this.scale);
    // Draw the stick image.
    // The drawing position is adjusted to ensure the stick rotates around its intended pivot point.
    ctx.drawImage(this.image, -this.image.width, -this.image.height + 20);
    ctx.restore(); // Restore the canvas state to its original settings.
  }
}
