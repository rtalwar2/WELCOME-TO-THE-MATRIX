import {Tutorial} from "./Tutorial.js";
import Matrix from "./Matrix.js";

export class VermenigvuldigTutorial extends Tutorial{

    m1;
    m2;
    matrices=[];
    rij1=0;
    kolom2=0;
    midden=0;
    data;
    som=0;
    aantal_matrices;
    finished=false;
    constructor(m1,m2){
        super();
        this.stapnummer=0;
        this.m1=m1;
        this.m2=m2;
        this.data=new Matrix(m1.aantalRijen,m2.aantalKolommen,true);
        this.matrices.push(this.m1);
        this.matrices.push(this.m2);
        this.aantal_matrices=this.matrices.length;
    }

    refresh(stapnummer) {
        if(this.stapnummer===0){
            this.stapnummer++;
            return {element1:[this.rij1,this.midden],element2:[this.midden,this.kolom2],data:this.data, tekst:`${this.m1.matrix[this.rij1][this.midden]} + ${this.m2.matrix[this.rij1][this.midden]} = ?`}
        }
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
             this.finished=true;
        }
        this.som+=this.m1.matrix[this.rij1][this.midden]+this.m2.matrix[this.midden][this.kolom2];
        return {element1:[this.rij1,this.midden],element2:[this.midden,this.kolom2],finished:this.finished,data:this.data, tekst:`${this.m1.matrix[this.rij1][this.midden]} + ${this.m2.matrix[this.midden][this.kolom2]} = ?`}
    }

}
