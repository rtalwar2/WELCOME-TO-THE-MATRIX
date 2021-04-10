import {Oefeningen} from "./Oefeningen.js";
import Matrix from "../Matrix.js";



export class InverseOefening extends Oefeningen{

    oplossing;

    constructor(m1){
        super(m1);
        this.data = new Matrix(m1.aantalRijen, m1.aantalKolommen, false);
        this.matrices.push(this.matrix1);

        console.log(m1);
        //this.oplossing= m1.getInverse();
        //console.log(this.oplossing);
        this.aantal_matrices = this.matrices.length;
        this.determinant= m1.getDeterminant();
    }

    getOplossing(){

    }


    checkOplossing(object) {
        let obj = object;
        let invul = obj.getOplossing();

        console.log(this.oplossing.matrix);
        let bool = (invul === this.oplossing)
        if (bool) {
            alert("goed");
        } else {
            alert("slecht");
        }
    }

    maakInvul() {
        //volgorde random kiezen
        let kiesnummers = [1,2,3];
        let volgorde = [];
        let kiesnummer = kiesnummers[Math.floor(Math.random()*2)];
        kiesnummers.splice(kiesnummer-1, 1);
        volgorde[kiesnummer] = this.oplossing;
        let valseOplossing1 = this.fout1();
        kiesnummer = kiesnummers[Math.floor(Math.random())];
        kiesnummers.splice(kiesnummer-1,1);
        volgorde[kiesnummer] = valseOplossing1;
        let valseOplossing2 = this.fout2(); //random getallen als valse oplossing +5 of -5 max
        kiesnummer = kiesnummers[0];
        volgorde[kiesnummer] = valseOplossing2;

        let form = document.getElementById("frm");

        for(let i = 0;i<3;i++) {
            let div=document.createElement("div");
            div.classList.add("form-check");
            let label = document.createElement("label");
            let radio = document.createElement("input");
            radio.type = "radio";
            radio.classList.add("form-check-input")
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
    }
    fout1(){
        this.fout=this.oplossing;
        for(let i=0;i<this.oplossing.aantalRijen;i++){
            for(let j=0;j<this.oplossing.aantalKolommen;i++){
                this.fout[i][j]*=this.determinant;
            }
        }
        return this.fout;
    }
    fout2(){
        for(let i=0;i<this.oplossing.aantalRijen;i++){
            for(let j=0;j<this.oplossing.aantalKolommen;i++){
                this.fout[i][j]=this.oplossing.getTransponneerde()[i][j];
            }
        }
        return this.fout;
    }
}
