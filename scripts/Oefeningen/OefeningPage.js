import Matrix from "../Matrix.js";
import {Oefeningen} from "./Oefeningen.js";
import {VermenigvuldigOefening} from "./VermenigvuldigOefening.js";
import {DeterminantOefening} from "./DeterminantOefening.js";
import {Speler} from "../Speler.js";
import {InverseOefening} from "./InverseOefening.js";


export class OefeningPage {
    static alle_oefeningen = ["VermenigvuldigOefening", "InverseOefening", "DeterminantOefening"];  //, "TransponeerOefening"
    static alle_beschrijvingen = [{//deze beschrijvingen worden getoond in de modal

        name: "VermenigvuldigOefening",
        description: "Oefeningen op vermenigvuldigen van matrices, bekijk hiervoor eerst de VermenigvuldigTutorial"
    },
        {
            name: "DeterminantOefening",
            description: "Oefeningen op determinant van matrices, bekijk hiervoor eerst de DeterminantTutorial"
        },
        {
            name: "InverseOefening",
            description: "Oefeningen op inverses van matrices, bekijk hiervoor eerst de InverseTutorial"
        }];

    static oefeningen = {//alle soorten oefeningen
        "VermenigvuldigOefening": [new VermenigvuldigOefening(new Matrix(3, 3), new Matrix(3, 3)), new VermenigvuldigOefening(new Matrix(3,2),new Matrix(3,2))],
        //"TransponeerOefening":Object,
        "InverseOefening": [new InverseOefening(new Matrix(2,2),true),new InverseOefening(new Matrix(2,2),true),new InverseOefening(new Matrix(3,3))],
        "DeterminantOefening": [new DeterminantOefening(new Matrix(2, 2)),new DeterminantOefening(new Matrix(3,3)),new DeterminantOefening(new Matrix(3, 2))]
    };
    oefening;
    oefeningindex;
    naam;
    tabel1 = document.querySelector("#tabel_m1");
    tabel2 = document.querySelector("#tabel_m2");
    tabel3 = document.querySelector("#tabel_m3");
    tabellen = [this.tabel1, this.tabel2, this.tabel3];
    constructor() {
    }

    startOefening(naam) {
        this.oefeningindex = 0;
        this.naam = naam;
        this.oefening = OefeningPage.oefeningen[naam][this.oefeningindex];
        this.oefening.maakInvul();
        for (let i = 0; i < this.oefening.aantal_matrices; i++) {
            this.oefening.matrices[i].drawMatrix(this.tabellen[i]);
        }
    }

    checkOefening(){
        return this.oefening.checkOplossing(oef.oefening);
    }

    nextOefening(){
        this.oefeningindex++;
        if(this.oefeningindex < OefeningPage.oefeningen[this.naam].length) {
            //oefening klaar
            this.oefening = OefeningPage.oefeningen[this.naam][this.oefeningindex];
            this.oefening.maakInvul();
            for (let i = 0; i < this.oefening.aantal_matrices; i++) {
                this.oefening.matrices[i].drawMatrix(this.tabellen[i]);
            }
        }
        else{
            this.eindeOefening();
        }
    }

    eindeOefening(){
        document.querySelector(".modal-body").innerText = "Oefening klaar! Klik op \"Klaar\" om terug te gaan naar de hoofdpagina.";
        document.querySelector("#next").innerText = "Klaar";
        document.querySelector("#next").addEventListener("click",function(){terug();});
    }
}

function showDescription() {
    //in de modal de juiste beschijving steken ze worden opgehaald uit JSON alle_beschrijvingen van TutorialPage klasse
    document.querySelector(".modal-body").innerText = OefeningPage.alle_beschrijvingen.find(value => value.name === localStorage.getItem("selected_button")).description;
    //in de modal juiste titel plaatsen
    document.querySelector("#exampleModalLabel").innerText = localStorage.getItem("selected_button");
    //er zit een onzichtbare knop in de html die moet worden aangeklikt om de modal dte doen verschijnen, ik heb het niet zonder knop kunnen doen
    document.querySelector("#init_modal").click();
}

function init() {
    oef = new OefeningPage();
    document.getElementById("header").innerText= OefeningPage.alle_beschrijvingen.find(value => value.name === localStorage.getItem("selected_button")).name;
    oef.startOefening(localStorage.getItem("selected_button"));//uit localstorage de juiste Oefening ophalen en starten
    //showDescription();//laat modal met juiste beschijving van de tutorial verschijnen
    //document.querySelector("#next_step").addEventListener("click", ListenToKnop);//eventlistener voor next knop
    document.querySelector(".modal-body").innerText = "klaar voor de volgende oefening?";
    document.querySelector("#exampleModalLabel").innerText = "Juist!";
    document.getElementById("check").addEventListener("click", function () {
        let correct = oef.checkOefening();
        if (correct){
            document.querySelector("#init_modal").click();
            oef.nextOefening();
        }
        else{
            //kan met jquery fadeout maar dan kunnen we niet slim versie van jquery gebruiken
            document.querySelector("#fouttekst").style.display = "block";
            setTimeout(function(){
                document.querySelector("#fouttekst").style.display = "none";
            },2000)
        }
    });
    document.getElementById("mainPage").addEventListener("click", terug);//eventlistener voor exit knop
    //initialiseer popover (hintknop)
    $(function () {
        $('[data-toggle="popover"]').popover({
            html: true
        });
    });
}

function terug() {
    window.open("./main.html", "_self");
    let spelernaam = localStorage.getItem("huidige speler");
    let speler = new Speler(spelernaam);
    speler.eindTutorialOefening(localStorage.getItem("selected_button"));
}

let oef;
let arr=window.location.pathname.split("/");
if (arr[arr.length-1] === "OefeningPage.html") {
    init();
}


