import Matrix from "../Matrix.js"

export class Tutorial {
    stapnummer;
    matrix;
    aantal_matrices;
    m1;//matrix waarmee te tutorial begint
    data; //van vorm {finished:boolean,data:een matrix, tekst:"de best passende beschrijving bij de huidige bewerking"} wordt teruggegeven door refresh methode
    finished = false;

    constructor(m1) {
        if (this.constructor === Tutorial) {
            throw new Error("Abstract classes can't be instantiated.");
        }
        this.m1 = m1;
    }

    refresh(stapnummer) {
        throw new Error("Method 'refresh()' must be implemented.");
    }
}
