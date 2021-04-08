import {Oefeningen} from "./Oefeningen.js";
import Matrix from "../Matrix.js";


export class VermenigvuldigOefening extends Oefeningen {

    oplossing;
    matrix2;

    constructor(m1, m2) {
        super(m1);
        this.matrix2 = m2;
        //this.data = new Matrix(m1.aantalRijen, m2.aantalKolommen, "0");
        this.matrices.push(this.matrix1);
        this.matrices.push(this.matrix2);
        console.log(m1);
        console.log(m2);
        this.oplossing= m1.vermenigvuldigMatrix(m2);
        this.aantal_matrices = this.matrices.length;
    }


    getMatrix() {
        var rij = 0;
        let kolom=0;
        let output=new Matrix(this.oplossing.length,this.oplossing[0].length);
        document.querySelectorAll(".matrix_cell").forEach(  value => {
            if (kolom===this.oplossing[0].length){
                rij++;
                kolom=0;
            }
            console.log(`${rij} ${kolom}`)
            output.matrix[rij][kolom]=parseInt(value.value);
            kolom++;
        })
        return output.matrix
    }


    correct(invul) {
        let bool = true;
        for (let i = 0; i < this.oplossing.length; i++) {
            for (let j = 0; j < this.oplossing[0].length; j++) {
                console.log(` check if ${this.oplossing[i][j]} == ${invul[i][j]}`)
                if (this.oplossing[i][j] !== invul[i][j]) {
                    bool= false;
                    return bool;
                }
            }
        }
        return bool;
    }

    checkOplossing(object) {
        let obj = object;
        let invul= obj.getMatrix();
        let bool = this.correct(invul);
        if (bool) {
            alert("goed");
        } else {
            alert("slecht");
        }
    }

    maakInvul() {
        var rows = 3;
        var columns = 3;
        var form = document.getElementById("frm");
        // for (let i = 0; i < rows; i++) {
        //     for (let j = 0; j < columns; j++) {
        //         let input=document.createElement("input");
        //         input.classList.add("matrix_cell");
        //         input.value=parseInt(i*j);
        //         form.appendChild(input);
        //     }
        // }

        let tabel = document.createElement("table");
        tabel.classList.add("u-center")
        form.parentElement.classname="";
        form.parentElement.classList.add(`col-md-${this.oplossing[0].length}`);
        tabel.innerText = "";
        for (let i=0;i<this.oplossing.length;i++) {
            let tr = document.createElement("tr");
            for (let j=0;j<this.oplossing[0].length;j++) {

                let td = document.createElement("td");
                let input=document.createElement("input");
                input.classList.add("matrix_cell");
                input.value=parseInt(0);
                td.appendChild(input);
                tr.appendChild(td);
            }
            tabel.appendChild(tr);
        }
        form.appendChild(tabel);


        `<div class="col-md-2">
                    <table class="table">
                      <tbody class="col-md-8">
                        <tr>
                          <td><input type="text" /></td>
                          <td><input type="text" /></td>
                          <td><input type="text" /></td>
                        </tr>
                        <tr>
                          <td><input type="text" /></td>
                          <td><input type="text" /></td>
                          <td><input type="text" /></td>
                        </tr>
                        <tr>
                          <td><input type="text" /></td>
                          <td><input type="text" /></td>
                          <td><input type="text" /></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>`
    }

}

