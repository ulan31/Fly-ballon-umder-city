const canvas = document.querySelector('#fly')
const btn = document.querySelector('.btn')
const distance = document.querySelector('.distance-number')

const context = canvas.getContext('2d')


const bg = new Image()
const baloon = new Image()


baloon.src = 'img/baloon.png'
bg.src = 'img/background.png'


const baloonSpeed = {
  x: 300,
  y: 250,
  dx: 1,
  dy: 0.40
}
let startHeight = 75
distance.innerHTML = startHeight + ' м'
let isAnimate = true

bg.onload = function() {
  render()
  drawClock()
  rotatePointer()
  btn.addEventListener('click', function() {
    isAnimate = true
    game()
  })
}

function game() {
  update()
  render()
  rotatePointer()
  if(isAnimate) {
    requestAnimFrame(game)
    rotatePointer()
  }

}

function update() {
 baloonSpeed.x = baloonSpeed.x + baloonSpeed.dx
 baloonSpeed.y = baloonSpeed.y - baloonSpeed.dy
 startHeight += 1;

  // borders
  if(baloonSpeed.x >= 1000) {
    isAnimate = false
    startHeight = 75
    baloonSpeed.x = 300
    baloonSpeed.y = 250
    baloonSpeed.dx = 1
    baloonSpeed.dy = 0.40
  }
}

function render() {
  rotatePointer()
  context.drawImage(bg,0,0)
  context.drawImage(baloon, baloonSpeed.x, baloonSpeed.y, 63, 109)
  distance.innerHTML = startHeight + ' м'
}

const requestAnimFrame = (function() {
  return window.requestAnimationFrame ||
         window.webkitRequestAnimationFrame ||
         window.mozRequestAnimationFrame ||
         window.oRequestAnimationFrame ||
         window.msRequestAnimation ||
        function(callback) {
        window.setTimeout(callback, 1000/20)
        }
})()

function drawClock() {
  context.beginPath();
  context.arc(165, 70, 30, 0, Math.PI * 2);
  context.closePath();
  context.lineWidth = 3;
  context.stroke();
  context.fillStyle = "ivory";
  context.fill();
  context.fillStyle = "black";
}

function rotatePointer(x) {
 const d = new Date();
 const radianAngle = (d.getSeconds() / 60) * Math.PI * 2;
  context.save();
  context.translate(163, 70);
  context.rotate(radianAngle);
  context.moveTo(0, 0);
  context.lineTo(22, 0);
  context.stroke();
  context.restore();
}








