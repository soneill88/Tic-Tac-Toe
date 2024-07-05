import { ticTacToeObjArray } from "./data.js"
import { selectRandom, blockOtherPlayer } from "./computerTurn.js"
let dataArray = []

let gameOver = false
let turnOver = false

let turncount = 0

const O = '<i class="fa-solid fa-o fa-2x"></i>' 
const X = '<i class="fa-solid fa-x fa-2x"></i>'

const modal = document.getElementById('modal')
const playAgainstComputerBtn = document.getElementById('computer-checkbox')



document.addEventListener('click', (e)=>{
    if(e.target.dataset.position){
        if(!gameOver && !playAgainstComputerBtn.checked){
        handleBoxClick(e.target.dataset.position)}
        else if(!gameOver && !turnOver && playAgainstComputerBtn.checked){
        handleBoxClickTwoPlayer(e.target.dataset.position)
        }
    } else if(e.target.id == 'reset-btn'){
        handleResetBtnClick(e.target.dataset.position)
    }

})

function handleBoxClick(position){
    const activeBox=  ticTacToeObjArray.filter((obj)=> obj.location == position)[0]
    
    if(turncount % 2 == 0 && activeBox.isChecked == false ) {
        document.querySelector(`[data-position= "${position}"]`).innerHTML = X
        activeBox.value = "X"
        turncount++
    } else if (!activeBox.isChecked) {
        document.querySelector(`[data-position= "${position}"]`).innerHTML = O
        activeBox.value="O"
        turncount++
    }
    activeBox.isChecked = true
    checkForWinner()
    
}

function handleBoxClickTwoPlayer(position){
    const activeBox=  ticTacToeObjArray.filter((obj)=> obj.location == position)[0]
   
  if(!activeBox.isChecked) {
    document.querySelector(`[data-position= "${position}"]`).innerHTML = X
        activeBox.value = "X"
        activeBox.isChecked = true
        turnOver= true
       
        checkForWinner()

        setTimeout(()=> !gameOver ? handleComputerTurn() : '', 1100)
  }
         
    

}

function handleComputerTurn(){
    let computerChoice
    const lastChance = getDataArray().indexOf('XX')
    const aboutToWin = getDataArray().indexOf('OO')
    const connectTwo = getDataArray().indexOf('O')

    if(aboutToWin != (-1)){
        computerChoice = blockOtherPlayer(aboutToWin)
    }else if(lastChance != (-1)) {
        computerChoice = blockOtherPlayer(lastChance)
    }else if(connectTwo != (-1)){

        computerChoice = blockOtherPlayer(connectTwo)

    }else{
        computerChoice = selectRandom()
    }

   


    document.querySelector(`[data-position= "${computerChoice.location}"]`).innerHTML = O
    computerChoice.isChecked = true
    computerChoice.value ="O" 
    turnOver = false
    console.log(blockOtherPlayer(lastChance))
    checkForWinner()
}


function handleResetBtnClick(){
    ticTacToeObjArray.forEach(obj=> obj.isChecked =false)
    document.querySelectorAll('.box').forEach(ticTac=> ticTac.innerHTML ="")
    turncount = 0
    gameOver = false
    modal.style.display = "none"
}

function checkForWinner(){
    getDataArray()
 if (dataArray.includes('XXX')){
     setTimeout(() => handleEndGame("Player X Wins!"), 1000)
 }else if (dataArray.includes('OOO')){
     setTimeout(() => handleEndGame("Player O Wins!"), 1000)
 }else if(ticTacToeObjArray.every((item)=> item.isChecked == true)){
    setTimeout(() => handleEndGame("It's a Draw."), 1000)
 }



}



function handleEndGame(winner){
    modal.innerHTML=`
    <h2>Game Over</h2>
    <h3>${winner}</h3>
    <button id="reset-btn">New Game</button>`
    gameOver= true
    turnOver= false
    ticTacToeObjArray.forEach((item)=> item.value ='')
    modal.style.display = "flex"

}

function getDataArray(){
    const row1 = ticTacToeObjArray.slice(0,3).map(obj=> obj.value).join('')
    const row2= ticTacToeObjArray.slice(3,6).map(obj=>obj.value).join('')
    const row3= ticTacToeObjArray.slice(6,9).map(obj=>obj.value).join('')
 
    const col1 = `${ticTacToeObjArray[0].value}${ticTacToeObjArray[3].value}${ticTacToeObjArray[6].value}`
    const col2 = `${ticTacToeObjArray[1].value}${ticTacToeObjArray[4].value}${ticTacToeObjArray[7].value}`
    const col3 = `${ticTacToeObjArray[2].value}${ticTacToeObjArray[5].value}${ticTacToeObjArray[8].value}`
 
    const diagonal1 = `${ticTacToeObjArray[0].value}${ticTacToeObjArray[4].value}${ticTacToeObjArray[8].value}`
    const diagonal2 = `${ticTacToeObjArray[2].value}${ticTacToeObjArray[4].value}${ticTacToeObjArray[6].value}`
 
  dataArray = [row1, row2, row3, col1, col2, col3, diagonal1, diagonal2]

  return dataArray
}