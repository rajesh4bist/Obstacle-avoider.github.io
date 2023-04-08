const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Circle variables
let circleX = 0;
let circleY = 0;
const circleRadius = 20;
let score = 0;

// Initialize game
initialize();

// Main game loop
function gameLoop() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw circle
    ctx.beginPath();
    ctx.arc(circleX, circleY, circleRadius, 0, 2 * Math.PI);
    ctx.fillStyle = 'red';
    ctx.fill();

    // Draw score
    ctx.fillStyle = 'black';
    ctx.font = '24px Arial';
    ctx.fillText('Score: ' + score, 10, 30);

    // Check for collision with mouse
    canvas.addEventListener('click', function(event) {
        const rect = canvas.getBoundingClientRect();
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;
        if(Math.sqrt(Math.pow(circleX - mouseX, 2) + Math.pow(circleY - mouseY, 2)) < circleRadius) {
            score++;
            initialize();
        }
    });

    // Move circle
    setTimeout(initialize, 1000);
}

// Start game
function initialize() {
    // Initialize circle position
    circleX = Math.floor(Math.random() * (canvas.width - 2 * circleRadius)) + circleRadius;
    circleY = Math.floor(Math.random() * (canvas.height - 2 * circleRadius)) + circleRadius;

    // Start game loop
    gameLoop();
}