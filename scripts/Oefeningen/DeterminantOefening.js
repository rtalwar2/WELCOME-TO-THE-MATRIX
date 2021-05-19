import {Oefeningen} from "./Oefeningen.js";
import Matrix from "../Matrix.js";


export class DeterminantOefening extends Oefeningen {


    constructor(m1) {
        super(m1);
        this.matrices.push(this.matrix1);
        this.oplossing = m1.getDeterminant();
        this.aantal_matrices = this.matrices.length;
    }

    getOplossing() {
        let oplossing = document.querySelector('input[name="oplossing"]:checked');
        if (oplossing !== null) {
            return oplossing.value;
        } else {
            return null;
        }

    }

    checkOplossing(object) {
        return object.getOplossing() === "true"
    }

    maakInvul() {
        let eerste_fout = this.fout1();
        let tweede_fout = this.fout2();
        while (eerste_fout === this.oplossing || tweede_fout === this.oplossing || eerste_fout === tweede_fout) {
            this.matrices.pop();
            this.matrix1 = new Matrix();
            this.matrices.push(this.matrix1);
            this.oplossing = this.matrix1.getDeterminant();
            eerste_fout = this.fout1();
            tweede_fout = this.fout2();
        }
        let volgorde;
        if (!isNaN(this.oplossing)) {
            volgorde = [{data: this.oplossing, isOplossing: true}, {
                data: eerste_fout,
                isOplossing: false
            }, {data: tweede_fout, isOplossing: false}, {
                data: "dit kan ik toch niet berekenen?╰（‵□′）╯",
                isOplossing: false
            }];
        } else {
            volgorde = [{data: (eerste_fout + tweede_fout) / 2, isOplossing: false}, {
                data: eerste_fout,
                isOplossing: false
            }, {data: tweede_fout, isOplossing: false}, {
                data: "dit kan ik toch niet berekenen?╰（‵□′）╯",
                isOplossing: true
            }];
        }
        volgorde = volgorde.sort((a, b) => 0.5 - Math.random());
        let form = document.getElementById("frm");

        //clear invul van vorige oefening
        form.innerHTML = '';

        for (let i = 0; i < volgorde.length; i++) {
            let div = document.createElement("div");
            div.classList.add("form-check");
            let label = document.createElement("label");
            let radio = document.createElement("input");
            radio.type = "radio";
            radio.classList.add("form-check-input");
            radio.name = "oplossing";
            radio.value = volgorde[i].isOplossing;
            radio.id = `id_${i}`;
            label.classList.add("form-check-label");
            label.setAttribute("for", `id_${i}`);
            label.innerText = volgorde[i].data;
            div.appendChild(radio);
            div.appendChild(label);
            form.appendChild(div);
        }
        `<div class="form-check">
  <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1">
  <label class="form-check-label" for="flexRadioDefault1">
    Default radio
  </label>
</div>`
        //hint aanmaken --- kan korter met minder hardgecodeerde code, 3x hetzelfde , groot gelijk wie dit ook heeft geschreven
        let div = document.createElement('div');
        if (isNaN(this.oplossing)) {
            let p = document.createElement("p");
            p.innerText = "de determinant is enkel gedefinieerd voor een vierkante matrix";
            div.appendChild(p);
        } else {
            let hint_inhoud="";
            for(let k=0;k<this.matrix1.aantalKolommen;k++){
                let data = new Matrix(this.matrix1.aantalKolommen-1, this.matrix1.aantalRijen-1,"0");
                let i=0;
                let j=0;
                for (let rij = 0; rij < this.matrix1.aantalRijen; rij++) {
                    for (let kolom = 0; kolom < this.matrix1.aantalKolommen; kolom++) {
                        if(rij!==0&&kolom!==k) {
                            data.matrix[i][j++] = this.matrix1.matrix[rij][kolom];
                            if (j === this.matrix1.aantalKolommen - 1) {
                                j = 0;
                                i++;
                            }
                        }
                    }
                }
                hint_inhoud+=`${k%2?" -":" +"} (${this.matrix1.matrix[0][k]}) * ${data.toString()}`
            }
            div.innerHTML=hint_inhoud;
        }
        this.setHint(div)
    }

    fout1() {
        let hulp = JSON.parse(JSON.stringify(this.matrix1));
        this.fout = new Matrix();

        for (let i = 0; i < this.matrix1.aantalRijen; i++) {
            for (let j = 0; j < this.matrix1.aantalKolommen; j++) {
                this.fout.matrix[i][j] = hulp.matrix[i][j];
            }
        }
        let D = 0;
        if (this.fout.aantalRijen === 1)
            return this.fout[0][0];
        let temp;
        let sign = 1;

        for (let f = 0; f < this.fout.aantalRijen; f++) {

            temp = this.fout.getCofactor(this.fout.matrix, 0, f, this.fout.aantalRijen);
            //let element = this.fout.matrix[0][f];
            D += sign * this.fout.getDeterminant(temp, this.fout.aantalRijen - 1);
            // terms are to be added with
            // alternate sign
            sign = -sign;
        }
        return D;
    }

    fout2() {
        let hulp = JSON.parse(JSON.stringify(this.matrix1));
        this.fout = new Matrix();

        for (let i = 0; i < this.matrix1.aantalRijen; i++) {
            for (let j = 0; j < this.matrix1.aantalKolommen; j++) {
                this.fout.matrix[i][j] = hulp.matrix[i][j];
            }
        }
        let D = 0;
        if (this.fout.aantalRijen === 1)
            return this.fout[0][0];
        let temp;
        let sign = 1;

        for (let f = 0; f < this.fout.aantalRijen; f++) {
            temp = this.fout.getCofactor(this.fout.matrix, 0, f, this.fout.aantalRijen);
            let element = this.fout.matrix[0][f];
            D += sign * element * this.fout.getDeterminant(temp, this.fout.aantalRijen - 1);
            // terms are to be added with
            // alternate sign
        }
        return D;
    }

}


