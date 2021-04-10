export default class Matrix {
    // constructor(aantalRijen, aantalKolommen){ een klasse mag maar 1 constructor hebben blijkaar
    //     this.aantalRijen = aantalRijen;
    //     this.aantalKolommen = aantalKolommen;
    //     this.matrix = [aantalRijen][aantalKolommen];
    // }


    constructor(aantalRijen = 3, aantalKolommen = 3, fill = false) {
        this.aantalRijen = aantalRijen;
        this.aantalKolommen = aantalKolommen;
        this.matrix = new Array(aantalRijen);
        for (let i = 0; i < aantalRijen; i++) {
            this.matrix[i] = new Array(aantalKolommen);
        }
        if (!fill) {
            for (let i = 0; i < this.aantalRijen; i++) {
                for (let j = 0; j < this.aantalKolommen; j++) {
                    this.matrix[i][j] = 0;
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

    vermenigvuldigMatrix(matrix_2) { // moet nog een check bijkomen
        let result = []; //dubbele array
        if (this.aantalKolommen === matrix_2.aantalRijen) {
            for (let i = 0; i < this.matrix.length; i++) {
                result[i] = [];
                for (let j = 0; j < matrix_2.matrix.length; j++) {
                    let sum = 0;
                    for (let k = 0; k < this.matrix[0].length; k++) {
                        sum += this.matrix[i][k] * matrix_2.matrix[k][j];
                    }
                    result[i][j] = sum;
                }
            }
        }
        return result;
    }

    importMatrix(dubbele_array) {
        for (let i = 0; i < dubbele_array.length; i++) {
            for (let j = 0; j < dubbele_array[i].length; j++) {
                this.matrix[i][j] = dubbele_array[i][j];
            }
        }
        return this.matrix;
    }

    drawMatrix(element) { //basis tekenfunctie, vult table aan
        let tabel = element;
        tabel.parentElement.classname = "";
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

    // Function to get cofactor of
    // mat[p][q] in temp[][]. n is
    // current dimension of mat[][]
    getCofactor(mat, p, q, n) {
        let i = 0, j = 0;
        let temp = new Array(n);
        for (let i = 0; i < n; i++) {
            temp[i] = new Array(n);
        }
        // Looping for each element of
        // the matrix
        for (let row = 0; row < n; row++) {
            for (let col = 0; col < n; col++) {
                // Copying into temporary matrix
                // only those element which are
                // not in given row and column
                if (row != p && col != q) {
                    temp[i][j++] = mat[row][col];
                    // Row is filled, so increase
                    // row index and reset col
                    // index
                    if (j == n - 1) {
                        j = 0;
                        i++;
                    }
                }
            }
        }
        return temp;
    }

    getDeterminant(mat = this.matrix, n = this.aantalRijen) { //tijdelijk enkel voor 3x3 matrixen, groter gaat ander algoritme gebruiken, dit kan ook efficienter(recursief)
        let D = 0; // Initialize result
        // Base case : if matrix contains single
        // element
        if (n == 1)
            return mat[0][0];

        // To store cofactors
        let temp ;

        // To store sign multiplier
        let sign = 1;

        // Iterate for each element of first row
        for (let f = 0; f < n; f++) {
            // Getting Cofactor of mat[0][f]
            temp=this.getCofactor(mat, 0, f, n);
            let element=mat[0][f];
            D += sign * element * this.getDeterminant(temp, n - 1);
            // terms are to be added with
            // alternate sign
            sign = -sign;
        }
        return D;
    }



getInverse()
{
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

toString()
{
    let output = "|";
    for (let j = 0; j < this.aantalKolommen; j++) {
        output += this.matrix[0][j];
    }
    output += "|\n";

    for (let i = 1; i < this.aantalRijen; i++) {
        output += "\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0|";
        for (let j = 0; j < this.aantalKolommen; j++) {
            output += this.matrix[i][j];
        }
        output += "|\n";
    }
    return output.replace(/(\n$)/, "");
    //return output
}
}
