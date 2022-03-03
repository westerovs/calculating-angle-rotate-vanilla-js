class Wheel {
    constructor() {
        this.wheel = document.querySelector('.wheel')
    
        this.progress = 0
        this.startProgress = 0
        this.val = 0
        this.nex = null
        this.degreeAngle = null
        this.startTouches = null
        
        this.init()
    }
    
    init = () => {
        this.wheel.style.transform = `rotate(${ this.startProgress }deg)`
    
        this.wheel.addEventListener('touchstart', this.touchStart)
        this.wheel.addEventListener('touchmove', this.touchMove)
    }
    
    touchStart = (event) => {
        this.startProgress = this.progress
        
        this.nex = this.wheel.style.transform    // this.nex  -  текущий градус поворота при touchstart
        this.nex = parseFloat(this.nex.slice(7)) // уже не помню почему 7, что-то вычислял
        
        // получаем первые координаты касания
        this.startTouches = {
            x: event.changedTouches[0].pageX,
            y: event.changedTouches[0].pageY
        }
    }
    
    touchMove = (event) => {
        // получаем координаты касания
        const touch = {
            x: event.changedTouches[0].pageX,
            y: event.changedTouches[0].pageY
        }
        
        // центр круга
        const center = {
            x: this.wheel.offsetLeft + this.wheel.offsetWidth / 2,
            y: this.wheel.offsetTop + this.wheel.offsetHeight / 2
        }
        
        // дистанция от - до +
        let distance = Math.atan2(
          (center.x - touch.x) * (center.y - this.startTouches.y) - (center.y - touch.y) * (center.x - this.startTouches.x),
          (center.x - touch.x) * (center.x - this.startTouches.x) + (center.y - touch.y) * (center.y - this.startTouches.y)
        )
        
        distance *= -1
        
        this.degreeAngle = distance * (180 / Math.PI)
        this.val = this.degreeAngle + this.nex
        this.wheel.style.transform = `rotate(${ this.val }deg)`
    }
}

new Wheel()
