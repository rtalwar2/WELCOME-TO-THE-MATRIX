import {Tutorial} from "./Tutorial.js";
import Matrix from "./Matrix.js";

export class VermenigvuldigTutorial extends Tutorial{

    m1;
    m2;
    rij1=0;
    kolom2=0;
    midden=0;
    data;
    som;
    constructor(m1,m2){
        super();
        this.stapnummer=0;
        this.m1=m1;
        this.m2=m2;
        this.data=new Matrix(m1.aantalRijen,m2.aantalKolommen,true);
    }

    refresh(stapnummer) {
        console.log(this.m1.matrix[0][0])
        this.stapnummer=stapnummer;
        this.midden++;
        if(this.midden===this.m1.aantalKolommen){
            this.midden=0;
            this.data.matrix[this.rij1][this.kolom2]=this.som;
            this.rij1++;
            this.som=0;
        }
        if(this.rij1===this.m1.aantalRijen){
            this.rij1=0;
            this.kolom2++;
        }
        if(this.kolom2===this.m2.aantalKolommen){
            alert("tutorial finished");
        }
        this.som+=this.m1.matrix[this.rij1][this.midden]+this.m2.matrix[this.rij1][this.midden];
        return {element1:[this.rij1,this.midden],element2:[this.midden,this.kolom2],data:this.data,
            tekst:`${this.m1.matrix[this.rij1][this.midden]} + ${this.m2.matrix[this.rij1][this.midden]} = ?`}
    }

}
