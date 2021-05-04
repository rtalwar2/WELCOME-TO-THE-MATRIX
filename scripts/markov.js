import Matrix from "./Matrix.js";
import {Speler} from "./Speler.js";

let matrix1 = new Matrix(2,2,0);//overgangsmatrix
let matrix2 = new Matrix(2,1,0);//toestandsmatrix
let oplossingcache = [];
let index = 0;
let allex = [];
let alley = [];

function init_matrices(){
    //Matrixen aanmaken
    matrix2.matrix[0][0] = 100;
    matrix1.importMatrix([[0.8,0.1],[0.2,0.9]]);//hardgecodeerd

    let overgangsmatrix = document.querySelector("#table1");
    let toestandsmatrix = document.querySelector("#table2");

    matrix1.drawMatrix(overgangsmatrix,"Overgangsmatrix");
    matrix2.drawMatrix(toestandsmatrix,"Toestandsmatrix");
}

function terug() {
    let spelernaam = localStorage.getItem("huidige speler");
    let speler = new Speler(spelernaam);
    speler.eindTutorialOefening(localStorage.getItem("selected_button"));
    window.open("./main.html", "_self");
}

function init(){
    document.getElementById("mainPage").addEventListener("click", terug);//eventlistener voor exit knop
    init_matrices();
    Vermenigvuldig(matrix2);
    oplossingcache[0] = matrix2;
    for(let i = 0;i<matrix2.matrix[0][0];i++){
        oplossingcache[i+1] = Vermenigvuldig(oplossingcache[i]);
        allex[i] = (Math.random())+3;
        alley[i] = (Math.random()*6)+3;
    }

    let sliderSteps = [];
    for(let i = 0; i<50;i++){
        sliderSteps.push({
            method: 'animate',
            label: i,
            args: [i, {
                mode: 'immediate',
                transition: {duration: 300},
                frame: {duration: 300, redraw: false},
            }]
        });
    }
    Plotly.newPlot('plot', [{
        x:allex,
        y:alley,
        mode:'markers',
        hoverinfo:'skip'
    }], {
        xaxis:{
            range:[1,10],
            visible:false
        },
        yaxis:{
            range:[0,10],
            visible:false
        },
        color:'black',
        plot_bgcolor:'black',
        paper_bgcolor:'black',
        sliders: [{
            pad: {l: 130, t: 55},
            currentvalue: {
                visible: true,
                prefix: 'Jaar: ',
                xanchor: 'right',
                font: {size: 20, color: '#666'}
            },
            steps: sliderSteps
        }]
    });
    document.querySelector('#plot').on('plotly_sliderchange',function(e){
        index = e.step.label;
        toonOplossing(oplossingcache[index]);
        requestAnimationFrame(update);
    });
    toonOplossing(oplossingcache[0]);
    console.log(allex);
}

function update(){
    bereken();
    Plotly.animate('plot', {
        data: [{x: allex, y: alley}]
    }, {
        transition: {
            duration: 300
        },
        frame: {
            duration: 300,
            redraw: false
        }
    });

}

function bereken(){
    for(let i = 0;i<matrix2.matrix[0][0];i++){
        if(i<=oplossingcache[index].matrix[0][0] && allex[i]>4){
            allex[i] = (Math.random())+3;
            alley[i] = (Math.random()*6)+3;
        }
        else if(i>oplossingcache[index].matrix[0][0] && allex[i]<4){
            allex[i] = (Math.random())+7;
            alley[i] = (Math.random()*6)+3;
        }
    }
}

function toonOplossing(matrix){
    let oplossing= document.querySelector("#table3");
    matrix.drawMatrix(oplossing,"Oplossing");
}

function Vermenigvuldig(matrix){
    let matrix_opl= new Matrix(2,1,0);
    let opl = matrix1.vermenigvuldigMatrix(matrix);
    //hardgecodeerd voor 2x1 af te ronden
    /*opl[0][0] = Math.round(opl[0][0]*10000)/10000;
    opl[1][0] = Math.round(opl[1][0]*10000)/10000;*/
    matrix_opl.importMatrix(opl);
    return matrix_opl;
}

let arr=window.location.pathname.split("/");
if (arr[arr.length-1] === "markov.html") {
    init();
}
