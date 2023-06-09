import {Tutorial} from "./Tutorial.js";
import Matrix from "../Matrix.js";

export class InverseTutorial extends Tutorial {

    tekst="";
    matrix2;//de tweede matrix waar de determinant uit berekend wordt
    matrix3;//ONZICHTBARE derde matrix waar getransponeerde uit berekend wordt
    gr=[];
    gk=[];
    det;
    constructor(m1) {
        while(m1.getDeterminant()===0){
            m1=new Matrix(m1.aantalRijen,m1.aantalKolommen);
        }
        super(m1);
        this.stapnummer = 0;
        this.matrix2 = new Matrix(m1.aantalRijen-1, m1.aantalKolommen-1, "0");
        this.matrix3 = new Matrix(m1.aantalRijen, m1.aantalKolommen, "x");
        this.data = new Matrix(m1.aantalRijen, m1.aantalKolommen, "x");
        this.matrices.push(this.matrix1);
        this.matrices.push(this.matrix2);
        this.aantal_matrices = this.matrices.length;
        this.det = m1.getDeterminant()
    }

    addDiv(element,classe){
        let div=document.createElement("div");
        div.classList.add(classe);
        element.appendChild(div);
    }

    refresh(tutorialPage) {//de logica van de InverseTutorial
        document.querySelectorAll(".rood").forEach(value => value.classList.remove("rood"));             //verwijjdert alle vorige rode elementen
        document.querySelectorAll(".vertical-line").forEach(value => value.parentElement.removeChild(value));   //verwijjdert alle vorige rode elementen
        document.querySelectorAll(".horizontal-line").forEach(value => value.parentElement.removeChild(value)); //verwijjdert alle vorige rode elementen
        let hoofdingData = "\"adjunct\"";
        this.stapnummer++;

        if (this.stapnummer <= 9){
            this.kolom1++;
            if (this.kolom1 === this.matrix1.aantalKolommen) {
                this.kolom1 = 0;
                this.rij1++;
            }

            if (this.rij1 === this.matrix1.aantalRijen) {
            }

            else {
                tutorialPage.tabel1.querySelector(`[data-id='id_${this.rij1}-${this.kolom1}']`).classList.add("rood");         //maakt de juiste elementen rood

                for (let rij = 0; rij < this.matrix1.aantalRijen; rij++) {
                    for (let kolom = 0; kolom < this.matrix1.aantalKolommen; kolom++) {

                        // Juiste determinant maken
                        this.gr = [];
                        this.gk = [];

                        for( let g = 0; g < this.matrix1.aantalRijen; g++){
                            if ( g!==this.rij1) {
                                this.gr.push(g);
                            }
                            if ( g!==this.kolom1) {
                                this.gk.push(g);
                            }
                        }

                        for (let t = 0; t < this.matrix2.aantalRijen; t++){
                            for (let s = 0; s < this.matrix2.aantalKolommen; s++){
                                this.matrix2.matrix[t][s] = this.matrix1.matrix[this.gr[t]][this.gk[s]];
                            }
                        }
                        // Juiste lijnen trekken
                        if(rij===this.rij1){
                            if(kolom!==this.kolom1)
                                this.addDiv(tutorialPage.tabel1.querySelector(`[data-id='id_${rij}-${kolom}']`),"horizontal-line");
                        }else {
                            if (kolom===this.kolom1){
                                this.addDiv(tutorialPage.tabel1.querySelector(`[data-id='id_${rij}-${kolom}']`),"vertical-line");
                            }
                        }
                    }
                }
            }
            let tabel2 = document.querySelector("#tabel_m2");   //Determinant tonen
            this.matrix2.drawMatrix(tabel2,"cofactor");

            this.data = this.matrix3.copyMatrix();              // data is copie van matrix3 van vorige stap
            this.matrix3.matrix[this.rij1][this.kolom1] = this.matrix2.getDeterminant() * (-1)**(this.rij1 + this.kolom1);
            this.tekst = "determinant cofactor berekenen en in \"adjunct\" invullen"

        }else if (this.stapnummer === 10){
            this.data = this.matrix3;
            this.tekst = "volgende stap transponeren"

        }else if (this.stapnummer === 11){
            this.matrix2 = this.matrix3;
            this.data = this.matrix3.getTransponneerde();
            let tabel2 = document.querySelector("#tabel_m2");   //Determinant tonen
            this.matrix2.drawMatrix(tabel2,"\"adjunct\"");
            hoofdingData = "adjunct";
            this.tekst = "nu nog delen door determinant matrix1"

        }else if (this.stapnummer === 12){
            this.matrix2 = this.data;
            let tabel2 = document.querySelector("#tabel_m2");   //Determinant tonen
            this.matrix2.drawMatrix(tabel2,"adjunct");
            for(let i=0;i<this.data.aantalRijen;i++){
                for(let j=0;j<this.data.aantalKolommen;j++){
                    this.data.matrix[i][j]+=`/${this.matrix1.getDeterminant()}`;
                }
            }
            this.tekst = "adjunct delen door determinant matrix1 \nDet = " + this.det;
            hoofdingData = "Inverse";
            this.finished = true;


        } else {
            this.finished = true;
        }

        return {
            finished: this.finished,
            data: {mat:this.data,hoofding: hoofdingData},
            tekst: this.tekst
        }
    }
}
