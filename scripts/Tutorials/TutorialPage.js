import Matrix from "../Matrix.js";
import {Tutorial} from "./Tutorial.js";
import {VermenigvuldigTutorial} from "./VermenigvuldigTutorial.js";
import {TransponeerTutorial} from "./TransponeerTutorial.js";
import {InverseTutorial} from "./InverseTutorial.js";

import {Speler} from "../Speler.js";
import {DeterminantTutorial} from "./DeterminantTutorial.js";

export class TutorialPage {
    static alle_beschrijvingen = [
        {//deze beschrijvingen worden getoond in de modal
            name: "TransponeerTutorial",
            description: "eerst algemene uitleg over transponeren van matrices"
        },
        {
            name: "InverseTutorial",
            description: "eerst algemene uitleg over inverteren van matrices"
        },
        {
            name: "VermenigvuldigTutorial",
            description: "eerst algemene uitleg over vermenigvuldigen van matrices\n\n" +
                "\"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium\n" +
                "                                doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore\n" +
                "                                veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam\n" +
                "                                voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia\n" +
                "                                consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque\n" +
                "                                porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci\n" +
                "                                velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore\n" +
                "                                magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum\n" +
                "                                exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi\n" +
                "                                consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit\n" +
                "                                esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo\n" +
                "                                voluptas nulla pariatur?\""
        },
        {
            name: "DeterminantTutorial",
            description: "eerst algemene uitleg over determinanten van matrices"
        }];


    static tutorials = {//alle tutorials
        "VermenigvuldigTutorial": [new VermenigvuldigTutorial(new Matrix(3,3,true), new Matrix(3,3,true)),new VermenigvuldigTutorial(new Matrix(2,2), new Matrix(2,4))],
        "TransponeerTutorial":[ new TransponeerTutorial(new Matrix(2, 3))],
        "InverseTutorial": [new InverseTutorial(new Matrix(3, 3, true))],
        "DeterminantTutorial": [new DeterminantTutorial(new Matrix(3, 3)),new DeterminantTutorial(new Matrix(2, 2))]
    }

    tutorial;//variabele voor huidige tutorial
    tabel1 = document.querySelector("#tabel_m1");
    tabel2 = document.querySelector("#tabel_m2");
    tabel3 = document.querySelector("#tabel_m3");
    tabellen = [this.tabel1, this.tabel2, this.tabel3];

    tutorialnumber=0;

    constructor() {
    }

    startTutorial(naam,index) {
        document.querySelector("#next_step").disabled = false;
        this.tutorial = TutorialPage.tutorials[naam][index];//de juiste tutorial toegekend.
        for (let i = 0; i < this.tutorial.aantal_matrices; i++) {//zodat er bij de juiste aantal matrices de juiste tabellen gecreerd worden
            this.tutorial.matrices[i].drawMatrix(this.tabellen[i]);
        }
    }

    updateBeschrijving(tekst) {
        document.querySelector("p").innerText = tekst;
    }

    endTutorial() {//past de modal aan en laat hem verschijnen
        document.querySelector(".modal-body").innerText = "Ben je klaar voor de oefening?";
        document.querySelector("#exampleModalLabel").innerText = localStorage.getItem("selected_button") + " afgewerkt!";
        document.querySelector("#init_modal").click();
        let spelernaam = localStorage.getItem("huidige speler");
        let speler = new Speler(spelernaam);
        speler.eindTutorialOefening(localStorage.getItem("selected_button"));
    }
    nextTutorial(){
        document.querySelector(".modal-body").innerText = "klaar voor het volgende deel?";
        document.querySelector("#exampleModalLabel").innerText = localStorage.getItem("selected_button") +
            ` ${this.tutorialnumber}/${TutorialPage.tutorials[localStorage.getItem("selected_button")].length} afgewerkt!`;
        document.querySelector("#init_modal").click();
    }

    changeStep() {//*************het strategy pattern toegepast
        let data = this.tutorial.refresh(this);//de refresh methode krijgt een verwijzing naar de klasse mee zodat die de juiste tabel kan roodkleuren
        //data van vorm {finished:boolean,data:een matrix, tekst:"de best passende beschrijving bij de huidige bewerking"}
        //proberen om dit voor elke tutorial zo te krijgen
        data.data.drawMatrix(this.tabel3);
        if (data.finished) {
            document.querySelector("#next_step").disabled = true;
            this.tutorialnumber++;
            console.log(this.tutorialnumber)
            if(this.tutorialnumber!==TutorialPage.tutorials[localStorage.getItem("selected_button")].length){
                setTimeout(()=>{this.nextTutorial();
                this.startTutorial(localStorage.getItem("selected_button"),this.tutorialnumber);}
            , 2000);
            }
            else{
                setTimeout(this.endTutorial, 2000);
            }

        } else {
            this.updateBeschrijving(data.tekst);
        }
    }
}

let tp = new TutorialPage();

function ListenToKnop(event) {
    tp.changeStep();
}

function showDescription() {
    //in de modal de juiste beschijving steken ze worden opgehaald uit JSON alle_beschrijvingen van TutorialPage klasse
    document.querySelector(".modal-body").innerText = TutorialPage.alle_beschrijvingen.find(value => value.name === localStorage.getItem("selected_button")).description;
    //in de modal juiste titel plaatsen
    document.querySelector("#exampleModalLabel").innerText = localStorage.getItem("selected_button");
    //er zit een onzichtbare knop in de html die moet worden aangeklikt om de modal dte doen verschijnen, ik heb het niet zonder knop kunnen doen
    document.querySelector("#init_modal").click();
}

function init() {
    tp.startTutorial(localStorage.getItem("selected_button"),0);//uit localstorage de juiste tutorial ophalen en starten
    showDescription();//laat modal met juiste beschijving van de tutorial verschijnen
    document.querySelector("#next_step").addEventListener("click", ListenToKnop);//eventlistener voor next knop
}


//de eerste methode die wordt uitgevoerd, extra controleren of we niet om de mainPage zitten omdat de klasse TutorialPage daar
// wordt geimporteerd werd deze code automatisch uitgevoerd.
if (window.location.pathname.split("/")[2] === "TutorialPage.html") {
    init();
}
