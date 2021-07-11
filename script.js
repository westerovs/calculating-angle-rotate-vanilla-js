document.addEventListener('DOMContentLoaded',  () => {
    const wheel = document.querySelector('.wheel')
    wheel.style.transform = 'rotate(0deg)'
    
    let progress = 0
    let startProgress = 0
    const step = 90 // step - шаг доводки доводится если значение шага больше 50%
    
    let Nex = null
    let degree_angle = null
    let val = 0
    
    let swipe = null
    let startSwaipe = null
    let stopSwaipe = null
    let startMouse = null
    
    // ------------------------------------- TOUCHSTART
    const touchStart = (event) => {
        wheel.style.transition = 's'
        
        startSwaipe = new Date().getTime()
        startProgress = progress
        Nex = wheel.style.transform // Nex  -  текущий градус поворода при touchstart
        Nex = parseFloat(Nex.slice(7))
        
        startMouse = {
            x: event.changedTouches[0].pageX,
            y: event.changedTouches[0].pageY
        }
        wheel.addEventListener('touchmove', touchMove)
    }
    
    // ------------------------------------- TOUCHMOVE
    const touchMove = (event) => {
        let mouse = {
            x: event.changedTouches[0].pageX,
            y: event.changedTouches[0].pageY
        }
        let center = {
            x: wheel.offsetLeft + wheel.offsetWidth / 2,
            y: wheel.offsetTop + wheel.offsetHeight / 2
        }
        let Dist = Math.atan2(
            (center.x - mouse.x) * (center.y - startMouse.y) -
            (center.y - mouse.y) * (center.x - startMouse.x),
            (center.x - mouse.x) * (center.x - startMouse.x) +
            (center.y - mouse.y) * (center.y - startMouse.y)
        )
        
        Dist *= -1
        
        degree_angle = Dist * (180 / Math.PI)
        val = degree_angle + Nex
        wheel.style.transform = `rotate(${ val }deg)`
    }
    
    // ------------------------------------- TOUCHEND
    const touchEnd = () => {
        let delay = '500ms' // время доводки
        
        stopSwaipe = new Date().getTime()
        
        let totalTimeSwipe = stopSwaipe - startSwaipe
        
        console.clear()
        console.log('всего прошло: ' + totalTimeSwipe)
        
        if (totalTimeSwipe <= 200) {
            if (degree_angle > 0) {
                console.log(`totalTimeSwipe < 200`)
                
                wheel.style.transition = '0.5s'
                wheel.style.transform = `rotate(${
                    Math.trunc(val / 90) * 90 + 180
                }deg)`
            } else {
                wheel.style.transition = '0.5s'
                wheel.style.transform = `rotate(${
                    Math.trunc(val / 90) * 90 - 180
                }deg)`
            }
        }
        
        // доводка
        else {
            swipe = Math.round(val / 90) * 90
            wheel.style.transition = delay
            wheel.style.transform = `rotate(${ swipe }deg)`
        }
    }
    
    wheel.addEventListener('touchstart', touchStart)
    wheel.addEventListener('touchend', touchEnd)
})
