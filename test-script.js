
    
    function checkSum(){
        let boxZero = Number(document.getElementById("box0").innerHTML)
        if (boxZero = 24){
            alert("You won!");
        }
        
    }



    function checkGameFinished(){
        let numberDivs = document.getElementsByClassName("showBox");
    
        if(numberDivs.length === 1){
            if(numbers[Number(numberDivs[0].id.substr(3))] === 24){
                document.getElementById("result").innerHTML = "Win";
            }else{
                document.getElementById("result").innerHTML = "Lost";
            }
        }
    }
    
    function initialize() {
        let x = document.getElementsByClassName("boxes");
    
        for (let i = 0; i < x.length; i++) {
            //[0-SOLVABLES.length)
            let numberList = SOLVABLES[0].split(' ');
            x[i].innerHTML = numberList[i];
            numbers[i] = Number(numberList[i]);
        }
    }

    let findPermutations = (list,size) => {
        if (list.length < 2 ){
          return list;
        }
         let permutationsArray = []
        for (let i = 0; i < list.length; i++){
          let char = list[i]
          if (list.indexOf(char) != i)
          continue
          let remainingChars = list.slice(0, i).concat(list.slice(i + 1, list.length));
          for (let permutation of findPermutations(remainingChars)){
            let array = new Array();
            array.push(char);
            if( typeof permutation === "number"){
                array.push(permutation);
            }else{
                array.push.apply(array, permutation);
            }
            permutationsArray.push(array);
          }
        }
        return permutationsArray
      }