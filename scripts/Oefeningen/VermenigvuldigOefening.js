import {Oefeningen} from "./Oefeningen.js";
import Matrix from "../Matrix.js";


export class VermenigvuldigOefening extends Oefeningen {

    oplossing;
    matrix2;

    constructor(m1, m2) {
        super(m1);
        this.matrix2 = m2;

        this.data = new Matrix(m1.aantalRijen, m2.aantalKolommen, "0");
        this.matrices.push(this.matrix1);
        this.matrices.push(this.matrix2);
        this.oplossing= m1.vermenigvuldigMatrix(m2);
        this.aantal_matrices = this.matrices.length;
    }


    getMatrix() {
        var matrix_row = [];

        var ind = 0;

        $("#frm").contents().each(function (i, e) {
            if (this.nodeName == "INPUT") {
                if (!matrix_row[ind]) {
                    matrix_row.push([]);
                }
                matrix_row[ind].push($(this).val());
            } else {
                ind++;
            }
        });

        return matrix_row
    }


    correct(invul) {

        for (let i = 0; i < this.oplossing.aantalRijen; i++) {
            for (let j = 0; j < this.oplossing.aantalKolommen; j++) {
                if (this.oplossing[i][j] !== invul[i][j]) {
                    return false;
                }
            }
        }
        return bool;
    }



    checkMatrix() {
       let invul= this.getMatrix();
        console.log(invul);
        console.log(this.oplossing);
        let bool = this.correct(invul);
        if (bool) {
            alert("goed");
        } else {
            alert("slecht");
        }
    }

    maakInvul(){//maak invultabel aan
        var rows = 3;
        var columns = 3;
        var form = document.getElementById("frm");
        for(var i = 0; i < rows; i++)
        {
            for(var j = 0; j < columns; j++)
            {
                var input = $('<input>')
                    .attr({
                        class: 'matrix_cell',
                        value: i + j});
                form.appendChild(input[0]);
            }
            var br = $('<br>')[0];
            form.appendChild(br);
        }
        //knop om checkMatrix uit te voeren
    }

}

