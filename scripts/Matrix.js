export default class Matrix {
    // constructor(aantalRijen, aantalKolommen){ een klasse mag maar 1 constructor hebben blijkaar
    //     this.aantalRijen = aantalRijen;
    //     this.aantalKolommen = aantalKolommen;
    //     this.matrix = [aantalRijen][aantalKolommen];
    // }


    constructor(aantalRijen = 3, aantalKolommen = 3,fill=false) {

        this.aantalRijen = aantalRijen;
        this.aantalKolommen = aantalKolommen;
        this.matrix = new Array(aantalRijen);
        for (let i = 0; i < aantalRijen; i++) {
            this.matrix[i] = new Array(aantalKolommen);
        }
        if (!fill) {
            for (let i = 0; i < this.aantalRijen; i++) {
                for (let j = 0; j < this.aantalKolommen; j++) {
                    this.matrix[i][j] =0 ;
                }
            }
        } else {
            for (let i = 0; i < this.aantalRijen; i++) {
                for (let j = 0; j < this.aantalKolommen; j++) {
                    this.matrix[i][j] = Math.floor(Math.random() * 10);
                }
            }
        }
    }

    vermenigvuldigMatrix(matrix_2) {
        let result = []; //dubbele array
        if (this.matrix.length === matrix_2.matrix.length) {
            for (let i = 0; i < this.matrix.length; i++) {
                result[i] = [];
                for (let j = 0; j < matrix_2.matrix.length; j++) {
                    let sum = 0;
                    for (let k = 0; k < this.matrix[0].size; k++) {
                        sum += this.matrix[i][k] * matrix_2[k][j];
                    }
                    result[i][j] = sum;
                }
            }
        }
        return result;
    }

    importMatrix(dubbele_array){
      for(let i=0;i<dubbele_array.length;i++){
          for(let j=0;j<dubbele_array[i].length;j++){
              this.matrix[i][j]=dubbele_array[i][j];
          }
      }
        return this.matrix;
    }

    drawMatrix(element) { //basis tekenfunctie, vult table aan
        let tabel = element;
        tabel.parentElement.classList.add(`col-md-${this.aantalKolommen}`);
        tabel.innerText = "";
        for (let i in this.matrix) {
            let tr = document.createElement("tr");
            for (let j in this.matrix[i]) {
                let td = document.createElement("td");
                td.innerText = this.matrix[i][j];
                td.dataset.id = `id_${i}-${j}`;
                tr.appendChild(td);
            }
            tabel.appendChild(tr);
        }

        //
        // let tbody = document.createhulpmatrixlement("tbody");
        // let table = document.createhulpmatrixlement("table").appendChild(tbody);
        // for (let i = 0; i < this.matrix.size; i++) {
        //     let tr = document.createhulpmatrixlement("tr");
        //     for (let j = 0; j < this.matrix[i].size; j++) {
        //         let td = document.createhulpmatrixlement("td");
        //         td.innerText = this.matrix[i][j];
        //         tr.appendChild(td);
        //     }
        //     tbody.appendChild(tr);
        // }
        // element.appendChild(table);
    }

    getTransponneerde() {//kan eenvoudiger
        let hulpmatrix = this.matrix;
        for (let i = 0; i < this.length; i++) {
            for (let j = 0; j < i; j++) {
                let temp = hulpmatrix[i][j];
                hulpmatrix[i][j] = hulpmatrix[j][i];
                hulpmatrix[j][i] = temp;
            }
        }
        return hulpmatrix;
    }

    getDeterminant() { //tijdelijk enkel voor 3x3 matrixen, groter gaat ander algoritme gebruiken, dit kan ook efficienter(recursief)
        /*let result = 0;
        if (this.matrix.size !== 3 || this.matrix[0].size !== 3) return false;
        else {
            result += this.matrix[0][0] * (this.matrix[1][1] * this.matrix[2][2] - this.matrix[1][2] * this.matrix[2][1]);
            result -= this.matrix[0][1] * (this.matrix[1][0] * this.matrix[2][2] - this.matrix[1][2] * this.matrix[2][0]);
            result += this.matrix[0][2] * (this.matrix[1][0] * this.matrix[2][1] - this.matrix[1][1] * this.matrix[2][0]);
            return result;
        }*/

        const subMatrix = (index) => this.matrix.slice(1).map(row => row.filter((e, colIndex) => colIndex !== index));
        const sign = (index) => index % 2 === 0 ? 1 : -1;

        if (this.matrix.length === 1) return this.matrix[0][0];
        return this.matrix[0].reduce((sum, curr, i) => sum + sign(i) * curr * this.getDeterminant(subMatrix(i)), 0);
    }

    getInverse() {
        let temp;
        let hulpmatrix = [];
        let result = this.matrix;

        for (let i = 0; i < this.matrix.length; i++)
            hulpmatrix[i] = [];

        for (let i = 0; i < this.matrix.length; i++)
            for (let j = 0; j < this.matrix.length; j++) {
                hulpmatrix[i][j] = 0;
                if (i === j)
                    hulpmatrix[i][j] = 1;
            }

        for (let k = 0; k < this.matrix.length; k++) {
            temp = result[k][k];

            for (let j = 0; j < this.matrix.length; j++) {
                result[k][j] /= temp;
                hulpmatrix[k][j] /= temp;
            }

            for (let i = k + 1; i < this.matrix.length; i++) {
                temp = result[i][k];

                for (let j = 0; j < this.matrix.length; j++) {
                    result[i][j] -= result[k][j] * temp;
                    hulpmatrix[i][j] -= hulpmatrix[k][j] * temp;
                }
            }
        }

        for (let k = this.matrix.length - 1; k > 0; k--) {
            for (let i = k - 1; i >= 0; i--) {
                temp = result[i][k];

                for (let j = 0; j < this.matrix.length; j++) {
                    result[i][j] -= result[k][j] * temp;
                    hulpmatrix[i][j] -= hulpmatrix[k][j] * temp;
                }
            }
        }

        for (let i = 0; i < this.matrix.length; i++)
            for (let j = 0; j < this.matrix.length; j++)
                result[i][j] = hulpmatrix[i][j];
        return result;
    }

    toString(){
        let output="|";
            for (let j = 0; j < this.aantalKolommen; j++) {
                output+=this.matrix[0][j];
            }
            output+="|\n";

        for (let i = 1; i < this.aantalRijen; i++) {
            output+="\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0|";
            for (let j = 0; j < this.aantalKolommen; j++) {
                output+=this.matrix[i][j];
            }
            output+="|\n";
        }
           return output.replace(/(\n$)/, "");
        //return output
    }
}
