
var scrollbar = false

// 电脑
function desktopRender () {
  var input = document.querySelector('.desktop-input')
  var container = document.querySelector('.browser-desktop-container')
  var value = encodeURI(input.value)
  container.innerHTML = !value ? '' : '<iframe frameborder="0" src="' + value + '"' + (scrollbar ? '': ' scrolling="no"')  +'></iframe>'
}

// 笔记本
function laptopRender () {
  var input = document.querySelector('.laptop-input')
  var container = document.querySelector('.browser-laptop-container')
  var value = encodeURI(input.value)
  container.innerHTML = !value ? '' : '<iframe frameborder="0" src="' + value + '"' + (scrollbar ? '': ' scrolling="no"')  +'></iframe>'
}

// 平板
function tabletRender () {
  var input = document.querySelector('.tablet-input')
  var container = document.querySelector('.browser-tablet-container')
  var value = encodeURI(input.value)
  container.innerHTML = !value ? '' : '<iframe frameborder="0" src="' + value + '"' + (scrollbar ? '': ' scrolling="no"')  +'></iframe>'
}

// 移动端
function mobileRender () {
  var input = document.querySelector('.mobile-input')
  var container = document.querySelector('.browser-mobile-container')
  var value = encodeURI(input.value)
  container.innerHTML = !value ? '' : '<iframe frameborder="0" src="' + value + '"' + (scrollbar ? '': ' scrolling="no"')  +'></iframe>'
}

document.querySelector('.desktop-input').addEventListener('input', desktopRender)
document.querySelector('.laptop-input').addEventListener('input', laptopRender)
document.querySelector('.tablet-input').addEventListener('input', tabletRender)
document.querySelector('.mobile-input').addEventListener('input', mobileRender)

document.querySelector('.scrollbar-input').addEventListener('change', function (event) {
  var value = encodeURI(event.target.value)
  scrollbar = event.target.value === "1"
  desktopRender()
  laptopRender()
  tabletRender()
  mobileRender()
})



// 实例
document.querySelector('.desktop-input').value = 'https://www.cmymoon.com'
document.querySelector('.laptop-input').value = 'https://www.cmymoon.com'
document.querySelector('.tablet-input').value = 'https://www.cmymoon.com'
document.querySelector('.mobile-input').value = 'https://www.cmymoon.com'
desktopRender()
laptopRender()
tabletRender()
mobileRender()

