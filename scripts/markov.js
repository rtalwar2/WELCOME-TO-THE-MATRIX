import Matrix from "./Matrix.js";
import {Speler} from "./Speler.js";

let matrix1 = new Matrix(2,2,0);//overgangsmatrix
let matrix2 = new Matrix(2,1,0);//toestandsmatrix
let matrix_opl;
let stapcache = [];
let index;
function init_matrices(){
    //Matrixen aanmaken
    matrix2.matrix[0][0] = 10000;
    matrix1.importMatrix([[0.8,0.1],[0.2,0.9]]);//hardgecodeerd

    let overgangsmatrix = document.querySelector("#table1");
    let toestandsmatrix = document.querySelector("#table2");

    matrix1.drawMatrix(overgangsmatrix,"Overgangsmatrix");
    matrix2.drawMatrix(toestandsmatrix,"Toestandsmatrix");
}


function init(){
    init_matrices();
    Vermenigvuldig(matrix2);
    stapcache[1] = matrix_opl;
    //Slider init
    let slider = document.getElementById("range");
    slider.oninput = function() {
        console.clear();
        if(stapcache[slider.value] === undefined) {
            stapcache[index] = matrix_opl;
            Vermenigvuldig(matrix_opl);
            index = slider.value;
        }
        else{
            console.log(stapcache[slider.value]);
            matrix_opl = stapcache[slider.value];
            toonOplossing(stapcache[slider.value]);
        }
        console.log(stapcache);
    }
}

function toonOplossing(matrix){
    let oplossing= document.querySelector("#table3");
    matrix.drawMatrix(oplossing,"Oplossing");
    console.log(matrix_opl.matrix);
    Plotly.newPlot('plot', [{
        x:["Mensen","Zombies"],
        y: [matrix_opl.matrix[0][0],matrix_opl.matrix[1][0]],
        type:'bar'
    }], {
        plot_bgcolor: "#000000",
        paper_bgcolor:"#000000"
    });
}

function Vermenigvuldig(matrix){
    matrix_opl= new Matrix(2,1,0);
    let opl = matrix1.vermenigvuldigMatrix(matrix);
    //hardgecodeerd voor 2x1 af te ronden
    /*opl[0][0] = Math.round(opl[0][0]*10000)/10000;
    opl[1][0] = Math.round(opl[1][0]*10000)/10000;*/
    matrix_opl.importMatrix(opl);
    toonOplossing(matrix_opl);
}

let arr=window.location.pathname.split("/");
if (arr[arr.length-1] === "markov.html") {
    init();
}
