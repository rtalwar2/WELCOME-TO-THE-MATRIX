import Matrix from "../Matrix.js"

export class Tutorial {
    stapnummer;
    aantal_matrices;
    matrix1;//matrix waarmee de tutorial begint
    data; //van vorm {finished:boolean,data:een matrix, tekst:"de best passende beschrijving bij de huidige bewerking"} wordt teruggegeven door refresh methode
    rij1 = 0;
    kolom1 = -1;
    matrices = [];

    constructor(m1) {
        if (this.constructor === Tutorial) {
            throw new Error("Abstract classes can't be instantiated.");
        }
        this.matrix1 = m1;
    }

    refresh(stapnummer) {
        throw new Error("Method 'refresh()' must be implemented.");
    }

    drawMatrices() {
        document.querySelector("#matrices").innerHTML =
            `<div class="row">
                                    <div>
                                        <table id="tabel_m1" class="table">
                                        </table>
                                    </div>
                                                                        <div>
                                        <table id="tabel_m2" class="table">
                                        </table>
                                    </div>
                                    <div>
                                        <table id="tabel_m3" class="table">
                                        </table>
                                    </div>
                                </div>`


    }
}
