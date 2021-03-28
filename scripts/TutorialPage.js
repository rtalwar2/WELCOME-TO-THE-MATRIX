import Matrix from "./Matrix.js";
import {Tutorial} from "./Tutorial.js";
import {VermenigvuldigTutorial} from "./VermenigvuldigTutorial.js";
export class TutorialPage{
    static alle_beschrijvingen= [{"TransponeerTutorial":["stap1","stap2","stap3","stap4"]},{"InverseTutorial":["stap1","stap2","stap3","stap4"]},{"DeterminantTutorial":["stap1","stap2","stap3","stap4"]}];
    tutorial;

    constructor(){
        // this.alle_beschrijvingen.set();
        // this.alle_beschrijvingen.set("Vermenigvuldigtutorial",["stap1","stap2","stap3","stap4"]);
        // this.alle_beschrijvingen.set("InverseTutorial",["stap1","stap2","stap3","stap4"]);
        // this.alle_beschrijvingen.set("DeterminantTutorial",["stap1","stap2","stap3","stap4"]);
    }

    startTutorial(naam){
        this.tutorial=new VermenigvuldigTutorial(new Matrix(),new Matrix());
    }

    updateBeschrijving(tekst){
        document.querySelector("p").innerText=tekst;
    }

    changeStep(){
        let data=this.tutorial.refresh(1);
        console.log(data);
        this.updateBeschrijving(data.tekst)
    }

}





let tp=new TutorialPage();

function ListenToKnop(event){
    tp.changeStep()
}
function init(){
    console.log("init");
    tp.startTutorial("afhankelijk van deze string juiste tutorial uittwerken");
    document.querySelectorAll("button").forEach(value => value.addEventListener("click", ListenToKnop));
}

init()
