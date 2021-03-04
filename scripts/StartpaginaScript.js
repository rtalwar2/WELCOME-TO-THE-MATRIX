
let matrix;
let matrix2;
let rij=0;
let kolom=0;
let rij2=0;
let kolom2=0;
function showNextStep(){
    document.querySelector(`#id_${rij}-${kolom}`).classList.remove("rood");
    document.querySelector(`#id2_${rij2}-${kolom2}`).classList.remove("rood");
    kolom++;
    rij2++;
    if(kolom==matrix[rij].length){
        kolom=0;
        rij++;
        rij2=0;
    }

    if(rij==matrix.length&&kolom2!=matrix2[rij2].length){
        // alert("tutorial finished");
        rij=0;
        kolom2++;
    }
    if(rij==matrix.length&&kolom2==matrix2[rij2].length){
        alert("tutorial finished");
        // kolom2++;
    }

    document.querySelector(`#id_${rij}-${kolom}`).classList.add("rood");
    console.log(rij,kolom2)
    document.querySelector(`#id2_${rij2}-${kolom2}`).classList.add("rood");
    
}

function showfirstMatrix(matrix){
    let tabel=document.querySelector(".table");
    tabel.parentElement.classList.add(`col-md-${matrix[0].length}`);
    tabel.innerText="";
    for(let i in matrix){
        let tr=document.createElement("tr");
        for(let j in matrix[i]){
            let td=document.createElement("td");
            td.innerText=matrix[i][j];
            td.id=`id_${i}-${j}`;
            tr.appendChild(td);
        }
        tabel.appendChild(tr);
    }
}

function showsecondMatrix(matrix){
    let tabel=document.querySelectorAll(".table")[1];
    tabel.parentElement.classList.add(`col-md-${matrix[0].length}`);
    tabel.innerText="";
    for(let i in matrix){
        let tr=document.createElement("tr");
        for(let j in matrix[i]){
            let td=document.createElement("td");
            td.innerText=matrix[i][j];
            td.id=`id2_${i}-${j}`;
            tr.appendChild(td);
        }
        tabel.appendChild(tr);
    }
}






function init(){
console.log("script geladen");
matrix=[[1,2,3],[4,5,66],[7,8,5]];
matrix2=[[1,5],[2,5],[3,3]];
showfirstMatrix(matrix);
showsecondMatrix(matrix2);
document.querySelector("#next").addEventListener("click",showNextStep)
document.querySelector(`#id_${rij}-${kolom}`).classList.add("rood");
document.querySelector(`#id2_${rij2}-${kolom2}`).classList.add("rood");
}

init();