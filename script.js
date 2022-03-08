const Anchor = {
    CENTER: 'center',
    T_L   : 'top left',
    T_R   : 'top right',
    B_L   : 'bottom left',
    B_R   : 'bottom right'
}

class Part {
    constructor(x, y, transformOrigin, name) {
        this.block = null
        this.positionPartX = x
        this.positionPartY = y
        this.transformOrigin = transformOrigin
        this.name = name

        this.progress = 0
        this.startProgress = 0
        this.val = 0
        this.nex = null
        this.degreeAngle = null
        this.startTouches = null
        
        this.init()
    }
    
    init = () => {
        this.create()
    
        this.block.addEventListener('touchstart', this.touchStart)
        this.block.addEventListener('touchmove', this.touchMove)
    }
    
    create = () => {
        const parent = document.querySelector('.wrapper')
        this.block = document.createElement('div')
        this.block.className = 'part'
        this.block.style.transform = `rotate(${ this.startProgress }deg)`
        this.block.style.top = `${ this.positionPartY }px`
        this.block.style.left = `${ this.positionPartX }px`
        this.block.style.transformOrigin = this.transformOrigin
        this.block.innerHTML = this.name
        
        parent.append(this.block)
    }
    
    touchStart = (event) => {
        this.startProgress = this.progress
        // this.nex - текущий градус поворота при touchstart / slice обрезает слово
        this.nex = parseFloat(this.block.style.transform.slice(7))
    
        // получаем первые координаты касания
        this.startTouches = {
            x: event.changedTouches[0].pageX,
            y: event.changedTouches[0].pageY
        }
    }
    
    touchMove = (event) => {
        // получаем координаты текущего касания
        const touch = {
            x: event.changedTouches[0].pageX,
            y: event.changedTouches[0].pageY
        }
        
        // центр объекта
        const center = {
            x: this.block.offsetLeft + this.block.offsetWidth / 2,
            y: this.block.offsetTop + this.block.offsetHeight / 2
        }
        
        console.log(this.block.offsetTop)
        
        // дистанция от - до +
        let distance = Math.atan2(
          (center.x - touch.x) * (center.y - this.startTouches.y) - (center.y - touch.y) * (center.x - this.startTouches.x),
          (center.x - touch.x) * (center.x - this.startTouches.x) + (center.y - touch.y) * (center.y - this.startTouches.y)
        )
        
        distance *= -1
        
        this.degreeAngle = distance * (180 / Math.PI)
        this.val = this.degreeAngle + this.nex
        this.block.style.transform = `rotate(${ this.val }deg)`
    }
}

new Part(200, 200, Anchor.T_L, 'T_L')
new Part(400, 400, Anchor.CENTER, 'center')
new Part(600, 200, Anchor.T_R, 'T_R')
new Part(200, 600, Anchor.B_L, 'B_L')
new Part(600, 600, Anchor.B_R, 'B_R')
