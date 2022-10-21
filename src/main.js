import "./css/index.css"

const colors = {
  visa: {colorSet: ["#436D99", "#2D57F2"], logo: "/cc-visa.svg"},
  masterCard: {colorSet: ["#DF6F29", "#C69347"], logo: "/cc-mastercard.svg"},
  default: {colorSet: ["black", "grey"], logo: "/cc-default.svg"}
}

const bgColor1 = document.querySelector(".cc-bg svg > g g:nth-child(1) path")
const bgColor2 = document.querySelector(".cc-bg svg > g g:nth-child(2) path")
const logoCartao = document.querySelector(".cc-logo span:nth-child(2) img")

function setCardsType(type) {
  bgColor1.setAttribute("fill", colors[type].colorSet[0])
  bgColor2.setAttribute("fill", colors[type].colorSet[1])
  logoCartao.setAttribute("src", colors[type].logo)
}

// setCardsType("masterCard")

setInterval(() => {
  const colorsSet = Object.entries(colors)
  const randomColor = colorsSet[Math.floor(Math.random() * colorsSet.length)]
  setCardsType(randomColor[0])
}, 5000)