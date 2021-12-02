let firstNumberDiv;
let chosenOperationDiv;
let numbers = new Array();

const OPERATION = {
    ADD : "add",
    SUBTRACT : "subtract",
    MULTIPLY : "multiply",
    DIVIDE : "divide"
}; 

checkGameFinished = () => {
    let numberDivs = document.getElementsByClassName("showBox");
    if(numberDivs.length === 1){
        if(numbers[Number(numberDivs[0].id.substr(3))] === 24){
            document.getElementById("result").innerHTML = "Win";
            document.getElementById("container").style.backgroundColor = "green";

        }else{
            document.getElementById("result").innerHTML = "Lost";
            document.getElementById("container").style.backgroundColor = "red";
        }
    }
}
initialize = () => {
    let x = document.getElementsByClassName("boxes");

    for (let i = 0; i < x.length; i++) {
        let numberList = SOLVABLES[Math.floor(Math.random() * SOLVABLES.length)].split(' ');
        x[i].innerHTML = numberList[i];
        numbers[i] = Number(numberList[i]); 
    }
}

highlight = (target) => {
    target.style.border = "5px solid green";
}

unhighlight = (target) => {
    target.style.border = "";
}

numberClicked = (target) => {
    if(chosenOperationDiv !== undefined && firstNumberDiv === undefined){
        chosenOperationDiv = undefined;
    }else if(chosenOperationDiv === undefined && firstNumberDiv !== undefined){
        unhighlight(firstNumberDiv);
    }else if(chosenOperationDiv !== undefined && firstNumberDiv !== undefined){

        let firstBoxInx = Number(firstNumberDiv.id.substr(3));
        let secondBoxInx = Number(target.id.substr(3));
        let result;
        switch (chosenOperationDiv.id) {
            case OPERATION.ADD:
                result = numbers[firstBoxInx] + numbers[secondBoxInx];
                target.innerHTML = result;
            break;

            case OPERATION.SUBTRACT:
                result = numbers[firstBoxInx] - numbers[secondBoxInx];
                target.innerHTML = result;
            break;

            case OPERATION.MULTIPLY:
                result = numbers[firstBoxInx] * numbers[secondBoxInx];
                target.innerHTML = result;
            break;

            case OPERATION.DIVIDE:
                result = numbers[firstBoxInx] / numbers[secondBoxInx];
                let roundedResult = Math.round(numbers[firstBoxInx] / numbers[secondBoxInx]);
                if(result === roundedResult){
                    target.innerHTML = result;
                }else{
                    target.innerHTML = firstNumberDiv.innerHTML + "/" + target.innerHTML;
                }
            break;
          }
          firstNumberDiv.className = "boxes hideBox";
          
          numbers[secondBoxInx] = result;
          unhighlight(chosenOperationDiv);
          chosenOperationDiv = undefined;
          checkGameFinished();

         }

    firstNumberDiv = target;

    highlight(target);
 }

operationClicked = (target) => {
    if(firstNumberDiv === undefined){
        return;
    }
    if(chosenOperationDiv){
        unhighlight(chosenOperationDiv);
    }
    highlight(target);
    chosenOperationDiv = target;
}

let findPermutations = (list) => {
    if (list.length < 2 ){
        return list;
    }
    
    let permutationsArray = [];

    for (let i = 0; i < list.length; i++){
        let char = list[i];
        if (list.indexOf(char) != i){
            continue;
        }
            
    let remainingChars = list.slice(0, i).concat(list.slice(i + 1, list.length));
    
    for (let permutation of findPermutations(remainingChars)){
        let array = new Array();
        array.push(char);
        if( typeof permutation === 'number'){
            array.push(permutation);
        }else{
            array.push.apply(array, permutation);
        }
        permutationsArray.push(array);
      }
    }
    return permutationsArray;
}


let createAllCombinations = (list) =>{
    let result = new Array();

    list.forEach(operation1 =>{
        list.forEach(operation2 =>{
            list.forEach(operation3 =>{
                result.push([operation1,operation2,operation3]);
            });
        });
    });

    return result;
}

let = solveBtn = () =>{ //reaname func name to solveBtnClicked
    //mergeNumbersAndOperator()
}

mergeNumbersAndOperators = (numbersArray, opsArray) => {
    const array1 = findPermutations(numbers);//rename array1
    const array2 = createAllCombinations(['+','-','*','/']);//rename array2
    const array3 = new Array();//rename array3

    for (let i=0; i < array1.length; i++)//forEach
    {
        for (let j=0; j < array2.length; j++)//forEach
        {
            array3.push([array1[i][0], array2[j][0], array1[i][1], array2[j][1], array1[i][2], array2[j][2], array1[i][3]]);
        }
    }
    return array3;
}