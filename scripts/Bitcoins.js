import Matrix from "./Matrix.js";

let encoder;
let decoder;
let encoded_key;
function showAlfabet_table(){//voor het gemak met innerhtml gedaan maar moet aangepast worden! kan wel op einde wanneer alles klaar is
    let alphabet = [ 'A', 'B', 'C', 'D', 'E',
        'F', 'G', 'H', 'I', 'J',
        'K', 'L', 'M', 'N', 'O',
        'P', 'Q', 'R', 'S', 'T',
        'U', 'V', 'W', 'X', 'Y',
        'Z' ];
    let inset_text=`
    <tbody>`
    let row1="<tr><th>letter</th>";
    let row2="<tr><th>nummer</th>"
        for(let i=0;i<26;i++){
            row1+=`<td>${alphabet[i]}</td>`
            row2+=`<td>${i}</td>`
        }
    row1+=`</tr>`
    row2+=`</tr>`
        inset_text+=row1;
        inset_text+=row2;
        inset_text+=`</tbody>`
    document.querySelector("#js_alfabet").innerHTML=inset_text;
}

function showData(){
    document.querySelector("#js_code").innerText=`gecodeerd wachtwoord: ${encoded_key}`
    let tabel=document.querySelector("#js_encoder");
    encoder.drawMatrix(tabel,"ENCODER");
}


function init(){
    console.log("hallo");
    encoder=new Matrix();
    let determinant=encoder.getDeterminant();
    while(determinant==0||determinant%26==0){
        encoder=new Matrix();
        determinant=encoder.getDeterminant();
    }
    decoder=encoder.getInverse().inverse;
    encoded_key="pindakaas";//momenteel hardgecodeerd, kan random worden of iets dat een coole tekst wordt als je het decodeerd
    showAlfabet_table();
    showData();
}

init();
