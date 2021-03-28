import Matrix from "./Matrix.js";
import {Tutorial} from "./Tutorial.js";
import {VermenigvuldigTutorial} from "./VermenigvuldigTutorial.js";
export class TutorialPage{
    static alle_beschrijvingen= [{name:"TransponeerTutorial",description:"eerst algemene uitleg over transponeren van matrices"},
        {name:"InverseTutorial",description:"eerst algemene uitleg over inverteren van matrices"},
        {name:"VermenigvuldigTutorial",description:"eerst algemene uitleg over vermenigvuldigen van matrices\n\n" +
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
                "                                voluptas nulla pariatur?\""},
        {name:"DeterminantTutorial",description:"eerst algemene uitleg over determinanten van matrices"}];
    static tutorials={"VermenigvuldigTutorial":new VermenigvuldigTutorial(new Matrix(),new Matrix()),"TransponeerTutorial":Object,
        "InverseTutorial":Object,
        "DeterminantTutorial":Object}
    tutorial;
    tabel1=document.querySelector("#tabel_m1");
    tabel2=document.querySelector("#tabel_m2");
    tabel3=document.querySelector("#tabel_m3");
    tabellen=[this.tabel1,this.tabel2,this.tabel3];
    constructor(){

        // this.alle_beschrijvingen.set();
        // this.alle_beschrijvingen.set("Vermenigvuldigtutorial",["stap1","stap2","stap3","stap4"]);
        // this.alle_beschrijvingen.set("InverseTutorial",["stap1","stap2","stap3","stap4"]);
        // this.alle_beschrijvingen.set("DeterminantTutorial",["stap1","stap2","stap3","stap4"]);
    }

    startTutorial(naam){
        this.tutorial=TutorialPage.tutorials[naam];
        for(let i=0;i<this.tutorial.aantal_matrices;i++){//zodat er bij de juiste aantal matrices de juiste tabellen gecreerd worden
            this.tutorial.matrices[i].drawMatrix(this.tabellen[i]);
        }

    }

    updateBeschrijving(tekst){
        document.querySelector("p").innerText=tekst;
    }
    endTutorial(){
        document.querySelector(".modal-body").innerText="Ben je klaar voor de oefening?";
        document.querySelector("#exampleModalLabel").innerText=localStorage.getItem("selected_button")+" afgewerkt!";
        document.querySelector("#init_modal").click();
    }

    // firstStep(){
    //     console.log(this.tutorial)
    //     this.updateBeschrijving(this.tutorial);
    //     document.querySelector("#next_step").removeEventListener("click",ListenToKnop);
    //     document.querySelector("#next_step").addEventListener("click", this.changeStep);
    //
    // }

    changeStep(){
        document.querySelectorAll(".rood").forEach(value => value.classList.remove("rood"));
        let data=this.tutorial.refresh();
        data.data.drawMatrix(this.tabel3);
        if(data.finished){
            setTimeout(this.endTutorial,2000);
            document.querySelector("#next_step").disabled=true;
        }
        else{
            this.tabel1.querySelector(`[data-id='id_${data.element1[0]}-${data.element1[1]}']`).classList.add("rood");
            this.tabel2.querySelector(`[data-id='id_${data.element2[0]}-${data.element2[1]}']`).classList.add("rood");
            this.updateBeschrijving(data.tekst);
        }
    }
}

let tp=new TutorialPage();

function ListenToKnop(event){
    tp.changeStep();
}

function firstStep(){
    document.querySelector(".modal-body").innerText=TutorialPage.alle_beschrijvingen.find(value => value.name===localStorage.getItem("selected_button")).description;
    document.querySelector("#exampleModalLabel").innerText=localStorage.getItem("selected_button");
    document.querySelector("#init_modal").click();
}

function init(){
    console.log("init");
    tp.startTutorial(localStorage.getItem("selected_button"));
    firstStep();
    document.querySelector("#next_step").addEventListener("click", ListenToKnop);
}

if(window.location.pathname.split("/")[2]==="TutorialPage.html"){
    init();
}
