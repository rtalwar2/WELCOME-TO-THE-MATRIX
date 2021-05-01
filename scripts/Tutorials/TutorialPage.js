import Matrix from "../Matrix.js";
import {Tutorial} from "./Tutorial.js";
import {VermenigvuldigTutorial} from "./VermenigvuldigTutorial.js";
import {TransponeerTutorial} from "./TransponeerTutorial.js";
import {InverseTutorial} from "./InverseTutorial.js";

import {Speler} from "../Speler.js";
import {DeterminantTutorial} from "./DeterminantTutorial.js";
import {VermenigvuldigOefening} from "../Oefeningen/VermenigvuldigOefening.js";
import {InverseOefening} from "../Oefeningen/InverseOefening.js";
import {DeterminantOefening} from "../Oefeningen/DeterminantOefening.js";

export class TutorialPage {
    static alle_beschrijvingen = [
        {//descriptions worden getoond in de modal
         //uitlegb in "stap 0"
            name: "TransponeerTutorial",
            description: "Dit is een korte Tutorial die uitlegt hoe je een matrix moet transponeren. <br> De getransponeerde matrix A^t van een matrix A kun je heel eenvoudig berekenen door de rijen van A te schrijven als de kolommen van A^t. Dit wordt wel duidelijk met de tutorial.",
            uitlegb: "Klik op 'next' om de matrix stap voor stap te transponeren."
        },
        {
            name: "InverseTutorial",
            description: "In de lineaire algebra worden er veelvuldig matrices geinverteerd.<br><br> Een n x n-matrix <bold>A</bold> is inverteerbaar, indien er een n x n-matrix <bold>B</bold> bestaat zodanig dat\n" +
                "\n" +
                "A*B=B*A=I " +
                "<br>Hierin is I de eenheidsmatrix van orde n.<br><br> Niet iedere matrix heeft een inverse. Een matrix heeft alleen een inverse als de determinant van de matrix verschillend is van 0. Als de inverse bestaat dan noemt men de matrix inverteerbaar." +
                "<br><br>Het daadwerkelijk berekenen van de inverse van een matrix kan op verschillende methoden. In deze tutorial wordt de algemene definitie gebruikt om de inverse te berekenen.<br/><br/> A^-1=1/det(A) * adj(A).<br/><br/>" +
                "Hierin is det(A) de determinant van A en adj(a) de adjunct van A.  <br/><br/> De adjunct van een vierkante matrix kun je verkrijgen door elk element in de matrix te vervangen door zijn corresponderende cofactor en vervolgens de bekomen matrix te transponeren." +
                "<br/> <br/> In formule: adj(A)[j,i] = (−1)^(i+j) M[i,j] = C[i,j] met M[i,j] de minor van het element a[i,j]<br><br>",
            uitlegb: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusanti umdoloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam"
        },
        {
            name: "VermenigvuldigTutorial",
            description: "In de lineaire algebra is matrixvermenigvuldiging een bewerking tussen twee matrices die als resultaat een nieuwe matrix, aangeduid als het (matrix)product van die twee, oplevert.<br><br>" +
                "Matrixvermenigvuldiging van een matrix <span class='kleur'>A</span> met een matrix <span class='kleur2'>B</span> met product <span class='kleur3'>AB</span> is alleen mogelijk als het aantal kolommen van de eerste matrix gelijk is aan het aantal rijen van de tweede matrix. <br><br>" +
                "Stel daarom dat <span class='kleur'>A</span> een  m x n -matrix is en <span class='kleur2'>B</span> een n x p -matrix. Het matrixproduct <span class='kleur3'>AB</span> is dan een m x p -matrix.<br><br>" +
                "Elk element <span class='kleur3'>(AB)ij</span> is de som van de een aan een vermenigvuldiging van de <span class='kleur'>rij i van A</span> en <span class='kleur2'>kolom j van B</span>.<br><br>" +
                "Bijvoorbeeld voor matrix <span class='kleur'>A</span> <table><tr><td>1</td><td>2</td></tr><tr><td>3</td><td>4</td></tr></table>" +
                "en matrix <span class='kleur2'>B</span> <table><tr><td>4</td><td>3</td></tr><tr><td>2</td><td>1</td></tr></table>" +
                "is het element <span class='kleur3'>(AB)11</span> = <span class='kleur'>1</span>*<span class='kleur2'>4</span> + <span class='kleur'>2</span>*<span class='kleur2'>2</span> = <span class='kleur3'>8</span>",
            uitlegb: "Als we de bewerking matrix1 * matrix2 stap voor stap uitvoeren dan bouwen we de oplossing in de productmatrix.\n\nKlik op 'next' om naar de volgende stap te gaan."
        },
        {
            name: "DeterminantTutorial",
            description: "De determinant van een vierkante matrix is een speciaal getal dat kan worden berekend uit de elementen van die matrix. De determinant van een matrix 1 wordt aangeduid door det(A), det A of door |A|.<br/><br/>" +
                "De eerste stap bij het berekenen van een matrix is om de <span class='kleur'>minor</span> te vinden van een element. De <span class='kleur'>minor</span> van een element is de determinant van de matrix die overblijft als alle elementen in dezelfde rij en kolom als dat element geschrapt worden." +
                " Zoals je ziet moet je een determinant berekenen om de determinant te kunnen berekenen, klinkt vreemd toch? Maar het komt wel inorde ;) want indien je matrix " +
                "een 1 x 1 matrix is, is de determinant het element zelf.<br><br> Uiteindelijk moet je de <span class='kleur'>minor</span> vermenigvuldigen met het juiste teken.  " +
                "Dan bekom je de <span class='kleur'>cofactor</span> van het element. " +
                "Het juiste teken vind je door de formule (-1)^(rij+kolom). " +
                "Stel ik bereken de cofactor van element op rij 1 en kolom 1 dan is het teken bij dat ik bij de minor moet plaatsen (-1)² = 1 dus posifief." +
                "<br><br>Voor een 3x3 matrix zijn dit de tekens:<br>" +
                "<table><tr><td>+1</td><td>-1</td><td>+1</td></tr><tr><td>-1</td><td>+1</td><td>-1</td></tr><tr><td>+1</td><td>-1</td><td>+1</td></tr></table><br>"+
                " <br>"+
                "De determinant te berekenen doe je door te ontwikkelen naar een rij of kolom. In deze tutorial wordt er altijd ontwikkeld naar de eerste rij maar " +
                "dat mag je gerust zelf kiezen. " +
                "De bewerking die je moet uivoeren is alle  elementen in de rij waarin je ontwikkeld vermenigvuldigen met hun corresponderende cofactor en optellen. <br>" +
                "Om de determinant te berekenen van een 2x2 matrix te berekenen moet je hetzelfde stappenplan volgen maar uiteindelijk zal je zelf tot de ondestaande formule komen." +
                " Je vermenigvuldigd de elementen volgens de diagonalen en trekt ze val elkaar af:<br/><br>" +
                "det(A) = <table><tr><td><span class='kleur'>a <span></td><td><span class='kleur2'>b <span> </td></tr><tr><td><span class='kleur4'>c</span></td><td><span class='kleur3'>d</span>" +
                "</td></tr></table> = " +
                "<span class='kleur'>a</span> * <span class='kleur3'>cofactor(a)</span> + <span class='kleur2'>b</span> * <span class='kleur4'>cofactor(b)</span><br>"+
                "= <span class='kleur'>a</span> * <span class='kleur3'>d</span> - <span class='kleur2'>b</span> * <span class='kleur4'>c</span><br>",
            uitlegb: "Hier geven we een voorbeeld van hoe men een determinant berekent, stap voor stap. We berekenen de determinant van matrix1 en gebruiken de kleinere 2x2 matrix als minor.\n\nKlik op 'next' om naar de volgende stap te gaan."
            }];
    static tutorials = {//alle tutorials
        "VermenigvuldigTutorial": [new VermenigvuldigTutorial(new Matrix(3, 3), new Matrix(3, 3)), new VermenigvuldigTutorial(new Matrix(2, 2), new Matrix(2, 4))],
        "TransponeerTutorial": [new TransponeerTutorial(new Matrix(2, 3))],
        "InverseTutorial": [new InverseTutorial(new Matrix(3, 3))],
        "DeterminantTutorial": [new DeterminantTutorial(new Matrix(3, 3)), new DeterminantTutorial(new Matrix(2, 2))]
    };

    tutorial;//variabele voor huidige tutorial
    tabel1 = document.querySelector("#tabel_m1");
    tabel2 = document.querySelector("#tabel_m2");
    tabel3 = document.querySelector("#tabel_m3");
    tabellen = [this.tabel1, this.tabel2, this.tabel3];
    tutorialnumber = 0;

    constructor() {
    }

    startTutorial(naam, index) {
        document.querySelector("#next_step").disabled = false;
        this.tutorial = TutorialPage.tutorials[naam][index];//de juiste tutorial toegekend.
        this.tutorial.drawMatrices(this);
        this.tabel1 = document.querySelector("#tabel_m1");
        this.tabel2 = document.querySelector("#tabel_m2");
        this.tabel3 = document.querySelector("#tabel_m3");
        this.tabellen = [this.tabel1, this.tabel2, this.tabel3];
        for (let i = 0; i < this.tutorial.aantal_matrices; i++) {//zodat er bij de juiste aantal matrices de juiste tabellen gecreerd worden
            this.tutorial.matrices[i].drawMatrix(this.tabellen[i], `matrix${i + 1}`);
        }
        this.tutorial.data.drawMatrix(this.tabel3, "--");
    }

    updateBeschrijving(tekst) {
        document.querySelector("p").innerHTML = tekst;
    }

    // startOefening() {
    //     console.log("joepie");
    //     if (localStorage.getItem("selected_button").toString().contains("main")){
    //         window.open("./main.html", "_self");
    //     }
    //     else {
    //         window.open("./OefeningPage.html", "_self");
    //     }
    // }

    endTutorial() {//past de modal aan en laat hem verschijnen
        document.querySelector(".modal-body").innerText = "Ben je klaar voor de oefening?";
        document.querySelector("#exampleModalLabel").innerText = localStorage.getItem("selected_button") + " afgewerkt!";
        document.querySelector("#init_modal").click();

        let spelernaam = localStorage.getItem("huidige speler");
        let speler = new Speler(spelernaam);
        speler.eindTutorialOefening(localStorage.getItem("selected_button"));
        let oef = "main";
        switch (localStorage.getItem("selected_button")) {
            case "VermenigvuldigTutorial":
                oef = "VermenigvuldigOefening";
                break;
            case "InverseTutorial":
                oef = "InverseOefening";
                break;
            case "DeterminantTutorial":
                oef = "DeterminantOefening";
                break;
        }
        $("#js_modalbutton").unbind();
        $( "#js_modalbutton" ).click(function () {
            localStorage.setItem("selected_button", oef);
            console.log("joepie");
            if (oef.includes("main")){
                window.open("./main.html", "_self");
            }
            else {
                window.open("./OefeningPage.html", "_self");
            }
        });
        // let knop = document.querySelector("#js_modalbutton");
        // console.log(knop);
        // knop.addEventListener("hover",this.startOefening);
        // knop.addEventListener("click",this.startOefening);
        // console.log(knop);
        //console.log(tp);
        // if(confirm("Ben je klaar voor de oefening?")){
        //     console.log(tp);
        //     this.startOefening();//HELP ME please!!!
        // }
    }

    nextTutorial() {
        document.querySelector(".modal-body").innerText = "klaar voor het volgende deel?";
        document.querySelector("#exampleModalLabel").innerText = localStorage.getItem("selected_button") +
            ` ${this.tutorialnumber}/${TutorialPage.tutorials[localStorage.getItem("selected_button")].length} afgewerkt!`;
        document.querySelector("#init_modal").click();
    }

    changeStep() {//*************het strategy pattern toegepast
        let data = this.tutorial.refresh(this);//de refresh methode krijgt een verwijzing naar de klasse mee zodat die de juiste tabel kan roodkleuren
        //data van vorm {finished:boolean,data:een matrix, tekst:"de best passende beschrijving bij de huidige bewerking"}
        //proberen om dit voor elke tutorial zo te krijgen
        data.data.mat.drawMatrix(this.tabel3, data.data.hoofding);
        if (data.finished) {
            document.querySelector("#next_step").disabled = true;
            this.tutorialnumber++;
            if (this.tutorialnumber !== TutorialPage.tutorials[localStorage.getItem("selected_button")].length) {
                setTimeout(() => {
                        this.nextTutorial();
                        this.startTutorial(localStorage.getItem("selected_button"), this.tutorialnumber);
                    }
                    , 2000);
            } else {
                setTimeout(() => {
                        this.endTutorial();
                    }
                    , 2000);
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
    document.querySelector(".modal-body").innerHTML = TutorialPage.alle_beschrijvingen.find(value => value.name === localStorage.getItem("selected_button")).description;
    //in de modal juiste titel plaatsen
    document.querySelector("#exampleModalLabel").innerText = localStorage.getItem("selected_button");
    //er zit een onzichtbare knop in de html die moet worden aangeklikt om de modal dte doen verschijnen, ik heb het niet zonder knop kunnen doen
    document.querySelector("#init_modal").click();
}

function init() {
    document.getElementById("header").innerText=TutorialPage.alle_beschrijvingen.find(value => value.name === localStorage.getItem("selected_button")).name;
    document.getElementById("uitleg").innerText=TutorialPage.alle_beschrijvingen.find(value => value.name === localStorage.getItem("selected_button")).uitlegb;
    tp.startTutorial(localStorage.getItem("selected_button"), 0);//uit localstorage de juiste tutorial ophalen en starten
    showDescription();//laat modal met juiste beschijving van de tutorial verschijnen
    document.querySelector("#next_step").addEventListener("click", ListenToKnop);//eventlistener voor next knop
    document.getElementById("mainPage").addEventListener("click", terug);//eventlistener voor exit knop
}

function terug() {
    let spelernaam = localStorage.getItem("huidige speler");
    let speler = new Speler(spelernaam);
    speler.eindTutorialOefening(localStorage.getItem("selected_button"));
    window.open("./main.html", "_self");
}


//de eerste methode die wordt uitgevoerd, extra controleren of we niet om de mainPage zitten omdat de klasse TutorialPage daar
// wordt geimporteerd werd deze code automatisch uitgevoerd.
let arr=window.location.pathname.split("/");
if (arr[arr.length-1] === "TutorialPage.html") {
    init();
}
