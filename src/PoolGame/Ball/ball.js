/* eslint-disable require-jsdoc */
/* eslint-disable max-len */
export default class Ball {
  /**
   * Creates an instance of a Ball.
   * @param {number} x - The initial x position of the ball on the canvas.
   * @param {number} y - The initial y position of the ball on the canvas.
   * @param {number} radius - The radius of the ball.
   * @param {string} imagePath - The path to the ball's image file.
   * @param {string} color - The color of the ball.
   */
  constructor(x, y, radius, imagePath, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    // Velocity in the x and y direction. Starts with no movement.
    this.vx = 0;
    this.vy = 0;
    // Creating a new image object for the ball's visual representation.
    this.image = new Image();
    this.image.src = imagePath;
    this.color = color;
    this.isPocketing = false;
  }
  /**
   * Updates the ball's position based on its velocity.
   * Applies a simple friction effect to simulate the natural slowing down of the ball.
   */
  updatePosition() {
    // Apply friction to the velocity to simulate the ball slowing down over time.
    // The friction coefficient should be less than 1 but greater than 0.
    const friction = 0.99;
    if (!this.isPocketing) {
      this.vx *= friction;
      this.vy *= friction;
      // Update the ball's position based on its velocity.
      this.x += this.vx;
      this.y += this.vy;
    }
    // Implementing basic collision detection with the canvas bounds.
    // If the ball hits the left or right edges, reverse its x velocity.
    if (this.x + this.radius >= TABLE_WIDTH || this.x - this.radius <= 0) {
      this.vx = -this.vx;
    }
    // If the ball hits the top or bottom edges, reverse its y velocity.
    if (this.y + this.radius >= TABLE_HEIGHT || this.y - this.radius <= 0) {
      this.vy = -this.vy;
    }
  }
  /**
   * Draws the ball on the canvas.
   * @param {CanvasRenderingContext2D} ctx - The 2D rendering context for the canvas.
   */
  draw(ctx) {
    // Ensure the image is loaded before attempting to draw.
    if (this.image.complete) {
      ctx.drawImage(
        this.image,
        this.x - this.radius,
        this.y - this.radius,
        this.radius * 2,
        this.radius * 2,
      );
    } else {
      // If the image isn't loaded yet, set up an onload function to draw it once it's loaded.
      // Note: This onload function will only work if set before the image has finished loading.
      this.image.onload = () => {
        ctx.drawImage(
          this.image,
          this.x - this.radius,
          this.y - this.radius,
          this.radius * 2,
          this.radius * 2,
        );
      };
    }
  }
}
