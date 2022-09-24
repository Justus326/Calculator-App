class Calculator {
    constructor(previousDisplayEl,currentDisplayEl) {
        this.previousDisplayEl = previousDisplayEl
        this.currentDisplayEl = currentDisplayEl
        this.clear()
    }
    clear(){
       this.currentDisplay = ''
       this.previousDisplay = ''
       this.operation = undefined
    }

    delete(){
       this.currentDisplay = this.currentDisplay.toString().slice(0, -1)
    }

    apendNumber(number){
        if(number==='.'&& this.currentDisplay.includes('.'))return
       this.currentDisplay = this.currentDisplay.toString() + number.toString()
    }

chooseOperation (operation){
    if(this.currentDisplay === '')return
    if(this.previousDisplay !== ''){
        this.compute()
    }
   this.operation = operation
   this.previousDisplay = this.currentDisplay
   this.currentDisplay = ''
   
   {
       this.compute()
   }
}

compute(){
  let computation
   const prev = parseFloat(this.previousDisplay)
   const current = parseFloat(this.currentDisplay)
   if(isNaN(prev) || isNaN(current)) return
    switch (this.operation){
        case '+':
            computation = prev + current
            break
        case '-':
            computation = prev - current
            break
        case '*':
            computation = prev * current
            break
        case '/':
            computation = prev / current
            break
            default:
                return
    }
    this.currentDisplay = computation
    this.operation = undefined
    this.previousDisplay = ''
}
getDisplayNumber(number){
    const stringNumber = number.toString()
    const integerDigits = parseFloat(stringNumber.split('.')[0])
    const decimalDigits = stringNumber.split('.')[1]
   
    let integerDisplay
     if(isNaN(integerDigits)){
         integerDisplay = ''
     }
     else{
         integerDisplay = integerDigits.toLocaleString('en',{
         maximumFractionDigits: 0 })
     }
     if(decimalDigits!= null){
         return `${integerDisplay}.${decimalDigits}`
     }
     else{
         return integerDisplay
     }
}

updateDisplay(){
 this.currentDisplayEl.innerText = this.getDisplayNumber(this.currentDisplay)
 if(this.operation !=null){
   this.previousDisplayEl.innerText = `${this.getDisplayNumber(this.previousDisplay)} ${this.operation}`
 }
 else{
     this.previousDisplayEl.innerText = ''
 }
 }
}



const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-clear]')
const previousDisplayEl = document.querySelector('[data-previous-display]')
const currentDisplayEl = document.querySelector('[data-current-display]')

const calculator = new Calculator(previousDisplayEl,currentDisplayEl)

numberButtons.forEach(button =>{
    button.addEventListener('click', () =>{
        calculator.apendNumber(button.innerText)
        calculator.updateDisplay()
    })
    
})

operationButtons.forEach(button =>{
    button.addEventListener('click', () =>{
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
    
})

equalsButton.addEventListener('click', button =>{
    calculator.compute()
    calculator.updateDisplay()
})

allClearButton.addEventListener('click', button =>{
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', button =>{
    calculator.delete()
    calculator.updateDisplay()
})