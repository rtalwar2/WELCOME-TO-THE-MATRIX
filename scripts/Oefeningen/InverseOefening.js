import {Oefeningen} from "./Oefeningen.js";
import Matrix from "../Matrix.js";


export class InverseOefening extends Oefeningen {


    constructor(m1, strikvraag = false) {
        if (strikvraag) {
            while (m1.getDeterminant() != 0) {
                m1 = new Matrix(m1.aantalKolommen, m1.aantalKolommen);
            }
        } else {
            while (m1.getDeterminant() === 0) {
                m1 = new Matrix(m1.aantalKolommen, m1.aantalKolommen);
            }
        }
        super(m1);
        this.matrices.push(this.matrix1);
        this.strikvraag = strikvraag;
        this.oplossing = m1.getInverse();
        this.aantal_matrices = this.matrices.length;
        this.determinant = m1.getDeterminant();

        if (this.strikvraag) {
            this.randomMatrix = new Matrix(m1.aantalKolommen, m1.aantalKolommen);
            while (this.randomMatrix.getDeterminant() === 0) {
                this.randomMatrix = new Matrix(m1.aantalKolommen, m1.aantalKolommen);
            }
            this.oplossing = this.randomMatrix.getInverse();
        }
    }


    getOplossing() {
        return JSON.parse(document.querySelector('input[name="oplossing"]:checked').value);

    }


    checkOplossing(object) {
        let invul = object.getOplossing();

        let bool = false;
        if (this.strikvraag && invul.includes("strik")) {
            bool = true;
        } else {
            if (this.strikvraag == false && invul.includes("oplossing")) {
                bool = true;

            }
        }
        return bool;
    }

    maakInvul() {
        let volgorde_nieuw = [{data: this.oplossing, isOplossing: "oplossing"}, {
            data: this.fout1(),
            isOplossing: "fout"
        }, {data: this.fout2(), isOplossing: "fout"}, {data: "de inverse bestaat niet", isOplossing: "strikvraag"}];
        volgorde_nieuw = volgorde_nieuw.sort((a, b) => 0.5 - Math.random());
        let volgorde = volgorde_nieuw;
        let form = document.getElementById("frm");
        //clear invul van vorige oefening
        form.innerHTML = '';

        for (let i = 0; i < volgorde_nieuw.length; i++) {
            let div = document.createElement("div");
            div.id = "opl";
            div.classList.add("form-check");
            let label = document.createElement("label");
            let radio = document.createElement("input");
            radio.type = "radio";
            radio.classList.add("form-check-input")
            radio.name = "oplossing";
            radio.value = JSON.stringify(volgorde[i].isOplossing);
            radio.id = `id_${i}`;
            label.classList.add("form-check-label");
            label.setAttribute("for", `id_${i}`);
            if (volgorde[i].data instanceof Object) {
                label.innerHTML = `1/${this.oplossing.determinant} * ${volgorde[i].data.adjunct}`;
            } else {
                label.innerHTML = volgorde[i].data;
            }
            div.appendChild(radio);
            div.appendChild(label);
            form.appendChild(div);
        }
        `<div class="form-check">
  <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1">
  <label class="form-check-label" for="flexRadioDefault1">
    Default radio
  </label>
</div>`;
        //hint aanmaken
        let div = document.createElement("div");
        let hint = "inv(A) = adj(A)/det(A) met adj(A) = ";

        let table = document.createElement("table");
        for (let i = 0; i < this.matrix1.matrix.length; i++) {
            let tr = document.createElement("tr");
            for (let j = 0; j < this.matrix1.matrix.length; j++) {
                let td = document.createElement("td");
                let newtable = document.createElement("table");
                for (let k = 0; k < this.matrix1.matrix.length; k++) {
                    let newtr = document.createElement("tr");
                    for (let l = 0; l < this.matrix1.matrix.length; l++) {
                        let newtd = document.createElement("td");
                        if (i === k && j === l) {
                            newtd.innerHTML = "1";
                        } else if (i === k || j === l) {
                            newtd.innerHTML = "0";
                        } else {
                            newtd.innerHTML = "" + this.matrix1.matrix[k][l];
                        }
                        newtr.appendChild(newtd);
                    }
                    newtable.appendChild(newtr);
                }
                td.appendChild(newtable);
                tr.appendChild(td);
            }
            table.appendChild(tr);
        }
        div.innerHTML = hint;
        div.appendChild(table);
        this.setHint(div);
    }

    fout1() {
        this.fout = JSON.parse(JSON.stringify(this.oplossing));
        this.fout.adjunct = new Matrix(this.oplossing.adjunct.aantalKolommen, this.oplossing.adjunct.aantalKolommen);
        this.fout.inverse = new Matrix(this.oplossing.inverse.aantalKolommen, this.oplossing.inverse.aantalKolommen);
        let hulp = JSON.parse(JSON.stringify(this.oplossing.adjunct));
        let hulpinv = JSON.parse(JSON.stringify(this.oplossing.inverse));
        for (let i = 0; i < this.matrix1.aantalRijen; i++) {
            for (let j = 0; j < this.matrix1.aantalKolommen; j++) {
                this.fout.adjunct.matrix[i][j] = hulp.matrix[i][j] * (-1);
                this.fout.inverse.matrix[i][j] = hulpinv.matrix[i][j] * (-1);
            }
        }
        return this.fout;
    }

    fout2() {
        this.fout = JSON.parse(JSON.stringify(this.oplossing));
        this.fout.adjunct = new Matrix(this.oplossing.adjunct.aantalKolommen, this.oplossing.adjunct.aantalKolommen);
        this.fout.inverse = new Matrix(this.oplossing.inverse.aantalKolommen, this.oplossing.inverse.aantalKolommen);
        let trans = this.oplossing.adjunct.getTransponneerde();
        let hulpinv = this.oplossing.inverse.getTransponneerde();
        for (let i = 0; i < this.matrix1.aantalRijen; i++) {
            for (let j = 0; j < this.matrix1.aantalKolommen; j++) {
                this.fout.adjunct.matrix[i][j] = trans.matrix[i][j];
                this.fout.inverse.matrix[i][j] = hulpinv.matrix[i][j];
            }
        }


        return this.fout;
    }
}
