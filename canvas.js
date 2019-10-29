let canvas = document.querySelector('canvas')
let content = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

// Variables
let mouse = {x: innerWidth / 2, y: innerHeight / 2}
let colors = ['#BF99A7', '#586F8C', '#0E2940', '#F2CEAE', '#F2C1AE']
let gravity = 0.50
let friction = 0.95

// Event Listeners
addEventListener('mousemove', function(event) {
  mouse.x = event.clientX;
  mouse.y = event.clientY
})

addEventListener('resize', function() {
  canvas.width = innerWidth
  canvas.height = innerHeight
  init()
})

addEventListener('click', function(event) {
  init()
})

// Utility Functions
function randomIntFromRange(min, max) {
  return Math.floor(Math.random() * (max - min +1) + min)
}

function randomColor(colors) {
  return colors[Math.floor(Math.random() * colors.length)]
}

// Objects
function Ball(x, y, dx, dy, radius, color) {
  this.x = x
  this.y = y
  this.dx = dx
  this.dy = dy
  this.radius = radius
  this.color = color

  this.update = function() {
    // if it hits the bottom
    if (this.y + this.radius + this.dy > canvas.height) {
      // reverse it
      this.dy = -this.dy
      this.dy = this.dy * friction;
      this.dx = this.dx * friction
    } else {
      this.dy += gravity
    }

    // if it hits the side of the screen
    if (this.x + this.radius >= canvas.width || this.x - this.radius <= 0) {
      // reverse it
      this.dx = -this.dx * friction
    }
    
    this.x += this.dx
    this.y += this.dy
    this.draw()
  }
  this.draw = function() {
    content.beginPath()
    content.arc(this.x, this.y, this.radius, 0, Math.PI *2, false)
    content.fillStyle = this.color
    content.fill()
    content.stroke()
    content.closePath()
  }
}

// Implementation
let ballArray = []

function init() {
  ballArray = []

  for (let i = 0; i < 200; i++) {
    let radius = randomIntFromRange(8, 20)
    let x = randomIntFromRange(radius, canvas.width - radius)
    let y = randomIntFromRange(0, canvas.height - radius)
    let dx = randomIntFromRange(-3, 3)
    let dy = randomIntFromRange(-2, 2)

    ballArray.push(new Ball(x, y, dx, dy, radius, randomColor(colors)))
  }
}

//Animated Loop
function animate() {
  requestAnimationFrame(animate)
  // clear the canvas before updating
  content.clearRect(0, 0, canvas.width, canvas.height)
  // loop thru the ball array and update all the balls.
  for (let i = 0; i < ballArray.length; i++) {
    ballArray[i].update()
  }
}

init()
animate()