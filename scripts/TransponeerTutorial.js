import {Tutorial} from "./Tutorial.js";
import Matrix from "./Matrix.js";

export class TransponeerTutorial extends Tutorial {

    matrices = [];
    rij1 = 0;
    kolom2 = 0;
    midden = 0;
    som = 0;
    rij=0;kolom=0;
    constructor(m1) {
        super(m1);
        this.stapnummer = 0;
        this.data = new Matrix(m1.aantalKolommen, m1.aantalRijen,true);
        this.matrices.push(this.m1);
        this.aantal_matrices = this.matrices.length;
    }

    refresh(tutorialPage) {//de logica van de Transponeertutorial
        //{finished:boolean,data:een matrix, tekst:"de best passende beschrijving bij de huidige bewerking"}
        document.querySelectorAll(".rood").forEach(value => value.classList.remove("rood"));//maakt de juite elementen rood
        if(this.stapnummer===0){
            this.stapnummer++;
        }
        else{
            this.kolom++;
            if(this.kolom===this.m1.aantalKolommen){
                this.kolom=0;
                this.rij++;
            }
            if(this.rij===this.m1.aantalRijen){
                this.finished=true;
            }
            else{
                tutorialPage.tabel1.querySelector(`[data-id='id_${this.rij}-${this.kolom}']`).classList.add("rood");
                tutorialPage.tabel3.querySelector(`[data-id='id_${this.kolom}-${this.rij}']`).classList.add("rood");
                console.log( tutorialPage.tabel3.querySelector(`[data-id='id_${this.kolom}-${this.rij}']`))
                console.log(`id_${this.kolom}-${this.rij}`);
            }
        }

        this.data.matrix[this.kolom][this.rij]=this.m1.matrix[this.rij][this.kolom];
        return {finished:this.finished,data:this.data, tekst:"de best passende beschrijving bij de huidige bewerking"}

    }

}
