import {Oefeningen} from "./Oefeningen.js";
import Matrix from "../Matrix.js";


export class VermenigvuldigOefening extends Oefeningen{
    lege_matrix;
    oplossing;
    matrix2;

    constructor(m1, m2) {
        super(m1);
        this.matrix2=m2;
        this.lege_matrix= new Matrix();
        this.data = new Matrix(m1.aantalRijen, m2.aantalKolommen, "0");
        this.matrices.push(this.matrix1);
        this.matrices.push(this.matrix2);

        this.aantal_matrices=this.matrices.length;
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
$("#get").click(function(){
    console.log(getMatrix());
});


function getMatrix(){
    var matrix_row = [];

    var ind = 0;

    $("#frm").contents().each(function(i,e){
        if (this.nodeName == "INPUT")
        {
            if (!matrix_row[ind]){
                matrix_row.push([]);
            }
            matrix_row[ind].push($(this).val());
        }
        else{
            ind++;
        }
    });

    return matrix_row;
}
