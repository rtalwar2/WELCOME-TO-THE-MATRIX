import Matrix from "./Matrix.js";

let encoder;
let decoder;
let encoded_key;
let hint_nr = 0;    // aantal keer op hintknop geklikt
let matrices = [];  // lijst vectoren die waaruit het codewoord bestaat (eerst in letters dan in cijfers)
let tijdelijk;      // tijdelijke variabele om vorige versie vector op te slaan
let n = 0;          // duidt aan welke vector nu verwerkt wordt
let uitleg_hint;    // uitleg dat per hint getoond wordt
let eind_opl = [];  // lijst letters eindoplossing
let alphabet = [ 'A', 'B', 'C', 'D', 'E',
    'F', 'G', 'H', 'I', 'J',
    'K', 'L', 'M', 'N', 'O',
    'P', 'Q', 'R', 'S', 'T',
    'U', 'V', 'W', 'X', 'Y',
    'Z' ];
function showAlfabet_table(){//voor het gemak met innerhtml gedaan maar moet aangepast worden! kan wel op einde wanneer alles klaar is

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

function hint(){
    hint_nr++;
    // let test = (4 + matrices.length * 4);
    if (hint_nr === 1){
        hint_init();
        hint1();
        hint_uitleg();
    }else if (hint_nr === 2){
        hint2();
    }else if (hint_nr === 3){
        hint3();
    }else if (hint_nr === 4){
        hint4();
    }else if (hint_nr <= 4 + (matrices.length*4)){
        // let test = (hint_nr-4)%4
        if ((hint_nr-4)%4 ===  1){
            n++;
            if (n !== 1){terug4()}
            hint5(n);
        }else if ((hint_nr-4)%4 ===  2){
            hint6(n);
        }else if ((hint_nr-4)%4 ===  3){
            hint7(n);
        }else if ((hint_nr-4)%4 ===  0){
            hint8(n);
        }
    }else if (hint_nr > 4 + (matrices.length*4)){
        hint9();
    }


    document.querySelector("#uitleg").innerText = uitleg_hint;
}

function hint_init(){
    let oef = document.querySelector("#oefening");
    let titel = document.createElement('h4');       // titel maken
    titel.innerText = "Hint:";
    oef.appendChild(titel);

    for (let n = 1; n <= encoded_key.length/3; n++){        // tabellen maken voor vectoren
        let div = document.createElement("div");
        div.className = "col-md-1";
        div.classList.add("vector");
        oef.appendChild(div);

        let t_matrixn = document.createElement("table");
        t_matrixn.className = "table";
        t_matrixn.id = "vector" + n;
        div.appendChild(t_matrixn);
    }
}

function hint_uitleg(){
    let oef = document.querySelector("#oefening");
    let p = document.createElement("p");            // uitlegvak maken
    p.id = "uitleg";
    oef.appendChild(p);
}

function hint1(){
    for (let n = 1; n <= encoded_key.length/3; n++){
        let matrixn = new Matrix(3, 1);
        for (let i = (n-1)*3; i < n*3; i++){                // vectoren invullen met codewoord in letters
            matrixn.matrix[i-((n-1)*3)][0] = encoded_key.charAt(i).toUpperCase();
        }
        matrices.push(matrixn);
        let t_matrixn = document.querySelector("#vector" + n);
        matrixn.drawMatrix(t_matrixn, t_matrixn.id);        // vectoren tekenen
    }
    uitleg_hint = "enciphered vector in letters";

    let hint_knop = document.querySelector("#hint");
    hint_knop.innerText = "Volgende Hint";
}

function hint2(){
    for (let n = 0; n < matrices.length; n++){
        for (let i = 0; i < 3; i++){
            matrices[n].matrix[i][0] = alphabet.indexOf(matrices[n].matrix[i][0]);  // letters in vectoren omzetten in cijfers
        }
        let t_matrixn = document.querySelector("#vector" + (n+1));
        matrices[n].drawMatrix(t_matrixn, t_matrixn.id);
    }
    uitleg_hint = "enciphered vector in cijfers";
}

function hint3(){
    let oef = document.querySelector("#oefening");
    for (let n = 0; n < matrices.length; n++){                      // vectoren van scherm verwijderen
        oef.removeChild(document.querySelector(".vector"));
    }
    uitleg_hint = "Om de decoder te vinden moet de encoder geinverteerd worden en elementsgewijs %26"
}

function hint4(){
    let oef = document.querySelector("#oefening");
    let div = document.createElement("div");                // tabel maken voor decoder matrix
    div.className = "col-md-3";
    div.classList.add("rm");
    oef.appendChild(div);

    let t_matrix = document.createElement("table");
    t_matrix.className = "table";
    div.appendChild(t_matrix);

    decoder.drawMatrix(t_matrix, "DECODER");                    // decoder tekenen

    uitleg_hint = "Dit is de inverse van de encoder:"
}

function hint5(n){
    let oef = document.querySelector("#oefening");
    let p = document.createElement("p");                    // p element maken om bewerking te tonen
    p.className = "rm";
    p.innerText = "*";
    oef.appendChild(p);

    let div = document.createElement("div");                // tabel maken voor vector
    div.className = "col-md-1";
    // div.classList.add("rm");
    oef.appendChild(div);

    let t_matrixn = document.createElement("table");
    t_matrixn.className = "table";
    div.classList.add("rm2");
    t_matrixn.id = "matrix1-1";
    div.appendChild(t_matrixn);

    matrices[n-1].drawMatrix(t_matrixn, "vector" + n);          // juiste vector tekenen

    uitleg_hint = "Nu decoder maal vector" + n;
}

function hint6(n){
    let oef = document.querySelector("#oefening");
    let p = document.createElement("p");                       // p element maken om bewerking te tonen
    // p.className = "rm";
    p.id = "bewerking";
    p.classList.add("rm2");
    p.innerText = "=";
    oef.appendChild(p);

    let div = document.createElement("div");                // tabel maken voor tweede vector, vector met oplossing in cijfers
    div.className = "col-md-1";
    div.classList.add("rm2");
    oef.appendChild(div);

    let t_matrixn = document.createElement("table");
    t_matrixn.className = "table";
    t_matrixn.id = "matrix2-1";
    div.appendChild(t_matrixn);

    let opl = new Matrix(3, 1);
    let array = decoder.vermenigvuldigMatrix(matrices[n-1]);      // Werkt niet ?
    opl.importMatrix(array);

    tijdelijk = opl;
    opl.drawMatrix(t_matrixn, "voor-oplossing vector" + n);     // vector met oplossing in cijfers tekenen

    uitleg_hint = "decoder maal vector" + n;
}

function hint7(n){
    let oef = document.querySelector("#oefening");
    document.querySelectorAll(".rm").forEach(value => oef.removeChild(value));  // vectoren en bewerkingen van scherm verwijderen

    let opl = new Matrix(3, 1);
    for (let i = 0; i < 3; i++){                                       // vector met oplossing mod 26
        let t = opl.matrix[i][0];
        opl.matrix[i][0] = t%26;
    }

    let t_tijdelijk = document.querySelector("#matrix1-1");
    tijdelijk.drawMatrix(t_tijdelijk, "voor-oplossing vector" + n); // vector met oplossing in cijfers tekenen

    document.querySelector("#bewerking").innerText = "mod 26";  // juist bewerking tonen

    let t_opl = document.querySelector("#matrix2-1");
    opl.drawMatrix(t_opl, "oplossing in cijfers vector" + n);   // vector met oplossing in cijfers mod 26 tekenen
    tijdelijk = opl;
}

function hint8(n){
    let opl = new Matrix(3, 1);
    for (let i = 0; i < 3; i++){
        opl.matrix[i][0] = alphabet[tijdelijk.matrix[i][0]];        // vector met oplossing in cijfers omzetten naar letters
        eind_opl.push(alphabet[tijdelijk.matrix[i][0]]);
    }
    let t_tijdelijk = document.querySelector("#matrix1-1");
    tijdelijk.drawMatrix(t_tijdelijk, "oplossing in cijfers vector" + n);

    document.querySelector("#bewerking").innerText = "omzetten";

    let t_opl = document.querySelector("#matrix2-1");
    opl.drawMatrix(t_opl, "oplossing in letters vector" + n);
}

function terug4(){
    let oef = document.querySelector("#oefening");
    document.querySelectorAll(".rm2").forEach(value => oef.removeChild(value)); // dingen van scherm verwijderen om terug gelijk na hint4 te zijn

    let div = document.createElement("div");        // tabel voor decoder maken
    div.className = "col-md-3";
    div.classList.add("rm");
    oef.appendChild(div);

    let t_matrix = document.createElement("table");
    t_matrix.className = "table";
    div.appendChild(t_matrix);

    decoder.drawMatrix(t_matrix, "DECODER");        // decoder tekenen

}

function hint9(){
    let oef = document.querySelector("#oefening");
    document.querySelectorAll(".rm2").forEach(value => oef.removeChild(value)); // alles wat nog overbleef van scherm verwijderen
    uitleg_hint = eind_opl;                                         // eindoplossing tonen

    let hint_knop = document.querySelector("#hint");
    hint_knop.innerText = "Geen Hints meer, dit is letterlijk de oplossing";

}

function init(){
    console.log("hallo");
    encoder=new Matrix();
    let determinant=encoder.getDeterminant();
    while(determinant===0||determinant%26===0){
        encoder=new Matrix();
        determinant=encoder.getDeterminant();
    }
    decoder=encoder.getInverse().adjunct;
    for(let i=0;i<encoder.aantalRijen;i++){
        for(let j=0;j<encoder.aantalKolommen;j++){
            decoder.matrix[i][j]+=`/${encoder.getDeterminant()}`;
        }
    }
    encoded_key="pindakaas";//momenteel hardgecodeerd, kan random worden of iets dat een coole tekst wordt als je het decodeerd
    showAlfabet_table();    //LET OP: alleen keys kiezen die meervoud van 3 zijn
    showData();
    document.getElementById("hint").addEventListener("click", hint);
}

init();
