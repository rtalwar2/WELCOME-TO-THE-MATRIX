document.getElementById("volgende").onclick = volgendeStap;
let matrix = document.getElementsByName("matrix1el");
let a = matrix[0].innerText;

let m2 = [[2,4,6],[8,10,12],[14,16,18]];

function volgendeStap(){
    matrix[0].style.backgroundColor = "blue";
    veranderMatrixMetIdDoor("matrix1", m2);
}


function veranderMatrixMetIdDoor(id, nieweMatrix){
    let matrixInLijst = [];
    for(let rij of nieweMatrix){
        for (let el of rij){
            matrixInLijst.push(el);
        }
    }

    let m = document.getElementsByName(id+"el");
    for (let i = 0; i<9 ;i++){
        m[i].innerText = matrixInLijst[i];
    }

}