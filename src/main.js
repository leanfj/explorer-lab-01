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
const cardHolder = document.getElementById("card-holder")
const cardNumberInput = document.getElementById("card-number")
const cvc = document.getElementById("security-code")
const expirationDate = document.getElementById("expiration-date")
const sendButton = document.getElementById("send-button")
const formElement = document.querySelector("form")




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

cardNumberInput.addEventListener("focusout", (e) => {
  if (cardNumberInput.value.length < 19) {
    cardNumberInput.classList.add("error")
  } else {
    cardNumberInput.classList.remove("error")
  }
})

cardNumberInput.addEventListener("focusin", (e) => {
  if (cardNumberInput.classList.contains("error")) {
    cardNumberInput.classList.remove("error")
  }
})

cardHolder.addEventListener("input", (e) => {
  const ccHolder = document.querySelector(".cc-holder .value")
  ccHolder.innerText = cardHolder.value.length > 0 ? cardHolder.value : "Fulano da Silva"
})

cardHolder.addEventListener("focusout", (e) => {
  if (cardHolder.value.length === 0) {
    cardHolder.classList.add("error")
  } else {
    cardHolder.classList.remove("error")
  }
})

cardHolder.addEventListener("focusin", (e) => {
  if (cardHolder.classList.contains("error")) {
    cardHolder.classList.remove("error")
  }
})

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

cvc.addEventListener("focusout", (e) => {
  if (cvc.value.length < 3) {
    cvc.classList.add("error")
  } else {
    cvc.classList.remove("error")
  }
})

cvc.addEventListener("focusin", (e) => {
  if (cvc.classList.contains("error")) {
    cvc.classList.remove("error")
  }
})



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

expirationDate.addEventListener("focusout", (e) => {
  if (expirationDate.value.length < 5) {
    expirationDate.classList.add("error")
  } else {
    expirationDate.classList.remove("error")
  }
})

expirationDate.addEventListener("focusin", (e) => {
  if (expirationDate.classList.contains("error")) {
    expirationDate.classList.remove("error")
  }
})


function setCardsType(type) {
  bgColor1.setAttribute("fill", colors[type].colorSet[0])
  bgColor2.setAttribute("fill", colors[type].colorSet[1])
  logoCartao.setAttribute("src", colors[type].logo)
}

sendButton.addEventListener("click", async (e) => {
  e.preventDefault()
  const cardNumber = cardNumberMasked.value
  const cardHolderValue = cardHolder.value.toUpperCase()
  const cardExpiration = expirationDateMasked.value
  const cardCvc = cvcMasked.value
  if (cardNumber.length < 19 || cardHolderValue.length < 3 || cardExpiration.length < 5 || cardCvc.length < 3) {
    const allInputs = document.querySelectorAll("input")
    allInputs.forEach((input) => {
      input.classList.add("error")
    })
    alert("Preencha todos os campos corretamente")

  } else {
    alert("Cartão cadastrado com sucesso")
    formElement.reset()
  }
  console.log(cardNumber, cardHolderValue, cardExpiration, cardCvc)
})
// setCardsType("masterCard")

// setInterval(() => {
//   const colorsSet = Object.entries(colors)
//   const randomColor = colorsSet[Math.floor(Math.random() * colorsSet.length)]
//   setCardsType(randomColor[0])
// }, 5000)