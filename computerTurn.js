import { ticTacToeObjArray } from "./data.js"

export const selectRandom = function (){
    const availableBoxes = ticTacToeObjArray.filter((item)=> !item.isChecked)
        return availableBoxes[Math.floor(Math.random()*availableBoxes.length)] 


}

