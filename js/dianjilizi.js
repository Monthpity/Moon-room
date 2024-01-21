class Circle {
  constructor({ origin, speed, color, angle, context }) {
    this.origin = origin
    this.position = { ...this.origin }
    this.color = color
    this.speed = speed
    this.angle = angle
    this.context = context
    this.renderCount = 0
  }

  draw() {
    this.context.fillStyle = this.color
    this.context.beginPath()
    this.context.arc(this.position.x, this.position.y, 2, 0, Math.PI * 2)
    this.context.fill()
  }

  move() {
    this.position.x = (Math.sin(this.angle) * this.speed) + this.position.x
    this.position.y = (Math.cos(this.angle) * this.speed) + this.position.y + (this.renderCount * 0.3)
    this.renderCount++
  }
}

class Boom {
  constructor ({ origin, context, circleCount = 10, area }) {
    this.origin = origin
    this.context = context
    this.circleCount = circleCount
    this.area = area
    this.stop = false
    this.circles = []
  }

  randomArray(range) {
    const length = range.length
    const randomIndex = Math.floor(length * Math.random())
    return range[randomIndex]
  }

  randomColor() {
    const range = ['8', '9', 'A', 'B', 'C', 'D', 'E', 'F']
    return '#' + this.randomArray(range) + this.randomArray(range) + this.randomArray(range) + this.randomArray(range) + this.randomArray(range) + this.randomArray(range)
  }

  randomRange(start, end) {
    return (end - start) * Math.random() + start
  }

  init() {
    for(let i = 0; i < this.circleCount; i++) {
      const circle = new Circle({
        context: this.context,
        origin: this.origin,
        color: this.randomColor(),
        angle: this.randomRange(Math.PI - 1, Math.PI + 1),
        speed: this.randomRange(1, 6)
      })
      this.circles.push(circle)
    }
  }

  move() {
    this.circles.forEach((circle, index) => {
      if (circle.position.x > this.area.width || circle.position.y > this.area.height) {
        return this.circles.splice(index, 1)
      }
      circle.move()
    })
    if (this.circles.length == 0) {
      this.stop = true
    }
  }

  draw() {
    this.circles.forEach(circle => circle.draw())
  }
}

class CursorSpecialEffects {
  constructor() {
    this.computerCanvas = document.createElement('canvas')
    this.renderCanvas = document.createElement('canvas')

    this.computerContext = this.computerCanvas.getContext('2d')
    this.renderContext = this.renderCanvas.getContext('2d')

    this.globalWidth = window.innerWidth
    this.globalHeight = window.innerHeight

    this.booms = []
    this.running = false
  }

  handleMouseDown(e) {
    const boom = new Boom({
      origin: { x: e.clientX, y: e.clientY },
      context: this.computerContext,
      area: {
        width: this.globalWidth,
        height: this.globalHeight
      }
    })
    boom.init()
    this.booms.push(boom)
    this.running || this.run()
  }

  handlePageHide() {
    this.booms = []
    this.running = false
  }

  init() {
    const style = this.renderCanvas.style
    style.position = 'fixed'
    style.top = style.left = 0
    style.zIndex = '999999999999999999999999999999999999999999'
    style.pointerEvents = 'none'

    style.width = this.renderCanvas.width = this.computerCanvas.width = this.globalWidth
    style.height = this.renderCanvas.height = this.computerCanvas.height = this.globalHeight

    document.body.append(this.renderCanvas)

    window.addEventListener('mousedown', this.handleMouseDown.bind(this))
    window.addEventListener('pagehide', this.handlePageHide.bind(this))
  }

  run() {
    this.running = true
    if (this.booms.length == 0) {
      return this.running = false
    }

    requestAnimationFrame(this.run.bind(this))

    this.computerContext.clearRect(0, 0, this.globalWidth, this.globalHeight)
    this.renderContext.clearRect(0, 0, this.globalWidth, this.globalHeight)

    this.booms.forEach((boom, index) => {
      if (boom.stop) {
        return this.booms.splice(index, 1)
      }
      boom.move()
      boom.draw()
    })
    this.renderContext.drawImage(this.computerCanvas, 0, 0, this.globalWidth, this.globalHeight)
  }
}

const cursorSpecialEffects = new CursorSpecialEffects()
cursorSpecialEffects.init()


 //禁止鼠标右击
 document.oncontextmenu = function() {
  event.returnValue = false;
};
//禁用开发者工具F12
document.onkeydown = document.onkeyup = document.onkeypress = function(event) {
  let e = event || window.event || arguments.callee.caller.arguments[0];
  if (e && e.keyCode == 123) {
    e.returnValue = false;
    return false;
  }
};
let userAgent = navigator.userAgent;
if (userAgent.indexOf("Firefox") > -1) {
  let checkStatus;
  let devtools = /./;
  devtools.toString = function() {
    checkStatus = "on";
  };
  setInterval(function() {
    checkStatus = "off";
    console.log(devtools);
    console.log(checkStatus);
    console.clear();
    if (checkStatus === "on") {
      let target = "";
      try {
        window.open("about:blank", (target = "_self"));
      } catch (err) {
        let a = document.createElement("button");
        a.onclick = function() {
          window.open("about:blank", (target = "_self"));
        };
        a.click();
      }
    }
  }, 200);
} else {
  //禁用控制台
  let ConsoleManager = {
    onOpen: function() {
      alert("Console is opened");
    },
    onClose: function() {
      alert("Console is closed");
    },
    init: function() {
      let self = this;
      let x = document.createElement("div");
      let isOpening = false,
        isOpened = false;
      Object.defineProperty(x, "id", {
        get: function() {
          if (!isOpening) {
            self.onOpen();
            isOpening = true;
          }
          isOpened = true;
          return true;
        }
      });
      setInterval(function() {
        isOpened = false;
        console.info(x);
        console.clear();
        if (!isOpened && isOpening) {
          self.onClose();
          isOpening = false;
        }
      }, 200);
    }
  };
  ConsoleManager.onOpen = function() {
    //打开控制台，跳转
    let target = "";
    try {
      window.open("about:blank", (target = "_self"));
    } catch (err) {
      let a = document.createElement("button");
      a.onclick = function() {
        window.open("about:blank", (target = "_self"));
      };
      a.click();
    }
  };
  ConsoleManager.onClose = function() {
    alert("Console is closed!!!!!");
  };
  ConsoleManager.init();
}