import {Tutorial} from "./Tutorial.js";
import Matrix from "../Matrix.js";

export class DeterminantTutorial extends Tutorial {

    tekst="";
    determinant="";
    constructor(m1) {
        super(m1);
        this.stapnummer = 0;
        this.data = new Matrix(m1.aantalKolommen-1, m1.aantalRijen-1, "x");
        this.matrices.push(this.matrix1);
        this.aantal_matrices = this.matrices.length;
    }

    addDiv(element,classe){
        let div=document.createElement("div");
        div.classList.add(classe);
        element.appendChild(div);
    }

    refresh(tutorialPage) {//de logica van de Determinanttutorial, we ontwikkelen naar eerste rij
        //{finished:boolean,data:een matrix, tekst:"de best passende beschrijving bij de huidige bewerking"}
        document.querySelectorAll(".rood").forEach(value => value.classList.remove("rood"));//verwijjdert alle vorige rode elementen
        // document.querySelectorAll(".strikeout").forEach(value => value.classList.remove("strikeout"));//verwijjdert alle vorige rode elementen
        document.querySelectorAll(".vertical-line").forEach(value => value.parentElement.removeChild(value));//verwijjdert alle vorige rode elementen
        document.querySelectorAll(".horizontal-line").forEach(value => value.parentElement.removeChild(value));//verwijjdert alle vorige rode elementen
        this.kolom1++;
        if (this.kolom1 === this.matrix1.aantalKolommen) {
            this.finished = true;
        }
        else {

            //this.addDiv(tutorialPage.tabel1.querySelector(`[data-id='id_${0}-${this.kolom1}']`),"vertical-line");
            tutorialPage.tabel1.querySelector(`[data-id='id_${this.rij1}-${this.kolom1}']`).classList.add("rood");//maakt de juite elementen rood
            //tutorialPage.tabel1.querySelector("tr").classList.add("strikeout");
            let i=0;
            let j=0;
            for (let rij = 0; rij < this.matrix1.aantalRijen; rij++) {
                for (let kolom = 0; kolom < this.matrix1.aantalKolommen; kolom++) {
                    if(rij!==0&&kolom!==this.kolom1){
                        this.data.matrix[i][j++] = this.matrix1.matrix[rij][kolom];
                        if (j === this.matrix1.aantalKolommen - 1)
                        {
                            j = 0;
                            i++;
                        }
                    }
                    else{
                        if(rij===0){
                            if(kolom!==this.kolom1)
                                this.addDiv(tutorialPage.tabel1.querySelector(`[data-id='id_${rij}-${kolom}']`),"horizontal-line");
                        }
                        else{
                            this.addDiv(tutorialPage.tabel1.querySelector(`[data-id='id_${rij}-${kolom}']`),"vertical-line");
                        }
                    }
                }
            }

        }
        this.tekst+=`${this.determinant}\n${this.matrix1.matrix[this.rij1][this.kolom1]} * ${this.data.toString()} = `
        this.determinant=this.data.getDeterminant();
        return {finished: this.finished, data: this.data, tekst:this.tekst}
    }

}
