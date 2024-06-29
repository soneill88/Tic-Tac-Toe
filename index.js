import { ticTacToeObjArray } from "./data.js"

let dataArray = []

let gameOver = false

let turncount = 0

const O = '<i class="fa-solid fa-o fa-2x"></i>' 
const X = '<i class="fa-solid fa-x fa-2x"></i>'
const modal = document.getElementById('modal')

document.addEventListener('click', (e)=>{
    if(e.target.dataset.position){
        if(!gameOver){
        handleBoxClick(e.target.dataset.position)}
    } else if(e.target.id == 'reset-btn'){
        handleResetBtnClick()
    }

})

function handleBoxClick(position){
    const activeBox=  ticTacToeObjArray.filter((obj)=> obj.location == position)[0]
    
    if(turncount % 2 == 0 && activeBox.isChecked == false ) {
        document.querySelector(`[data-position= "${position}"]`).innerHTML = X
        activeBox.value = "X"
    } else if (!activeBox.isChecked) {
        document.querySelector(`[data-position= "${position}"]`).innerHTML = O
        activeBox.value="O"
    }
    activeBox.isChecked = true
    checkForWinner()
    turncount++
}


function handleResetBtnClick(){
    ticTacToeObjArray.forEach(obj=> obj.isChecked =false)
    document.querySelectorAll('.box').forEach(ticTac=> ticTac.innerHTML ="")
    turncount = 0
    gameOver = false
    modal.style.display = "none"
}

function checkForWinner(){
   const row1 = ticTacToeObjArray.slice(0,3).map(obj=> obj.value).join('')
   const row2= ticTacToeObjArray.slice(3,6).map(obj=>obj.value).join('')
   const row3= ticTacToeObjArray.slice(6,9).map(obj=>obj.value).join('')

   const col1 = `${ticTacToeObjArray[0].value}${ticTacToeObjArray[3].value}${ticTacToeObjArray[6].value}`
   const col2 = `${ticTacToeObjArray[1].value}${ticTacToeObjArray[4].value}${ticTacToeObjArray[7].value}`
   const col3 = `${ticTacToeObjArray[2].value}${ticTacToeObjArray[5].value}${ticTacToeObjArray[8].value}`

   const diagonal1 = `${ticTacToeObjArray[0].value}${ticTacToeObjArray[4].value}${ticTacToeObjArray[8].value}`
   const diagonal2 = `${ticTacToeObjArray[2].value}${ticTacToeObjArray[4].value}${ticTacToeObjArray[6].value}`

 dataArray = [row1, row2, row3, col1, col2, col3, diagonal1, diagonal2]
 
 if (dataArray.includes('XXX')){
    modal.innerHTML=`
        <h2>Game Over</h2>
        <h3>Player "X" Wins!</h3>
        <button id="reset-btn">New Game</button>`
    ticTacToeObjArray.forEach((item)=> item.value ='')
    gameOver = true
    modal.style.display = "flex"
 }else if (dataArray.includes('OOO')){
     
    modal.innerHTML=`
    <h2>Game Over</h2>
    <h3>Player "O" Wins!</h3>
    <button id="reset-btn">New Game</button>`
    ticTacToeObjArray.forEach((item)=> item.value ='')
    gameOver = true
    modal.style.display = "flex"
 }else if(ticTacToeObjArray.every((item)=> item.isChecked == true)){
    modal.innerHTML=`
    <h2>Game Over</h2>
    <h3>Its a Draw!</h3>
    <button id="reset-btn">New Game</button>`
    gameOver= true
    ticTacToeObjArray.forEach((item)=> item.value ='')
    modal.style.display = "flex"
 }



}

