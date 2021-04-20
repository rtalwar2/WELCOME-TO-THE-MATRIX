import {Tutorial} from "./Tutorial.js";
import Matrix from "../Matrix.js";

export class VermenigvuldigTutorial extends Tutorial {

    kolom2 = 0;
    som = 0;
    tekst="";
    uitleg="";
    matrix2;//de tweede matrix waarmee vermenigvuldigd wordt
    constructor(m1, m2) {
        super(m1);
        this.stapnummer = 0;
        this.matrix2 = m2;
        this.data = new Matrix(m1.aantalRijen, m2.aantalKolommen, "0");
        this.matrices.push(this.matrix1);
        this.matrices.push(this.matrix2);
        this.aantal_matrices = this.matrices.length;
    }

    drawMatrices(){
        document.querySelector("#matrices").innerHTML =
            `<div class="row">
                                    <div class="col-md-${this.matrix1.aantalKolommen}"></div>
                                    <div>
                                        <table id="tabel_m2" class="table">
                                        </table>
                                    </div>
                                </div>
                                <div class="row">
                                    <div>
                                        <table id="tabel_m1" class="table">
                                        </table>
                                    </div>
                                    <div>
                                        <table id="tabel_m3" class="table">
                                        </table>
                                    </div>
                                </div>`

    }

    refresh(tutorialPage) {//de logica van de vermenigvuldigtutorial
        document.querySelectorAll(".rood").forEach(value => value.classList.remove("rood"));//maakt de juite elementen rood

        this.kolom1++;
        if (this.kolom1 === this.matrix1.aantalKolommen) {
            this.kolom1 = 0;
            this.data.matrix[this.rij1][this.kolom2] = this.som;
            this.rij1++;
            this.som = 0;
            this.tekst="";
        }

        if (this.rij1 === this.matrix1.aantalRijen) {
            this.rij1 = 0;
            this.kolom2++;
        }

        if (this.kolom2 === this.matrix2.aantalKolommen) {
            this.finished = true;
        }
        else {//als de tutorial niet gedaan is, kleur de juiste elementen
            tutorialPage.tabel1.querySelector(`[data-id='id_${this.rij1}-${this.kolom1}']`).classList.add("rood");
            tutorialPage.tabel2.querySelector(`[data-id='id_${this.kolom1}-${this.kolom2}']`).classList.add("rood");
        }

        this.som += this.matrix1.matrix[this.rij1][this.kolom1] * this.matrix2.matrix[this.kolom1][this.kolom2];
        if(this.kolom1 !== 0){
            this.tekst += " + ";
        }

        this.tekst+=`${this.matrix1.matrix[this.rij1][this.kolom1]} * ${this.matrix2.matrix[this.kolom1][this.kolom2]} `

        this.uitleg= "Als je de rij "+ `${this.rij1 + 1}`+ " van matrix 1 en kolom "+ `${this.kolom2 + 1}` + " van matrix 2 element per element vermenigvuldigt en daar de som van neemt krijg je het getal op positie " + `(${this.rij1 + 1},${this.kolom2 + 1})` + " in de product-matrix:" + `<br>`;

        return {
            finished: this.finished,
            data: {mat:this.data,hoofding:"product"},
            tekst: this.uitleg + `<br> <h3>${this.matrix1.matrix[this.rij1][this.kolom1]} * ${this.matrix2.matrix[this.kolom1][this.kolom2]} ==> ${this.matrix1.matrix[this.rij1][this.kolom1] * this.matrix2.matrix[this.kolom1][this.kolom2]}</h3> <br>`
                + `<br> <h3>Som = ${this.tekst} = (${this.som})</h3>`
        }
    }
}
