import Matrix from "./Matrix.js";
import {Tutorial} from "./Tutorial.js";
import {VermenigvuldigTutorial} from "./VermenigvuldigTutorial.js";
export class TutorialPage{
    static alle_beschrijvingen= [{"TransponeerTutorial":["stap1","stap2","stap3","stap4"]},{"InverseTutorial":["stap1","stap2","stap3","stap4"]},{"DeterminantTutorial":["stap1","stap2","stap3","stap4"]}];
    tutorial;
    firstMatrix;
    secondMatrix;
    tabel1=document.querySelector("#tabel_m1");
    tabel2=document.querySelector("#tabel_m2");
    tabel3=document.querySelector("#tabel_m3");

    constructor(){
        // this.alle_beschrijvingen.set();
        // this.alle_beschrijvingen.set("Vermenigvuldigtutorial",["stap1","stap2","stap3","stap4"]);
        // this.alle_beschrijvingen.set("InverseTutorial",["stap1","stap2","stap3","stap4"]);
        // this.alle_beschrijvingen.set("DeterminantTutorial",["stap1","stap2","stap3","stap4"]);
    }

    startTutorial(naam){
        this.firstMatrix=new Matrix();
        this.secondMatrix=new Matrix();
        this.tutorial=new VermenigvuldigTutorial(this.firstMatrix,this.secondMatrix);
        this.firstMatrix.drawMatrix(this.tabel1);
        this.secondMatrix.drawMatrix(this.tabel2);
    }

    updateBeschrijving(tekst){
        document.querySelector("p").innerText=tekst;
    }

    changeStep(){
        document.querySelectorAll(".rood").forEach(value => value.classList.remove("rood"));
        let data=this.tutorial.refresh(1);
        console.log(data);
        this.updateBeschrijving(data.tekst);
        data.data.drawMatrix(this.tabel3);
        this.tabel1.querySelector(`[data-id='id_${data.element1[0]}-${data.element1[1]}']`).classList.add("rood");
        this.tabel2.querySelector(`[data-id='id_${data.element2[0]}-${data.element2[1]}']`).classList.add("rood");
    }
}





let tp=new TutorialPage();

function ListenToKnop(event){
    tp.changeStep();
}

function init(){
    console.log("init");
    tp.startTutorial("afhankelijk van deze string juiste tutorial uittwerken");
    document.querySelectorAll("button").forEach(value => value.addEventListener("click", ListenToKnop));
}

init()
