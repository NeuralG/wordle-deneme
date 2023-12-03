const input_list = document.querySelectorAll("input")
input_list[0].focus()

const correctAnswer = "APPLE"

const popUpWinEl = document.getElementById("win-popup-out")
const popUpLoseEl = document.getElementById("lose-popup-out")

let letterList = []

for (let i=0;i<30;i++){

    //HANDLE KEYS
    input_list[i].addEventListener("keyup",function(event){
        
        //HANDLE BACKSPACE
        if(event.key === "Backspace"){
            if(i%5 != 0){
                input_list[i-1].focus()
            }
        }else{

        //HANDLE LETTERS
        let content = event.target.value.replace(/\W|\d/g, '').substr(0, 1).toUpperCase() //LIMITS INPUT TO 1 LETTER ONLY
        event.target.value = content

        if ((i+1)%5 != 0 && content ){ //CHANGES FOCUS TO NEXT UNLESS ITS THE LAST LETTER OF A WORD
            input_list[i+1].focus()
        }else{
            if (content){ //CHECKS THE ANSWER
                let myAnswer = `${input_list[i-4].value}${input_list[i-3].value}${input_list[i-2].value}${input_list[i-1].value}${input_list[i].value}`
                for(let a=0;a<5;a++){
                    if (myAnswer == correctAnswer){
                        console.log("Tebrikler Kazandınız")
                        for(let a=0; a<5; a++){
                            input_list[i-4+a].style.backgroundColor = "green"
                        }
                        popUpWinEl.style.display = "flex"
                        break
                    }
                    else{
                        letterList.push(input_list[i-4])
                        letterList.push(input_list[i-3])
                        letterList.push(input_list[i-2])
                        letterList.push(input_list[i-1])
                        letterList.push(input_list[i])
                        for(let a=0;a<5;a++){
                            if(correctAnswer[a] === myAnswer[a]){
                                input_list[i-4+a].style.backgroundColor = "green"
                            }else{
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
                                input_list[i+1].focus()
                            }else{
                                console.log("kaybettiniz")
                                popUpLoseEl.style.display = "flex"
                                break
                            }
                            
                        }
                        
                    }
                }
            }

        }
        }
    })

}





