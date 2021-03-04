




function showMatrix(matrix){
    let tabel=document.querySelector(".table");
    tabel.innerText="";
    for(let row of matrix){
        let tr=document.createElement("tr");
        for(let element of row){
            let td=document.createElement("td");
            td.innerText=element;
            tr.appendChild(td);
        }
        tabel.appendChild(tr);
    }
}





function init(){
console.log("script geladen");
let matrix=[[1,2,3],[4,5,6],[7,8,9]];
showMatrix(matrix);
}

init();