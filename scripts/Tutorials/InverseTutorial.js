import {Tutorial} from "./Tutorial.js";
import Matrix from "../Matrix.js";

export class InverseTutorial extends Tutorial {

    kolom2 = 0;
    som = 0;
    tekst="";
    matrix2;//de tweede matrix waar de determinant uit berekend wordt
    matrix3;//ONZICHTBARE derde matrix waar getransponeerde uit berekend wordt

    gr=[];
    gk=[];
    constructor(m1) {
        super(m1);
        this.stapnummer = 0;
        this.matrix2 = new Matrix(m1.aantalRijen-1, m1.aantalKolommen-1, false);
        this.matrix3 = new Matrix(m1.aantalRijen, m1.aantalKolommen, false);
        this.data = new Matrix(m1.aantalRijen, m1.aantalKolommen, false);
        this.matrices.push(this.matrix1);
        this.matrices.push(this.matrix2);
        this.aantal_matrices = this.matrices.length;
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


        this.kolom1++;
        if (this.kolom1 === this.matrix1.aantalKolommen) {
            this.kolom1 = 0;
            this.rij1++;
            //this.finished = true;
        }

        if (this.rij1 === this.matrix1.aantalRijen) {
            this.rij1 = 0;
            this.finished = true;
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


                    // Data matrix uitrekenen       Werkt nog niet doordat getDeterminant en getTransponneerde nog niet werken
                    // this.matrix3.matrix[this.rij1][this.kolom1] = this.matrix2.getDeterminant();
                    // this.data = this.matrix3.getTransponneerde();

                    //temp
                    this.matrix3.matrix[this.rij1][this.kolom1] = 1;
                    this.data = this.matrix3;


                }
            }
        }




        let tabel2 = document.querySelector("#tabel_m2");   //Determinant tonen
        this.matrix2.drawMatrix(tabel2);
        // let testmatrix = new Matrix(3,2,false);
        // testmatrix.drawMatrix(tabel2);
        // this.matrix1.importMatrix([[1,2,3],[4,5,6],[7,8,9]]);
        // this.matrix1.matrix[0][0] = 5;
        // this.matrix1.drawMatrix(tabel2);

        return {
            finished: this.finished,
            data: this.data,
            tekst: this.tekst
        }
    }
}
