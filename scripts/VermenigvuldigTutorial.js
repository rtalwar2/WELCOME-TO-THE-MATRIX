import {Tutorial} from "./Tutorial.js";
import Matrix from "./Matrix.js";

export class VermenigvuldigTutorial extends Tutorial {

    matrices = [];
    rij1 = 0;
    kolom2 = 0;
    midden = 0;
    som = 0;
    m2;//de tweede matrix waarmee vermenigvuldigd wordt
    constructor(m1, m2) {
        super(m1);
        this.stapnummer = 0;
        this.m2 = m2;
        this.data = new Matrix(m1.aantalRijen, m2.aantalKolommen, true);
        this.matrices.push(this.m1);
        this.matrices.push(this.m2);
        this.aantal_matrices = this.matrices.length;
    }

    refresh(tutorialPage) {//de logica van de vermenigvuldigtutorial
        document.querySelectorAll(".rood").forEach(value => value.classList.remove("rood"));//maakt de juite elementen rood
        if (this.stapnummer === 0) {//als het de eerste stap is, incrementeer nog niets, ik heb geprobeerd om deze if eruit te halen maar dat is niet gelukt
            this.stapnummer++;
            //return {element1:[this.rij1,this.midden],element2:[this.midden,this.kolom2],data:this.data, tekst:`${this.m1.matrix[this.rij1][this.midden]} + ${this.m2.matrix[this.rij1][this.midden]} = ?`}
            tutorialPage.tabel1.querySelector(`[data-id='id_${this.rij1}-${this.midden}']`).classList.add("rood");
            tutorialPage.tabel2.querySelector(`[data-id='id_${this.midden}-${this.kolom2}']`).classList.add("rood");
        }
        else{
            this.midden++;
            if (this.midden === this.m1.aantalKolommen) {
                this.midden = 0;
                this.data.matrix[this.rij1][this.kolom2] = this.som;
                this.rij1++;
                this.som = 0;
            }

            if (this.rij1 === this.m1.aantalRijen) {
                this.rij1 = 0;
                this.kolom2++;
            }

            if (this.kolom2 === this.m2.aantalKolommen) {
                this.finished = true;
            } else {//als de tutorial niet gedaan is, kleur de juiste elementen
                tutorialPage.tabel1.querySelector(`[data-id='id_${this.rij1}-${this.midden}']`).classList.add("rood");
                tutorialPage.tabel2.querySelector(`[data-id='id_${this.midden}-${this.kolom2}']`).classList.add("rood");
            }
        }

        this.som += this.m1.matrix[this.rij1][this.midden] * this.m2.matrix[this.midden][this.kolom2];
        //return {element1:[this.rij1,this.midden],element2:[this.midden,this.kolom2],finished:this.finished,data:this.data, tekst:`${this.m1.matrix[this.rij1][this.midden]} + ${this.m2.matrix[this.midden][this.kolom2]} = ?`}
        return {
            finished: this.finished,
            data: this.data,
            tekst: `${this.m1.matrix[this.rij1][this.midden]} * ${this.m2.matrix[this.midden][this.kolom2]} = ?`
        }

    }

}
