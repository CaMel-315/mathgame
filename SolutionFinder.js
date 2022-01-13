findSolutions = (numbers) =>{
    let numbersOpsList = createPermutationsAndInsertOperators(numbers);
    let numbersOpsBrsList = insertBrackets(numbersOpsList);
    let numbersOpsBrsListToStrings = convertNumOpsBrsArraysToStrings(numbersOpsBrsList);
    let evaluationResults = evaluateNumbersOpsBrsList(numbersOpsBrsListToStrings);
    return findEquationOfSolutions(evaluationResults);
}

findPermutations = (list) => {
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

createPermutationsAndInsertOperators = (numbers) => {
    const numbersList = findPermutations(numbers);
    const opsList = createAllCombinations(['+','-','*','/']);
    const numbersOpsList = new Array();
    
    numbersList.forEach(numbers => {
        opsList.forEach(operators => { 
            numbersOpsList.push( [numbers[0], operators[0], numbers[1], operators[1], numbers[2], operators[2], numbers[3]]);
        });
    });
    return numbersOpsList;
}

evaluateNumbersOpsBrsList = (numbersOpsBrsListToStrings) => {
    let evaluationResults = new Array();

     numbersOpsBrsListToStrings.forEach(numbersOpsBrsStrings => {
        let temp = math.evaluate(numbersOpsBrsStrings);
        evaluationResults.push([numbersOpsBrsStrings,temp]);
    });
    return evaluationResults;
}

convertNumOpsBrsArraysToStrings = (numbersOpsBrsList) =>{
    let numbersOpsBrsListToStrings = new Array();

    numbersOpsBrsList.forEach(numbersOpsBrs =>{
        let temp = numbersOpsBrs.join("");
        numbersOpsBrsListToStrings.push(temp);
    });
    return numbersOpsBrsListToStrings;
}

insertBrackets = (numbersOpsList) =>{
    let result = new Array();

    numbersOpsList.forEach(numbersOps =>{
        //((AmB)nC)qD
        let temp = JSON.parse(JSON.stringify(numbersOps));    
        temp.splice(0,0,'(','(');
        temp.splice(5,0,')');
        temp.splice(8,0,')');
        result.push(temp);

        //(Am(BnC))qD
        temp = JSON.parse(JSON.stringify(numbersOps));
        temp.splice(0,0,'(');
        temp.splice(3,0,'(');
        temp.splice(7,0,')');
        temp.splice(8,0,')');
        result.push(temp);
       
        //Am((BnC)qD)
        temp = JSON.parse(JSON.stringify(numbersOps));
        temp.splice(2,0,'(');
        temp.splice(3,0,'(');
        temp.splice(7,0,')');
        temp.splice(10,0,')');
        result.push(temp);

        //Am(Bn(CqD))
        temp = JSON.parse(JSON.stringify(numbersOps));
        temp.splice(2,0,'(');
        temp.splice(5,0,'(');
        temp.splice(9,0,')');
        temp.splice(10,0,')');
        result.push(temp);
       
        //(AmB)n(CqD)
        temp = JSON.parse(JSON.stringify(numbersOps));
        temp.splice(0,0,'(');
        temp.splice(4,0,')');
        temp.splice(6,0,'(');
        temp.splice(10,0,')');
        result.push(temp);

    });
    return result;

}

findEquationOfSolutions = (evaluationResults) => {

    let solutionsArray = evaluationResults.filter(evaluationResult => evaluationResult[1] === 24);

    return solutionsArray;

}

createAllCombinations = (list) =>{
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