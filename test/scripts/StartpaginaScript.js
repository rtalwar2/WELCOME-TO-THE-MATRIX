import Matrix from "../../scripts/Matrix.js";

let matrix;
let matrix2;
let rij=0;
let kolom=0;
let rij2=0;
let kolom2=0;
function showNextStep(){//logica van deze methode nog niet 100% in orde, alert wordt niet uitgevoerd.
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
    console.log(rij, kolom2)
    document.querySelector(`#id2_${rij2}-${kolom2}`).classList.add("rood");
}

function showfirstMatrix(matrix){//de 2 methodes kunnen verkort worden door een extra parameter mee te geven
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
    tabel.parentElement.classList.add(`col-md-${matrix[0].length}`);//zodat de matrix met behulp van een bootstrap klasse de duiste breedte heeft
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
let m = new Matrix();

let matrixkey=[[6,24,1],[13,16,10],[20,17,15]];
m.importMatrix(matrixkey)
    m.drawMatrix(document.querySelector("#js_table"));
    console.log(`determinant=${m.getDeterminant()}`);
    console.log(`determinant%26=${m.getDeterminant()%26}`);
    console.log(`Modular Multiplicative Inverse %26=${25}`);

let m2=m.getInverse().adjunct
    for(let i=0;i<m.aantalRijen;i++){
        for(let j=0;j<m.aantalKolommen;j++){
            m2.matrix[i][j]*=25;
            m2.matrix[i][j]%=26;
            if(m2.matrix[i][j]<0){
                m2.matrix[i][j]+=26;
            }
        }
    }
    m2.drawMatrix(document.querySelector("#js_table2"))
// matrix2=[[1,5],[2,5],[3,3]];
// showfirstMatrix(matrix);//matrix tonen
// showsecondMatrix(matrix2);//metrix tonen
// document.querySelector("#next").addEventListener("click",showNextStep)
// document.querySelector(`#id_${rij}-${kolom}`).classList.add("rood");//zodat eerste elementen al gekleurd zijn
// document.querySelector(`#id2_${rij2}-${kolom2}`).classList.add("rood");
}

init();
