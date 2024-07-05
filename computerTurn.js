import { ticTacToeObjArray } from "./data.js"

export {selectRandom, blockOtherPlayer}

const selectRandom = function (){
    const availableBoxes = ticTacToeObjArray.filter((item)=> !item.isChecked)
        return availableBoxes[Math.floor(Math.random()*availableBoxes.length)] 


}

const blockOtherPlayer = function(index){
    
const returnArray = ticTacToeObjArray.filter(item => item.column == index || item.row == index || item.diag1 == index || item.diag2 == index)
 
const computerChoice= returnArray.filter(item=> !item.isChecked)[0]
return computerChoice

}

const connectThree= function(){

}
