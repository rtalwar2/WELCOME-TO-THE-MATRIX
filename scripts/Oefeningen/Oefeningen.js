import Matrix from "../Matrix.js";


export class Oefeningen {
    matrix1;
    aantal_matrices;
    data;
    finished= false;
    matrices = [];


    constructor(m1) {
        if (this.constructor === Oefeningen) {
            throw new Error("Abstract classes can't be instantiated.");
        }
        this.matrix1=m1;
    }

    maakInvul(){
        throw new Error("maakInvul needs to be implemented.");
    }

    checkOplossing(){
        throw new Error("checkOplossing needs to be implemented.");
    }
}
