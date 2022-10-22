import "./css/index.css"
import IMask from "imask"

const colors = {
  visa: { colorSet: ["#436D99", "#2D57F2"], logo: "/cc-visa.svg" },
  masterCard: { colorSet: ["#DF6F29", "#C69347"], logo: "/cc-mastercard.svg" },
  default: { colorSet: ["black", "grey"], logo: "/cc-default.svg" }
}

const bgColor1 = document.querySelector(".cc-bg svg > g g:nth-child(1) path")
const bgColor2 = document.querySelector(".cc-bg svg > g g:nth-child(2) path")
const logoCartao = document.querySelector(".cc-logo span:nth-child(2) img")

const cvc = document.getElementById("security-code")
const cvcPattern = {
  mask: "000",
  minLenght: 3,
  placeholderChar: "0",
}

const cvcMasked = IMask(cvc, cvcPattern)

// cvc.addEventListener("input", () => {
//   const cvcNumber = document.querySelector(".cc-security .value")
//   cvcNumber.textContent = cvc.value.length > 0 ? cvc.value : "123"
// })

//Utilizando o evento input com Imasked para capturar o valor do input
cvcMasked.on("accept", () => {
  const cvcNumber = document.querySelector(".cc-security .value")
  cvcNumber.textContent = cvc.value.length > 0 ? cvcMasked.value : "123"
})

const expirationDate = document.getElementById("expiration-date")
const expirationDatePattern = {
  mask: "MM{/}YY",
  blocks: {
    MM: {
      mask: IMask.MaskedRange,
      from: 1,
      to: 12,
    },
    YY: {
      mask: IMask.MaskedRange,
      from: String(new Date().getFullYear()).slice(2),
      to: String(new Date().getFullYear() + 10).slice(2),
    }
  }
}
const expirationDateMasked = IMask(expirationDate, expirationDatePattern)

expirationDate.addEventListener("input", (e) => {
  const ccExpiration = document.querySelector(".cc-expiration .value")
  ccExpiration.innerText = expirationDate.value.length > 0 ? expirationDate.value : "02/32"
})

const cardNumberInput = document.getElementById("card-number")
const cardNumberPattern = {
  mask: [
    {
      mask: "0000 0000 0000 0000",
      regex: /^4\d{0,15}/,
      cardType: "visa",
    },
    {
      mask: "0000 0000 0000 0000",
      regex: /(^5[1-5]\d{0,2}|^22[2-9]\d|^2[3-7]\d{0,2})\d{0,12}/,
      cardType: "masterCard",
    },
    {
      mask: "0000 0000 0000 0000",
      cardType: "default",
    }
  ],
  dispatch: function (appended, dynamicMasked) {
    const number = (dynamicMasked.value + appended).replace(/\D/g, "")
    const foundMask = dynamicMasked.compiledMasks.find((item) => {
      return number.match(item.regex)
    })

    setCardsType(foundMask.cardType)

    return foundMask

  }
}

const cardNumberMasked = IMask(cardNumberInput, cardNumberPattern)
cardNumberInput.addEventListener("input", (e) => {
  const ccNumber = document.querySelector(".cc-number")
  ccNumber.innerText = cardNumberInput.value.length > 0 ? cardNumberInput.value : "1234 5678 9012 3456"
})



function setCardsType(type) {
  bgColor1.setAttribute("fill", colors[type].colorSet[0])
  bgColor2.setAttribute("fill", colors[type].colorSet[1])
  logoCartao.setAttribute("src", colors[type].logo)
}

const cardHolder = document.getElementById("card-holder")

cardHolder.addEventListener("input", (e) => {
  const ccHolder = document.querySelector(".cc-holder .value")
  ccHolder.innerText = cardHolder.value.length > 0 ? cardHolder.value : "Fulano da Silva"
})

// setCardsType("masterCard")

// setInterval(() => {
//   const colorsSet = Object.entries(colors)
//   const randomColor = colorsSet[Math.floor(Math.random() * colorsSet.length)]
//   setCardsType(randomColor[0])
// }, 5000)