document.addEventListener("DOMContentLoaded", () => {
  console.log("inNOVAtiveAV site loaded 🚀");

  const canvas = document.getElementById("starfield");
  const ctx = canvas.getContext("2d");

  let stars = [];
  let numStars = 150;

  // Resize canvas to full screen
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener("resize", resizeCanvas);
  resizeCanvas();

  // Calculate movement vector for 30 degrees (right and up)
  const angleRad = 30 * Math.PI / 180;
  const dx = Math.cos(angleRad); // ≈ 0.866
  const dy = -Math.sin(angleRad); // ≈ -0.5 (negative for upward)

  // Create star objects
  function createStars() {
    stars = [];
    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.5,
        speed: Math.random() * 0.5 + 0.2
      });
    }
  }
  createStars();

  // Animate stars (move right and up)
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#fff";

    stars.forEach(star => {
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
      ctx.fill();

      // Move star at 30 degrees: right and up
      star.x += star.speed * dx;
      star.y += star.speed * dy;

      // If star goes off screen, wrap to left/bottom edge
      if (star.x > canvas.width || star.y < 0) {
        star.x = Math.random() * canvas.width * 0.2; // respawn near left
        star.y = canvas.height - Math.random() * canvas.height * 0.2; // respawn near bottom
      }
    });

    requestAnimationFrame(animate);
  }

  animate();
});
