const canvas = document.querySelector('#fly')
const btn = document.querySelector('.btn')
const distance = document.querySelector('.distance-number')

const context = canvas.getContext('2d')


const bg = new Image()
const baloon = new Image()
const pointer = new Image()

baloon.src = 'img/baloon.png'
bg.src = 'img/background.png'
pointer.src = 'img/pointer.png'

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
  btn.addEventListener('click', function() {
    isAnimate = true
    game()
  })


}

function game() {
  update()
  render()
  if(isAnimate) {
    requestAnimFrame(game)
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
  context.drawImage(bg,0,0)
  context.drawImage(baloon, baloonSpeed.x, baloonSpeed.y, 63, 109)
  context.drawImage(pointer, 140, 100)
  distance.innerHTML = startHeight + ' м'

}

var requestAnimFrame = (function() {
  return window.requestAnimationFrame ||
         window.webkitRequestAnimationFrame ||
         window.mozRequestAnimationFrame ||
         window.oRequestAnimationFrame ||
         window.msRequestAnimation ||
        function(callback) {
        window.setTimeout(callback, 1000/20)
        }
})()









