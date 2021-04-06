import {Oefeningen} from "./Oefeningen.js";
import Matrix from "../Matrix.js";


export class DeterminantOefeningen extends Oefeningen{

    oplossing;

    constructor(m1){
        super(m1);
        this.data = new Matrix(m1.aantalRijen, m1.aantalKolommen, false);
        this.matrices.push(this.matrix1);
        console.log(m1);
        this.oplossing= m1.getDeterminant();
        this.aantal_matrices = this.matrices.length;
    }

    getOplossing(){

    }


    checkOplossing(object) {
        let obj = object;
        let invul= obj.getOplossing();
        console.log(invul);
        console.log(this.oplossing);
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
        let valseOplossing1 = this.oplossing + Math.floor(Math.random() * 10 - 5); //random getallen als valse oplossing
        kiesnummer = kiesnummers[Math.floor(Math.random())];
        kiesnummers.splice(kiesnummer-1,1);
        volgorde[kiesnummer] = valseOplossing1;
        let valseOplossing2 = this.oplossing + Math.floor(Math.random() * 10 - 5); //random getallen als valse oplossing +5 of -5 max
        kiesnummer = kiesnummers[0];
        volgorde[kiesnummer] = valseOplossing2;

        let form = document.getElementById("frm");
        for(let i = 0;i<3;i++) {
            let label = document.createElement("label");
            let radio = document.createElement("input");
            radio.type = "radio";
            radio.name = "oplossing";
            radio.value = volgorde[i];
            label.appendChild(radio);
            label.appendChild(document.createTextNode(volgorde[i]));
            form.appendChild(label);
        }
    }

}
