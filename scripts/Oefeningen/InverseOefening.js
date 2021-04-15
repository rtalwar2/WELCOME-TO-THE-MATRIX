import {Oefeningen} from "./Oefeningen.js";
import Matrix from "../Matrix.js";



export class InverseOefening extends Oefeningen{

    oplossing;

    constructor(m1){
        while(m1.getDeterminant()===0){
            m1=new Matrix(3,3);
        }
        super(m1);
        this.data = new Matrix(m1.aantalRijen, m1.aantalKolommen, "0");
        this.matrices.push(this.matrix1);
        console.log(m1);
        this.oplossing= m1.getInverse();
        console.log(this.oplossing);
        this.aantal_matrices = this.matrices.length;
        this.determinant= m1.getDeterminant();
    }

    getOplossing(){
        return JSON.parse(document.querySelector('input[name="oplossing"]:checked').value);
    }


    checkOplossing(object) {
        let obj = object;
        let invul = obj.getOplossing();
        console.log(invul);
        console.log(this.oplossing.adjunct.matrix);
        let bool= true;
        for(let i=0;i<this.oplossing.adjunct.aantalRijen;i++){
            for(let j=0;j<this.oplossing.adjunct.aantalKolommen;j++){
                if (invul.adjunct.matrix[i][j] !== this.oplossing.adjunct.matrix[i][j]){
                   bool=false;
                }
            }
        }
        if(bool===true){
            alert("goed");
        } else {
            alert("slecht");
        }
    }

    maakInvul() {

        //let kiesnummers = [1,2,3];
        let volgorde = [];
        //let kiesnummer = kiesnummers[Math.floor(Math.random()*2)];
        //kiesnummers.splice(kiesnummer-1, 1);
        volgorde[0] = this.oplossing;
        let valseOplossing1 = this.fout1();
        //kiesnummer = kiesnummers[Math.floor(Math.random())];
        //kiesnummers.splice(kiesnummer-1,1);
        volgorde[1] = valseOplossing1;
        let valseOplossing2 = this.fout2();
        //kiesnummer = kiesnummers[0];
        volgorde[2] = valseOplossing2;
        console.log(volgorde);
        for (let i = volgorde.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            let temp = volgorde[i];
            volgorde[i] = volgorde[j];
            volgorde[j] = temp;
        }
        console.log(volgorde);
        let form = document.getElementById("frm");

        for(let i = 0;i<3;i++) {
            let div=document.createElement("div");
            div.classList.add("form-check");
            let label = document.createElement("label");
            let radio = document.createElement("input");
            radio.type = "radio";
            radio.classList.add("form-check-input")
            radio.name = "oplossing";
            radio.value = JSON.stringify(volgorde[i]);
            radio.id= `id_${volgorde[i]}`;
            label.classList.add("form-check-label");
            label.setAttribute("for",`id_${volgorde[i]}`);
            label.innerHTML=`1/${this.oplossing.determinant} * ${volgorde[i].adjunct}`;
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
    }

    fout1(){
       this.fout=JSON.parse(JSON.stringify(this.oplossing));
       this.fout.adjunct= new Matrix();
       this.fout.inverse=new Matrix();
       let hulp= JSON.parse(JSON.stringify(this.oplossing.adjunct));
       let hulpinv=JSON.parse(JSON.stringify(this.oplossing.inverse));
        for(let i=0;i<this.matrix1.aantalRijen;i++){
            for(let j=0;j<this.matrix1.aantalKolommen;j++){
                this.fout.adjunct.matrix[i][j]= hulp.matrix[i][j]*(-1);
                this.fout.inverse.matrix[i][j]=hulpinv.matrix[i][j]*(-1);
            }
        }
        return this.fout;
    }
    fout2(){
        this.fout=JSON.parse(JSON.stringify(this.oplossing));
        this.fout.adjunct=new Matrix();
        this.fout.inverse=new Matrix();
        let trans= this.oplossing.adjunct.getTransponneerde();
        let hulpinv=this.oplossing.inverse.getTransponneerde();
        for(let i=0;i<this.matrix1.aantalRijen;i++){
            for(let j=0;j<this.matrix1.aantalKolommen;j++){
                this.fout.adjunct.matrix[i][j]=trans.matrix[i][j];
                this.fout.inverse.matrix[i][j]=hulpinv.matrix[i][j];
            }
        }
        return this.fout;
    }
}
