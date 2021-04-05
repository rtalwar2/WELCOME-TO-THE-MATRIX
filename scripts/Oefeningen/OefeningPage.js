
import Matrix from "../Matrix.js";
import {Oefeningen} from "./Oefeningen.js";
import {VermenigvuldigOefening} from "./VermenigvuldigOefening.js";


export class OefeningPage {
    static alle_oefeningen = ["VermenigvuldigOefening","InverseOefening" , "DeterminantOefening","TransponeerOefening"];
    static alle_beschrijvingen = [{//deze beschrijvingen worden getoond in de modal

        name: "VermenigvuldigOefening", description: "Oefeningen op vermenigvuldigen van matrices, bekijk hiervoor eerst de VermenigvuldigTutorial"},
        {name: "DeterminantOefening", description: "Oefeningen op determinant van matrices, bekijk hiervoor eerst de DeterminantTutorial"},
        {name: "InverseOefening", description: "Oefeningen op inverses van matrices, bekijk hiervoor eerst de InverseTutorial"}];

    static oefeningen = {//alle soorten oefeningen
        "VermenigvuldigOefening": new VermenigvuldigOefening(new Matrix(3,3,true),new Matrix(3,3,true)),
        //"TransponeerOefening":Object,
        "InverseOefeningen": Object,
        "DeterminantOefening": Object
    };
    oefening;
    tabel1 = document.querySelector("#tabel_m1");
    tabel2 = document.querySelector("#tabel_m2");
    tabel3 = document.querySelector("#tabel_m3");
    tabellen = [this.tabel1, this.tabel2,this.tabel3];

    constructor() {
    }

    startOefening(naam){
        if(naam==="VermenigvuldigOefening"){
            this.oefening = OefeningPage.oefeningen[naam];
            for(let i=0; i< this.oefening.aantal_matrices; i++){
                this.oefening.matrices[i].drawMatrix(this.tabellen[i]);
            }
        }
        }

}



let oef= new OefeningPage();


function showDescription() {
    //in de modal de juiste beschijving steken ze worden opgehaald uit JSON alle_beschrijvingen van TutorialPage klasse
    document.querySelector(".modal-body").innerText = OefeningPage.alle_beschrijvingen.find(value => value.name === localStorage.getItem("selected_button")).description;
    //in de modal juiste titel plaatsen
    document.querySelector("#exampleModalLabel").innerText = localStorage.getItem("selected_button");
    //er zit een onzichtbare knop in de html die moet worden aangeklikt om de modal dte doen verschijnen, ik heb het niet zonder knop kunnen doen
    document.querySelector("#init_modal").click();
}
function init() {
    oef.startOefening(localStorage.getItem("selected_button"));//uit localstorage de juiste Oefening ophalen en starten
    //showDescription();//laat modal met juiste beschijving van de tutorial verschijnen
    //document.querySelector("#next_step").addEventListener("click", ListenToKnop);//eventlistener voor next knop
}
init();

