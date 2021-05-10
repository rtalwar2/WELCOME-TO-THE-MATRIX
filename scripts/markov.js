import Matrix from "./Matrix.js";
import {Speler} from "./Speler.js";

let matrix1 = new Matrix(2,2,0);//overgangsmatrix
let matrix2 = new Matrix(2,1,0);//toestandsmatrix
let oplossingcache = [];
let index = 0;
let allex = [];
let alley = [];
let AANTAL = 100;
let STAPAANTAL = 30;



function init_matrices(){
    //Matrixen aanmaken

    matrix2.matrix[0][0] = AANTAL;
    let arr=document.querySelector("#table1").querySelectorAll(`[data-id]`);
    //console.log(arr)
    // arr.forEach(value => console.log(value.value))
    console.log("matrix eerst");
    console.log(matrix1.matrix);
    let k=0;
    let r=0;
    for(let i=0;i<arr.length;i++){
        matrix1.matrix[r][k]=arr[i].value;
        k++;
        if(k===2){
            r++;k=0;
        }
    }
    console.log("matrix na");
    console.log(matrix1.matrix);
    //matrix1.importMatrix([[0.8,0.1],[0.2,0.9]]);//hardgecodeerd

    //let overgangsmatrix = document.querySelector("#table1");
    let toestandsmatrix = document.querySelector("#table2");

    //matrix1.drawMatrix(overgangsmatrix,"Overgangsmatrix");
    matrix2.drawMatrix(toestandsmatrix,"Toestandsmatrix (jaar 0)");
}


function init(){
    document.querySelectorAll(".inp").forEach(value => value.addEventListener("change",reinitialize));
    document.getElementById("mainPage").addEventListener("click", terug);//eventlistener voor exit knop
    init_matrices();
    oplossingcache[0] = matrix2;
    //genereer alle oplossingen
    for(let i = 0;i<AANTAL;i++){
        oplossingcache[i+1] = Vermenigvuldig(oplossingcache[i]);
        allex[i] = (Math.random())+3;
        alley[i] = (Math.random()*6)+3;
    }
    //plotly grafiek aanmaken
    let sliderSteps = [];
    for(let i = 0; i<STAPAANTAL;i++){
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
    Plotly.purge('plot');
    Plotly.newPlot('plot', [{
        x:allex,
        y:alley,
        mode:'markers',
        hoverinfo:'skip',
    }], {
        title:{
            text:'Mensen                                                            Zombies',
            font:{color:'#E0E0E0'}
        },
        xaxis:{
            range:[1,10],
            visible:false
        },
        yaxis:{
            range:[2,9.5],
            visible:false
        },
        color:'black',
        plot_bgcolor:'black',
        paper_bgcolor:'black',
        sliders: [{
            pad: {l: 130, t: 55},
            font:{
                color:'#E0E0E0',
            },
            currentvalue: {
                visible: true,
                prefix: 'Jaar: ',
                xanchor: 'right',
                font: {size: 20, color: '#E0E0E0'}
            },
            steps: sliderSteps
        }]
    });
    document.querySelector('#plot').on('plotly_sliderchange',function(e){
        index = parseInt(e.step.label);
        toonOplossing(oplossingcache[index],oplossingcache[index+1],index);
        requestAnimationFrame(update);
    });
    toonOplossing(oplossingcache[0],oplossingcache[1],0);

}

function reinitialize(event){
    let input=event.target;
    let output=document.querySelectorAll(`[data-id='${input.dataset.id}']`)[1];
    console.log(output);
    output.value=Math.round( 10-parseFloat(input.value)*10)/10;
    console.log("opnieuw");
    init_matrices();
    oplossingcache[0] = matrix2;
    //genereer alle oplossingen
    for(let i = 0;i<STAPAANTAL;i++){
        oplossingcache[i+1] = Vermenigvuldig(oplossingcache[i]);
        allex[i] = (Math.random())+3;
        alley[i] = (Math.random()*6)+3;
    }
}

function update(){
    bereken();
    Plotly.animate('plot', {
        data: [{x: allex, y: alley}]
    }, {
        transition: {
            duration: 200
        },
        frame: {
            duration: 200,
            redraw: false
        }
    });
    //promise error komt van te snel te veranderen van index
}

function bereken(){
    for(let i = 0;i<matrix2.matrix[0][0];i++){
        if(i<=oplossingcache[index].matrix[0][0] && allex[i]>5){
            allex[i] = (Math.random())+3;
            alley[i] = (Math.random()*6)+3;
        }
        else if(i>oplossingcache[index].matrix[0][0] && allex[i]<5){
            allex[i] = (Math.random())+7;
            alley[i] = (Math.random()*6)+3;
        }
    }
}

function toonOplossing(matrix1,matrix2,beginjaar){
    let toestandsmatrix = document.querySelector("#table2");
    matrix1.drawMatrix(toestandsmatrix,`Toestandsmatrix (jaar ${beginjaar})`);
    let oplossing= document.querySelector("#table3");
    matrix2.drawMatrix(oplossing,`Oplossing (jaar ${beginjaar+1})`);
}

function Vermenigvuldig(matrix){
    let matrix_opl= new Matrix(2,1,0);
    let opl = matrix1.vermenigvuldigMatrix(matrix);
    //hardgecodeerd voor 2x1 af te ronden
    opl[0][0] = Math.round(opl[0][0]*100)/100;
    opl[1][0] = Math.round(opl[1][0]*100)/100;
    matrix_opl.importMatrix(opl);
    return matrix_opl;
}

function terug() {
    let spelernaam = localStorage.getItem("huidige speler");
    let speler = new Speler(spelernaam);
    speler.eindTutorialOefening(localStorage.getItem("selected_button"));
    window.open("./main.html", "_self");
}

let arr=window.location.pathname.split("/");
if (arr[arr.length-1] === "markov.html") {
    init();
}
