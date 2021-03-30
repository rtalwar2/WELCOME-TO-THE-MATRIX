import {Oefeningen} from "./Oefeningen.js";
import Matrix from "./Matrix.js";


export class VermenigvuldigOefening extends Oefeningen{
    oefeningen=[];
    matrices=[];
    m2;
    oplossing;

    constructor(aantal) {
        super(aantal);
        for(let i=0;i<aantal;i++){
            this.m1= new Matrix();
            this.m2=new Matrix();
            this.data = new Matrix(m1.aantalRijen, m2.aantalKolommen, true);
            this.oplossing=m1.vermenigvuldigMatrix(m2)
            this.matrices.push(this.m1);
            this.matrices.push(this.m2);
            this.matrices.push(this.data);
            this.aantal_matrices = this.matrices.length;
            this.oefeningen.push(this.matrices);
            this.matrices=null;
        }



    }

    correct(invul){
        for(let i=0;i<this.oplossing.aantalRijen;i++){
            for(let j=0;j<this.oplossing.aantalKolommen;j++){
                if(this.oplossing[i][j]!==invul[i][j]){
                    return false;
                }
            }
        }
        return true;
    }
}

