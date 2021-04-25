import {Tutorial} from "./Tutorial.js";
import Matrix from "../Matrix.js";

export class TransponeerTutorial extends Tutorial {



    constructor(m1) {
        super(m1);
        this.stapnummer = 0;
        this.data = new Matrix(m1.aantalKolommen, m1.aantalRijen,"x");
        this.matrices.push(this.matrix1);
        this.aantal_matrices = this.matrices.length;
    }

    refresh(tutorialPage) {//de logica van de Transponeertutorial
        //{finished:boolean,data:een matrix, tekst:"de best passende beschrijving bij de huidige bewerking"}
        document.querySelectorAll(".rood").forEach(value => value.classList.remove("rood"));//verwijjdert alle vorige rode elementen
        this.kolom1++;
        if (this.kolom1 === this.matrix1.aantalKolommen) {
            this.kolom1 = 0;
            this.rij1++;
        }
        if (this.rij1 === this.matrix1.aantalRijen) {
            this.finished = true;
        } else {
            tutorialPage.tabel1.querySelector(`[data-id='id_${this.rij1}-${this.kolom1}']`).classList.add("rood");//maakt de juite elementen rood
            setTimeout(() => tutorialPage.tabel3.querySelector(`[data-id='id_${this.kolom1}-${this.rij1}']`).classList.add("rood"), 1);
            //     //die timeout is er zodat de klasse rood pas wordt toegevoegd nadat de matrix in de html is geladen
            this.data.matrix[this.kolom1][this.rij1] = this.matrix1.matrix[this.rij1][this.kolom1];
        }
        return {finished: this.finished, data: {mat:this.data,hoofding:"getransponeerde"}, tekst: `rij ${this.rij1+1} wordt kolom ${this.rij1+1}`}
    }

}
