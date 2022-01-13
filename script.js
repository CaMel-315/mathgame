let firstNumberDiv;
let chosenOperationDiv;
let numbers = new Array();
let solutions;

const OPERATION = {
    ADD : "add",
    SUBTRACT : "subtract",
    MULTIPLY : "multiply",
    DIVIDE : "divide"
}; 

initialize = () =>{
    let numberDivs = document.getElementsByClassName("boxes");
    
    let equationOfSolutions;
    //let start = Date.now();
    do{
        for (let i = 0; i < numberDivs.length; i++) {
            let numberList = Math.floor(Math.random() * 13 + 1);
            numberDivs[i].innerHTML = numberList;
            numbers[i] = Number(numberList);
        }
        equationOfSolutions = findSolutions(numbers);
    }while(equationOfSolutions.length < 1);

    solutions = equationOfSolutions;

    //let end = Date.now();
    //console.log((end - start)/1000);
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

printSolutions = () => {
    solutions.slice(0, 5).forEach( solution =>{
        document.getElementById("solutions").innerHTML += solution[0]+ "<br/>";
    })
}

reloadPage = () =>{
    location.reload();
    return false;
}

checkGameFinished = () => {
    let numberDivs = document.getElementsByClassName("showBox");
    if(numberDivs.length === 1){
        if(numbers[Number(numberDivs[0].id.substr(3))] === 24){
            document.getElementById("button6").innerHTML = "You Won";
            document.getElementById("container").style.backgroundColor = "green";

        }else{
            document.getElementById("button6").innerHTML = "You Lost";
            document.getElementById("container").style.backgroundColor = "red";
        }
    }
}