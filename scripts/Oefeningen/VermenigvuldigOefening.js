import {Oefeningen} from "./Oefeningen.js";
import Matrix from "../Matrix.js";


export class VermenigvuldigOefening extends Oefeningen {

    matrix2;

    constructor(m1, m2) {
        super(m1);
        this.matrix2 = m2;
        this.matrices.push(this.matrix1);
        this.matrices.push(this.matrix2);
        this.oplossing= m1.vermenigvuldigMatrix(m2);
        this.aantal_matrices = this.matrices.length;
    }


    getMatrix() {
        var rij = 0;
        let kolom=0;
        let output=new Matrix(document.querySelector("#rijen").value,document.querySelector("#kolommen").value);
        document.querySelectorAll(".matrix_cell").forEach(  value => {
            if (kolom==document.querySelector("#kolommen").value){//moet met == ipv === anders werkt het niet
                rij++;
                kolom=0;
            }
            output.matrix[rij][kolom]=parseInt(value.value);
            kolom++;
        });
        return output.matrix
    }


    correct(invul) {
        if(this.oplossing.length!=0) {
            if ((this.oplossing.length != document.querySelector("#rijen").value) || (this.oplossing[0].length != document.querySelector("#kolommen").value)) { //moet met != ipv !==
                return false;
            }

            for (let i = 0; i < this.oplossing.length; i++) {
                for (let j = 0; j < this.oplossing[0].length; j++) {
                    if (this.oplossing[i][j] !== invul[i][j]) {
                        return false;
                    }
                }
            }
            return true;
        }
        return invul.length==1&&invul[0]==0;

    }

    checkOplossing(object) {
        let obj = object;
        let invul= obj.getMatrix();
        return this.correct(invul);
    }

    changeInvul(){
        var rows = document.querySelector("#rijen").value;
        var columns = document.querySelector("#kolommen").value;
        var form = document.getElementById("frm");
        let tabel = document.createElement("table");
        tabel.classList.add("u-center");
        tabel.id="input_tabel";
        form.parentElement.classList.remove(...form.parentElement.classList);
        form.parentElement.classList.add(`col-md-${columns*2}`);
        tabel.innerText = "";
        for (let i=0;i<rows;i++) {
            let tr = document.createElement("tr");
            for (let j=0;j<columns;j++) {
                let td = document.createElement("td");
                let input=document.createElement("input");
                input.classList.add("matrix_cell");
                input.value=parseInt(0);
                td.appendChild(input);
                tr.appendChild(td);
            }
            tabel.appendChild(tr);
        }
        if(document.querySelector("#input_tabel")!=null){
            form.removeChild(document.querySelector("#input_tabel"));
        }
        form.appendChild(tabel);
    }

    maakInvul() {
        `        <div class="row">
            <label for="rijen">aantal rijen:</label><input class="left" type="number" id="rijen" min="1" max="5">

        </div>
        <div class="row">
            <label for="kolommen">aantal kolommen:</label><input class="left" type="number" id="kolommen" min="1" max="5">

        </div>`;
        let form = document.getElementById("frm");
        let row1 = document.createElement("div");
        row1.classList.add("row");
        let input1 = document.createElement("input");
        input1.type = "number";
        input1.classList.add("left");
        input1.id = "rijen";
        input1.min = "1";
        input1.max = "5";
        input1.value = 5;
        let label1 = document.createElement("label");

        label1.setAttribute("for", "rijen");
        label1.innerText = "aantal rijen:";

        let row2 = document.createElement("div");
        row2.classList.add("row");
        let input2 = document.createElement("input");
        input2.type = "number";
        input2.classList.add("left");
        input2.id = "kolommen";
        input2.value = 2;
        input2.min = "1";
        input2.max = "5";
        let label2 = document.createElement("label");

        label2.setAttribute("for", "kolommen");
        label2.innerText = "aantal kolommen:";
        row1.appendChild(label1);
        row1.appendChild(input1);
        row2.appendChild(label2);
        row2.appendChild(input2);
        form.appendChild(row1);
        form.appendChild(row2);
        input1.addEventListener("change", this.changeInvul);
        input2.addEventListener("change", this.changeInvul);

        this.changeInvul();

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
                  </div>`;
        let div = document.createElement("div");

        if(this.oplossing.length!=0) {
            let hint = "Rij 1 (matrix 1) x kolom 1 (matrix 2):\n";
            let table1 = document.createElement("table");
            let tr = document.createElement("tr");
            table1.appendChild(tr);
            let table2 = document.createElement("table");
            for (let i = 0; i < this.matrix1.aantalKolommen; i++) {
                if (i !== this.matrix1.matrix[0].length - 1)
                    hint += "" + this.matrix1.matrix[0][i] + " x " + this.matrix2.matrix[i][0] + " + ";
                else {
                    hint += "" + this.matrix1.matrix[0][i] + " x " + this.matrix2.matrix[i][0];
                }
                let td = document.createElement("td");
                td.innerText = this.matrix1.matrix[0][i];
                tr.appendChild(td);
                let tr2 = document.createElement("tr");
                let td2 = document.createElement("td");
                td2.innerText = this.matrix2.matrix[i][0];
                tr2.appendChild(td2);
                table2.appendChild(tr2);
            }
            div.innerText=hint;
            div.appendChild(table1);
            div.appendChild(table2);
            //this.setHint(div);
        }
        else {
            div.innerHTML = "kan je deze matrices wel vermenigvuldigen? indien niet, antwoord dan met een 1*1 matrix met waarde 0";
        }
        this.setHint(div);


    }


}

