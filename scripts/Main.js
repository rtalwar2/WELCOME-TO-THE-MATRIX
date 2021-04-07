import {OefeningPage} from "./Oefeningen/OefeningPage.js";
import {TutorialPage} from "./Tutorials/TutorialPage.js";
import {Speler} from "./Speler.js";


function ListenToKnop(event) {
    let target = event.target.innerText
    localStorage.setItem("selected_button", target);//opschrift van de knop opslaan in local storage
    if(target.includes("Oefening")){
        window.open("./OefeningPage.html","_self");
    }else{
        window.open("./TutorialPage.html", "_self"); //naar TutorialPage gaan, moet later gewijzigd worden met Oefeningenpage,
        // kan gemakkelijk door bij invoegen van knoppen aan elke knop data-page="./TutorialPage.html" of data-page="./OefeningPage.html" toe te voegen

    }
   }

function haalKnoppen() {//de namen van de knoppen ophalen uit de TutorialPage en OefeningenPage klassen
    let alle_teksten = [];
    for (let i of TutorialPage.alle_beschrijvingen) {
        alle_teksten.push(i.name);
    }
    alle_teksten.push(...OefeningPage.alle_oefeningen); //gaf error omdat die de js van oefeningpage effectief uitvoerde en vond bepaalde elementen van de html niet
    alle_teksten.sort();
    for (let i in alle_teksten.slice(0, alle_teksten.length / 2)) {//per 2 de knoppen invoegen zodat ze mooi naast elkaar komen
        let row = document.createElement("div");//wel een PROBLEEM bij oneven aantal knoppen
        row.classList.add("row");
        let content = document.createElement("div");
        content.classList.add(...["col-md-6", "nav", "justify-content-center"]);
        let button1 = document.createElement("button");
        button1.type = "button";
        button1.classList.add(...["btn", "btn-outline-success"]);
        button1.innerText = alle_teksten[i];
        content.appendChild(button1);
        let content2 = document.createElement("div");
        content2.classList.add(...["col-md-6", "nav", "justify-content-center"]);
        let button2 = document.createElement("button");
        button2.type = "button";
        button2.classList.add(...["btn", "btn-outline-success"]);
        button2.innerText = alle_teksten[parseInt(i) + Math.round(alle_teksten.length / 2)];
        content2.appendChild(button2);
        row.appendChild(content);
        row.appendChild(content2);
        // `<div class="row "> de html die ingevoerd werd
        //     <div class="col-md-6 nav justify-content-center">
        //         <button type="button" class="btn btn-outline-success">vermenigvuldiging</button>
        //     </div>
        //     <div class="col-md-6 nav justify-content-center">
        //         <button type="button" class="btn btn-outline-success">vermenigvuldigingOefeningen</button>
        //     </div>
        // </div>`
        document.querySelector("nav").appendChild(row);
    }
}

function init() {
    spelerMaken();
    haalKnoppen();
    document.querySelectorAll("button").forEach(value => value.addEventListener("click", ListenToKnop))
    //een aale knoppen eventlistener ListenToKnop toegevoegd
}


let dataSpeler;     // Map met gemaakte oefeningen/tutorials

function spelerMaken(){
    let naamSpeler = window.prompt("Naam?");
    let speler = new Speler(naamSpeler);
    dataSpeler = speler.getData();
}

init();
