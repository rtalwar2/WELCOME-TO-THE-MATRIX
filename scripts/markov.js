import Matrix from "./Matrix.js";
import {Speler} from "./Speler.js";

let matrix1 = new Matrix(2,2,0);//overgangsmatrix
let matrix2 = new Matrix(2,1,0);//toestandsmatrix
let matrix_opl;
let stapcache = [];
let index;
function init_matrices(){
    //Matrixen aanmaken
    matrix2.matrix[0][0] = 1;
    matrix1.importMatrix([[0.2,0.4],[0.8,0.6]]);//hardgecodeerd

    let overgangsmatrix = document.querySelector("#table1");
    let toestandsmatrix = document.querySelector("#table2");

    matrix1.drawMatrix(overgangsmatrix,"Overgangsmatrix");
    matrix2.drawMatrix(toestandsmatrix,"Toestandsmatrix");
}


function init(){
    init_matrices();
    Vermenigvuldig(matrix2);
    stapcache[0] = matrix_opl;
    //Slider init
    let slider = document.getElementById("range");
    slider.oninput = function() {
        if(stapcache[slider.value] === undefined) {
            stapcache[index] = matrix_opl;
            Vermenigvuldig(matrix_opl);
            index = slider.value;
        }
        else{
            console.log(stapcache[slider.value]);
            toonOplossing(stapcache[slider.value]);
        }
        console.clear();
        console.log(stapcache);
    }
}

function toonOplossing(matrix){
    let oplossing= document.querySelector("#table3");
    matrix.drawMatrix(oplossing,"Oplossing");
}

function Vermenigvuldig(matrix){
    matrix_opl= new Matrix(2,1,0);
    matrix_opl.importMatrix(matrix1.vermenigvuldigMatrix(matrix));
    toonOplossing(matrix_opl);
}

init();