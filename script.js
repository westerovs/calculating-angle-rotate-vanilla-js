const wheel = document.querySelector('.wheel')
const dot = document.querySelector('.wheel__dot')
wheel.style.transform = 'rotate(0deg)'

let progress = 0
let startProgress = 0
let val = 0
let nex = null
let degreeAngle = null
let startTouches = null

// ------------------------------------- TOUCHSTART
const touchStart = (event) => {
    startProgress = progress
    
    nex = wheel.style.transform    // nex  -  текущий градус поворота при touchstart
    nex = parseFloat(nex.slice(7)) // уже не помню почему 7, что-то вычислял
    
    // получаем первые координаты касания
    startTouches = {
        x: event.changedTouches[0].pageX,
        y: event.changedTouches[0].pageY
    }
}

// ------------------------------------- TOUCHMOVE
const touchMove = (event) => {
    // получаем координаты касания
    const touch = {
        x: event.changedTouches[0].pageX,
        y: event.changedTouches[0].pageY
    }
    
    // центр круга
    const center = {
        x: wheel.offsetLeft + wheel.offsetWidth / 2,
        y: wheel.offsetTop + wheel.offsetHeight / 2
    }
    
    // дистанция от - до +
    let distance = Math.atan2(
      (center.x - touch.x) * (center.y - startTouches.y) - (center.y - touch.y) * (center.x - startTouches.x),
      (center.x - touch.x) * (center.x - startTouches.x) + (center.y - touch.y) * (center.y - startTouches.y)
    )
    
    distance *= -1
    
    degreeAngle = distance * (180 / Math.PI)
    val = degreeAngle + nex
    wheel.style.transform = `rotate(${ val }deg)`
}

wheel.addEventListener('touchstart', touchStart)
wheel.addEventListener('touchmove', touchMove)


