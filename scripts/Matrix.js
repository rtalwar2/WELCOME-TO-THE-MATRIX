export default class Matrix {
    aantalRijen;
    aantalKolommen;
    matrix;

    constructor(aantalRijen = 3, aantalKolommen = 3, fill = null) {
        this.aantalRijen = aantalRijen;
        this.aantalKolommen = aantalKolommen;
        this.matrix = new Array(aantalRijen);
        for (let i = 0; i < aantalRijen; i++) {
            this.matrix[i] = new Array(aantalKolommen);
        }
        if (fill != null) {
            for (let i = 0; i < this.aantalRijen; i++) {
                for (let j = 0; j < this.aantalKolommen; j++) {
                    this.matrix[i][j] = fill;
                }
            }
        } else {
            for (let i = 0; i < this.aantalRijen; i++) {
                for (let j = 0; j < this.aantalKolommen; j++) {
                    this.matrix[i][j] = Math.floor(Math.random() * 10) - 4;
                }
            }
        }

    }

    copyMatrix() {
        let copy = new Matrix(this.aantalRijen, this.aantalKolommen);
        for (let i = 0; i < this.aantalRijen; i++){
            for (let j = 0; j < this.aantalKolommen; j++){
                copy.matrix[i][j] = this.matrix[i][j];
            }
        }
        return copy;
    }

    vermenigvuldigMatrix(matrix_2) { // moet nog een check bijkomen
        let result = []; //dubbele array
        if (this.aantalKolommen === matrix_2.aantalRijen) {
            for (let i = 0; i < this.aantalRijen; i++) {
                result[i] = [];
                for (let j = 0; j < matrix_2.aantalKolommen; j++) {
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

    drawMatrix(element, hoofd = null) { //basis tekenfunctie, vult table aan
        let tabel = element;
        tabel.parentElement.classname = "";
        tabel.parentElement.classList.add(`col-md-${this.aantalKolommen*2}`);
        tabel.innerText = "";
        if (hoofd != null) {
            let tr = document.createElement("tr");

            let th = document.createElement("th");
            th.colSpan = this.aantalKolommen;
            th.innerText = hoofd;
            tr.appendChild(th);
            tabel.appendChild(tr);
        }
        
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

    getTransponneerde() {
        let hulpmatrix = new Matrix(this.aantalRijen, this.aantalKolommen, "x");
        for (let i = 0; i < this.aantalRijen; i++) {
            for (let j = 0; j < this.aantalKolommen; j++) {
                hulpmatrix.matrix[i][j] = this.matrix[j][i];
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
        let temp;

        // To store sign multiplier
        let sign = 1; //meegegeven aan constructor zodat je bij determinantoefening snel een verkeersde oplossing kan bedenken toch niet

        // Iterate for each element of first row
        for (let f = 0; f < n; f++) {
            // Getting Cofactor of mat[0][f]
            temp = this.getCofactor(mat, 0, f, n);
            let element = mat[0][f];
            D += sign * element * this.getDeterminant(temp, n - 1);
            // terms are to be added with
            // alternate sign
            sign = -sign;
        }
        return D;
    }

// Function to get adjunct of A[N][N] in adj[N][N].
    adjunct(A = this.matrix, n = this.aantalRijen) {
        let adj = new Matrix(n,n);
        if (n == 1) {
            adj.matrix[0][0] = 1;
            return adj;
        }
// temp is used to store cofactors of A[][]
        let sign = 1;
        let temp;
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                // Get cofactor of A[i][j]
                temp = this.getCofactor(A, i, j, n);

                // sign of adj[j][i] positive if sum of row
                // and column indexes is even.
                sign = ((i + j) % 2 == 0) ? 1 : -1;

                // Interchanging rows and columns to get the
                // transpose of the cofactor matrix
                adj.matrix[j][i] = (sign) * (this.getDeterminant(temp, n - 1));
            }
        }
        return adj;
    }

// Function to calculate and store inverse, returns false if
// matrix is singular
    getInverse(A = this.matrix, n=this.aantalRijen) {
        // Find determinant of A[][]
        let det = this.getDeterminant();
        if (det == 0) {
            console.log("Singular matrix, can't find its inverse");
            return false;
        }

// Find adjunct
        let adj;
        adj = this.adjunct();

        let inverse = new Matrix(n,n);
// Find Inverse using formula "inverse(A) = adj(A)/det(A)"
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                inverse.matrix[i][j] = adj.matrix[i][j] / det;
            }
        }
        return {determinant:det,adjunct:adj,inverse:inverse};
    }

    toString() {
        // let output = "|";
        // for (let j = 0; j < this.aantalKolommen; j++) {
        //     output += this.matrix[0][j];
        // }
        // output += "|\n";
        //
        // for (let i = 1; i < this.aantalRijen; i++) {
        //     output += "\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0|";
        //     for (let j = 0; j < this.aantalKolommen; j++) {
        //         output += this.matrix[i][j];
        //     }
        //     output += "|\n";
        // }
        // return output.replace(/(\n$)/, "");
        let output = `<table class="inline"><tbody>`;
        for (let i in this.matrix) {
            output += `<tr>`
            for (let j in this.matrix[i]) {

                output += `<td>${this.matrix[i][j]}</td>`
            }
            output += `</tr>`
        }
        output += `</tbody></table>`
        return output
    }


}
