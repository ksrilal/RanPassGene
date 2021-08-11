const resultEl = document.getElementById('result')
const lengthEl = document.getElementById('length')
const uppercaseEl = document.getElementById('uppercase')
const lowercaseEl = document.getElementById('lowercase')
const numbersEl = document.getElementById('numbers')
const symbolsEl = document.getElementById('symbols')
const generateEl = document.getElementById('generate')
const clipboardEl = document.getElementById('clipboard')

const randomFunc = {
    lower: getRandomLower,
    upper: getRandomUpperer,
    number: getRandomNumber,
    symbol: getRandomSymbol
}

clipboardEl.addEventListener('click', () => {
    const textarea = document.createElement('textarea')
    const password = resultEl.innerText

    if(!password) {return}

    textarea.value = password
    document.body.appendChild(textarea)
    textarea.select()
    document.execCommand('copy')
    textarea.remove()
    alert('Password copied to clipboard!')
})

generateEl.addEventListener('click', () => {
    const length = +lengthEl.value
    const hasLower = lowercaseEl.checked
    const hasUpper = uppercaseEl.checked
    const hasNumber = numbersEl.checked
    const hasSymbol = symbolsEl.checked

    resultEl.innerText = generatePassword(hasLower, hasUpper, hasNumber, hasSymbol, length)
})

function generatePassword(lower, upper, number, symbol, length){
    let generatedPassword = ''
    const typesCount = lower + upper + number + symbol
    const typesArray = [{lower}, {upper}, {number}, {symbol}].filter(item => Object.values(item)[0])

    if(typesCount === 0){
        return ''
    }
    
    for(let i=0; i<length; i += typesCount){
        typesArray.forEach(type => {
            const funcName = Object.keys(type)[0]
            generatedPassword += randomFunc[funcName]()
        })
    }

    const finalPassword = generatedPassword.slice(0, length)

    return shuffle(finalPassword)
}

function shuffle(s) {
    var arr = s.split('');           
    var n = arr.length;         
    
    for(var i=0 ; i<n-1 ; ++i) {
      var j = Math.floor(Math.random() * n);     
      var temp = arr[i];            
      arr[i] = arr[j];
      arr[j] = temp;
    }
             
    return arr.join('');            
}

function getRandomLower(){
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97)
}  

function getRandomUpperer(){
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65)
}  

function getRandomNumber(){
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48)
}  

function getRandomSymbol(){
    const symbols = '!@#$%^&*()=<>/,.'
    return symbols[Math.floor(Math.random() * symbols.length)]
}  
