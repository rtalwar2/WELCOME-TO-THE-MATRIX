import {Oefeningen} from "./Oefeningen.js";
import Matrix from "../Matrix.js";


export class DeterminantOefening extends Oefeningen{

    oplossing;

    constructor(m1){
        super(m1);
        this.data = new Matrix(m1.aantalRijen, m1.aantalKolommen, "0");
        this.matrices.push(this.matrix1);
        console.log(m1);
        this.oplossing= m1.getDeterminant();
        this.aantal_matrices = this.matrices.length;
    }

    getOplossing(){
        return document.querySelector('input[name="oplossing"]:checked').value;
    }

    checkOplossing(object) {
        let obj = object;
        let invul= obj.getOplossing();
        console.log(invul);
        console.log(this.oplossing);
        return invul == this.oplossing//moet anders werkt het niet
    }

    maakInvul() {
        //volgorde random kiezen
        // let kiesnummers = [1,2,3];
        // let volgorde = [];
        // let kiesnummer = kiesnummers[Math.floor(Math.random()*2)];
        // kiesnummers.splice(kiesnummer-1, 1);
        // volgorde[kiesnummer] = this.oplossing;
        // let valseOplossing1 = this.oplossing + Math.floor(Math.random() * 10 - 5); //random getallen als valse oplossing
        // kiesnummer = kiesnummers[Math.floor(Math.random())];
        // kiesnummers.splice(kiesnummer-1,1);
        // volgorde[kiesnummer] = valseOplossing1;
        // let valseOplossing2 = this.oplossing + Math.floor(Math.random() * 10 - 5); //random getallen als valse oplossing +5 of -5 max
        // kiesnummer = kiesnummers[0];
        // volgorde[kiesnummer] = valseOplossing2;
        //+Math.floor(this.oplossing*((Math.random()%0.2)+2))
        //this.oplossing*-1+Math.floor(Math.random() * 10) - 5
        console.log("Oplossing  "+this.oplossing);
        console.log("Matrix 1 "+this.matrix1.matrix);
        let eerste_fout= this.fout1();
        let tweede_fout= this.fout2();
        while(eerste_fout === this.oplossing || tweede_fout === this.oplossing || eerste_fout=== tweede_fout){
           this.matrices.pop();
            this.matrix1= new Matrix();
            this.matrices.push(this.matrix1);
           this.oplossing= this.matrix1.getDeterminant();
           console.log("Matrix 2 "+this.matrix1.matrix);
           console.log("nieuwe matrix "+this.oplossing);
            eerste_fout= this.fout1();
            tweede_fout= this.fout2();
        }
        let volgorde=[this.oplossing,eerste_fout,tweede_fout];
        volgorde=volgorde.sort((a, b) => 0.5 - Math.random());
        console.log(volgorde);
        //kan 2 dezelfde oplossingen geven
        let form = document.getElementById("frm");

        //clear invul van vorige oefening
        form.innerHTML = '';

        for(let i = 0;i<3;i++) {
            let div=document.createElement("div");
            div.classList.add("form-check");
            let label = document.createElement("label");
            let radio = document.createElement("input");
            radio.type = "radio";
            radio.classList.add("form-check-input");
            radio.name = "oplossing";
            radio.value = volgorde[i];
            radio.id= `id_${volgorde[i]}`;
            label.classList.add("form-check-label");
            label.setAttribute("for",`id_${volgorde[i]}`);
            label.innerText=volgorde[i];
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
        //hint aanmaken --- kan korter met minder hardgecodeerde code, 3x hetzelfde
        let div = document.createElement('div');
        let hint = "+ (" + this.matrix1.matrix[0][0] + ") * ";
        let table = document.createElement("table");
        for(let i = 0;i<2;i++) {
            let tr = document.createElement("tr");
            let td1 = document.createElement("td");
            td1.innerHTML = this.matrix1.matrix[1+i][1];
            tr.appendChild(td1);
            let td2 = document.createElement("td");
            td2.innerHTML = this.matrix1.matrix[1+i][2];
            tr.appendChild(td2);
            table.appendChild(tr);
        }
        div.innerHTML = hint;
        div.appendChild(table);
        div.innerHTML += "- (" + this.matrix1.matrix[0][1] + ") * ";
        let table1 = document.createElement("table");
        for(let i = 0;i<2;i++) {
            let tr = document.createElement("tr");
            let td1 = document.createElement("td");
            td1.innerHTML = this.matrix1.matrix[1+i][0];
            tr.appendChild(td1);
            let td2 = document.createElement("td");
            td2.innerHTML = this.matrix1.matrix[1+i][2];
            tr.appendChild(td2);
            table1.appendChild(tr);
        }
        div.append(table1);
        div.innerHTML += "+ (" + this.matrix1.matrix[0][2] + ") * ";
        let table2 = document.createElement("table");
        for(let i = 0;i<2;i++) {
            let tr = document.createElement("tr");
            let td1 = document.createElement("td");
            td1.innerHTML = this.matrix1.matrix[1+i][0];
            tr.appendChild(td1);
            let td2 = document.createElement("td");
            td2.innerHTML = this.matrix1.matrix[1+i][1];
            tr.appendChild(td2);
            table2.appendChild(tr);
        }
        div.append(table2);
        this.setHint(div)
    }

    fout1(){
        let hulp=JSON.parse(JSON.stringify(this.matrix1));
        this.fout= new Matrix();

        for(let i=0;i<this.matrix1.aantalRijen;i++){
            for(let j=0;j<this.matrix1.aantalKolommen;j++){
                this.fout.matrix[i][j]= hulp.matrix[i][j];
            }
        }
        let D = 0;
        if (this.fout.aantalRijen === 1)
            return this.fout[0][0];
        let temp;
        let sign = 1;

        for (let f = 0; f < this.fout.aantalRijen; f++) {

            temp = this.fout.getCofactor(this.fout.matrix, 0, f,this.fout.aantalRijen );
            //let element = this.fout.matrix[0][f];
            D += sign  * this.fout.getDeterminant(temp, this.fout.aantalRijen - 1);
            // terms are to be added with
            // alternate sign
            sign = -sign;
        }
        console.log("Fout1  "+D);
        return D;
    }
    fout2(){
        let hulp=JSON.parse(JSON.stringify(this.matrix1));
        this.fout= new Matrix();

        for(let i=0;i<this.matrix1.aantalRijen;i++){
            for(let j=0;j<this.matrix1.aantalKolommen;j++){
                this.fout.matrix[i][j]= hulp.matrix[i][j];
            }
        }
        let D = 0;
        if (this.fout.aantalRijen === 1)
            return this.fout[0][0];
        let temp;
        let sign = 1;

        for (let f = 0; f < this.fout.aantalRijen; f++) {

            temp = this.fout.getCofactor(this.fout.matrix, 0, f,this.fout.aantalRijen );
            let element = this.fout.matrix[0][f];
            D += sign * element * this.fout.getDeterminant(temp, this.fout.aantalRijen - 1);
            // terms are to be added with
            // alternate sign

        }
        console.log("Fout2  "+D);
        return D;
    }

}


