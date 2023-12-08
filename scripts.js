//IMPORTING THE WORDLIST ARRAYS
import { allowedAnswers } from "./words.js"
import { allowedGuesses } from "./words.js"

//SELECTING A RANDOM ANSWER
const answerList = allowedAnswers
const correctAnswer = answerList[Math.floor(Math.random()*answerList.length)]

//SELECTING POPUPS AND MAKE THEM VISIBLE WHEN THE GAME FINISHES
const popUpWinEl = document.getElementById("win-popup-out")
const popUpLoseEl = document.getElementById("lose-popup-out")

//SELECTING H3 ELEMENTS FOR DISPLAYING ATTEMPT COUNT OR CORRECT ANSWER
const answerEl = document.getElementById("answer")
const attemptCountEl = document.getElementById("attempt-count")

//SELECTING ALL OF THE INPUT FIELDS
const input_list = document.querySelectorAll("input")

//CREATING A EMPTY ARRAY OF GUESSED LETTERS
let letterList = []

//FORCING FOCUS INTO FIRST INPUT WHEN THE APP HAS STARTED
input_list[0].focus()

//CREATING 30 ADD EVENT LISTENERS FOR INPUTS
for (let i=0;i<30;i++){

    //HANDLE KEYS
    input_list[i].addEventListener("keyup",function(event){
        
        //IF YOU PRESS BACKSPACE AND IF ITS NOT FIRST LETTER IT SWITCHES FOCUS TO PREVIOUS LETTER
        if(event.key === "Backspace"){
            if(i%5 != 0){
                input_list[i-1].focus()
            }
        }else{

        //CHECK THE LETTER IF ITS A ENGLISH LETTER AND SETS THE LIMIT TO 1
        let content = event.target.value.replace(/\W|\d/g, '').substr(0, 1).toUpperCase()
        event.target.value = content

        //CHANGES FOCUS TO NEXT INPUT UNLESS ITS THE LAST LETTER OF A WORD
        if ((i+1)%5 != 0 && content ){ 
            input_list[i+1].focus()
        //IF ITS THE LAST LETTER
        }else{
            if (content && event.key === "Enter"){ //CHECK IF USER HITS ENTER AND IF THE WORD'S LAST LETTER EXISTS
                if(allowedGuesses.includes(`${input_list[i-4].value}${input_list[i-3].value}${input_list[i-2].value}${input_list[i-1].value}${input_list[i].value}`)){ //CHECK IF INPUT IS A VALID ENGLISH WORD
                    let myAnswer = `${input_list[i-4].value}${input_list[i-3].value}${input_list[i-2].value}${input_list[i-1].value}${input_list[i].value}` //MAKES A VARIABLE FOR USER'S ANSWER
                    for(let a=0;a<5;a++){ //CHECKS IF USER WINS OR NOT
                        if (myAnswer == correctAnswer){
                            //DISPLAYS WIN POPUP
                            console.log("Tebrikler Kazandınız")
                            for(let a=0; a<5; a++){
                                input_list[i-4+a].style.backgroundColor = "green"
                            }
                            popUpWinEl.style.display = "flex"
                            attemptCountEl.innerText = `You knew the word in ${attemptFinder(i)} attempt!!`
                            break
                        }
                        else{
                            //PUSHES ALL OF THE LETTERS INTO GUESSED ARRAY LIST
                            letterList.push(input_list[i-4])
                            letterList.push(input_list[i-3])
                            letterList.push(input_list[i-2])
                            letterList.push(input_list[i-1])
                            letterList.push(input_list[i])
                            //COMPARES ALL OF THE LETTERS ONE BY ONE
                            for(let a=0;a<5;a++){
                                //CHECKS IF THE LOCATION IS COORECT AND DISPLAYS GREEN COLOR
                                if(correctAnswer[a] === myAnswer[a]){
                                    input_list[i-4+a].style.backgroundColor = "green"
                                }else{
                                    //CHECKS IF THE LETTER IS IN GUESS LIST AND DISPLAYS THE CORRECT COLORS (THE RULE DOES NOT MATCH 100% WITH ORIGINAL RULES!!)
                                    let isYellow = false
                                    for (let b = 0;b<letterList.length;b++){
                                        if (myAnswer[a] == correctAnswer[b]){
                                            isYellow = true
                                        }
                                    }
                                    if (isYellow){
                                        input_list[i-4+a].style.backgroundColor = "yellow"
                                    }else{
                                        input_list[i-4+a].style.backgroundColor = "red"
                                    }
                                    
                                }
                                if(i != 29){
                                    //CHANGES FOCUS TO NEXT LAYER IF ITS NOT LAST LAYER
                                    input_list[i+1].focus()
                                }else{
                                    //DISPLAYS LOSE POPUP
                                    console.log("kaybettiniz")
                                    popUpLoseEl.style.display = "flex"
                                    answerEl.innerText = `The answer was: ${correctAnswer}`
                                    break
                                }
                                
                            }
                            
                        }
                    }
                }
                else{
                    //NEED A POPUP FOR INVALID ENGLISH WORDS
                    console.log("Your input isn't a proper english word")
                }
            }

        }
        }
    })

    //DELETES PREVIOUS LETTER IF ITS NOT LAST OR FIRST LETTER OF THE WORD
    input_list[i].addEventListener("keyup", function(event){
        if (event.key === "Backspace"){
            if (event.target.value === "" && (i%5 != 0) && (((i+1)%5 != 0))){
                input_list[i-1].value = ""
            }

        }
    })

}

//CALCULATES THE NUMBER OF ATTEMPTS IF YOU WIN
const attemptFinder = (i) => (i+1)/5

//CHANGES THE FOCUS TO FIRST EMPTY INPUT IF YOU CLICK ANYWHERE IN BODY
const bodyEl = document.querySelector("body")
bodyEl.addEventListener("click", function(){
    for (let i=0;i<30;i++){
        if (input_list[i].value == ""){
            input_list[i].focus()
            break
        }
    }
})

//F5 IF YOU HIT ANYWHERE WHEN POPUP APPEARS
popUpWinEl.addEventListener("click", function(){
    window.location.href = window.location.href
})

popUpLoseEl.addEventListener("click", function(){
    window.location.href = window.location.href
})




