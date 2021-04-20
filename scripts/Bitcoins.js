import Matrix from "./Matrix.js";
import {Speler} from "./Speler.js";

let tijd;
let encoder;
let decoder;
let encoded_key;

let hint_nr = 0;    // aantal keer op hintknop geklikt
let matrices = [];  // lijst vectoren die waaruit het codewoord bestaat (eerst in letters dan in cijfers)
let tijdelijk;      // tijdelijke variabele om vorige versie vector op te slaan
let n = 0;          // duidt aan welke vector nu verwerkt wordt
let uitleg_hint;    // uitleg dat per hint getoond wordt
let eind_opl = [];  // lijst letters eindoplossing
let alphabet = ['A', 'B', 'C', 'D', 'E',
    'F', 'G', 'H', 'I', 'J',
    'K', 'L', 'M', 'N', 'O',
    'P', 'Q', 'R', 'S', 'T',
    'U', 'V', 'W', 'X', 'Y',
    'Z'];

function showAlfabet_table() {//voor het gemak met innerhtml gedaan maar moet aangepast worden! kan wel op einde wanneer alles klaar is

    let inset_text = `
    <tbody>`
    let row1 = "<tr><th>letter</th>";
    let row2 = "<tr><th>nummer</th>"
    for (let i = 0; i < 26; i++) {
        row1 += `<td>${alphabet[i]}</td>`
        row2 += `<td>${i}</td>`
    }
    row1 += `</tr>`
    row2 += `</tr>`
    inset_text += row1;
    inset_text += row2;
    inset_text += `</tbody>`
    document.querySelector("#js_alfabet").innerHTML = inset_text;
}

function showData() {
    document.querySelector("#js_code").innerText = `gecodeerd wachtwoord: ${encoded_key}`
    let tabel = document.querySelector("#js_encoder");
    encoder.drawMatrix(tabel, "ENCODER");
}

function hint() {
    hint_nr++;

    // let test = (4 + matrices.length * 4);
    if (hint_nr === 1) {
        hint_init();
        hint1();
        hint_uitleg();
    } else if (hint_nr === 2) {
        hint2();
    } else if (hint_nr === 3) {
        hint3();
    } else if (hint_nr === 4) {
        hint4();

    } else if (hint_nr <= 4 + (matrices.length * 4)) {
        // let test = (hint_nr-4)%4
        if ((hint_nr - 4) % 4 === 1) {
            n++;
            if (n !== 1) {
                terug4()
            }
            hint5(n);
        } else if ((hint_nr - 4) % 4 === 2) {
            hint6(n);
        } else if ((hint_nr - 4) % 4 === 3) {
            hint7(n);
        } else if ((hint_nr - 4) % 4 === 0) {
            hint8(n);
        }
    } else if (hint_nr > 4 + (matrices.length * 4)) {
        hint9();
    }


    document.querySelector("#uitleg").innerText = uitleg_hint;
}

function hint_init() {
    let oef = document.querySelector("#js_hints");
    let titel = document.createElement('h4');       // titel maken
    titel.innerText = "Hint:";
    oef.appendChild(titel);


    for (let n = 1; n <= encoded_key.length / 3; n++) {        // tabellen maken voor vectoren
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

function hint_uitleg() {
    let oef = document.querySelector("#js_hints");
    let p = document.createElement("p");            // uitlegvak maken
    p.id = "uitleg";
    oef.appendChild(p);
}

function hint1() {
    for (let n = 1; n <= encoded_key.length / 3; n++) {
        let matrixn = new Matrix(3, 1);

        for (let i = (n - 1) * 3; i < n * 3; i++) {                // vectoren invullen met codewoord in letters
            matrixn.matrix[i - ((n - 1) * 3)][0] = encoded_key.charAt(i).toUpperCase();
        }
        matrices.push(matrixn);
        let t_matrixn = document.querySelector("#vector" + n);
        matrixn.drawMatrix(t_matrixn, t_matrixn.id);        // vectoren tekenen
    }
    uitleg_hint = "enciphered vector in letters";

    let hint_knop = document.querySelector("#hint");
    hint_knop.innerText = "Volgende Hint";
}


function hint2() {
    for (let n = 0; n < matrices.length; n++) {
        for (let i = 0; i < 3; i++) {
            matrices[n].matrix[i][0] = alphabet.indexOf(matrices[n].matrix[i][0]);  // letters in vectoren omzetten in cijfers
        }
        let t_matrixn = document.querySelector("#vector" + (n + 1));
        matrices[n].drawMatrix(t_matrixn, t_matrixn.id);
    }
    uitleg_hint = "enciphered vector in cijfers";
}

function hint3() {
    let oef = document.querySelector("#js_hints");

    for (let n = 0; n < matrices.length; n++) {                      // vectoren van scherm verwijderen
        oef.removeChild(document.querySelector(".vector"));
    }
    uitleg_hint = `Om de decoder te vinden moet de encoder %26-geinverteerd worden en elementsgewijs %26.\nDeterminant:${encoder.getDeterminant()}\nMMI van determinant:${modInverse(encoder.getDeterminant())}`
}

function hint4() {
    let oef = document.querySelector("#js_hints");
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

function hint5(n) {
    let oef = document.querySelector("#js_hints");
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


    matrices[n - 1].drawMatrix(t_matrixn, "vector" + n);          // juiste vector tekenen

    uitleg_hint = "Nu decoder maal vector" + n;
}

function hint6(n) {
    let oef = document.querySelector("#js_hints");
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
    let array = decoder.vermenigvuldigMatrix(matrices[n - 1]);      // Werkt niet ?
    opl.importMatrix(array);

    tijdelijk = opl;
    opl.drawMatrix(t_matrixn, "voor-oplossing vector" + n);     // vector met oplossing in cijfers tekenen

    uitleg_hint = "decoder maal vector" + n;
}

function hint7(n) {
    let oef = document.querySelector("#js_hints");
    document.querySelectorAll(".rm").forEach(value => oef.removeChild(value));  // vectoren en bewerkingen van scherm verwijderen


    let opl = tijdelijk.copyMatrix();
    for (let i = 0; i < 3; i++) {
        opl.matrix[i][0] %= 26;// vector met oplossing mod 26
    }

    let t_tijdelijk = document.querySelector("#matrix1-1");
    tijdelijk.drawMatrix(t_tijdelijk, "voor-oplossing vector" + n); // vector met oplossing in cijfers tekenen

    document.querySelector("#bewerking").innerText = "mod 26";  // juist bewerking tonen

    let t_opl = document.querySelector("#matrix2-1");
    opl.drawMatrix(t_opl, "oplossing in cijfers vector" + n);   // vector met oplossing in cijfers mod 26 tekenen
    tijdelijk = opl;
}

function hint8(n) {
    let opl = new Matrix(3, 1);

    for (let i = 0; i < 3; i++) {
        opl.matrix[i][0] = alphabet[tijdelijk.matrix[i][0]];        // vector met oplossing in cijfers omzetten naar letters
        eind_opl.push(alphabet[tijdelijk.matrix[i][0]]);
    }
    let t_tijdelijk = document.querySelector("#matrix1-1");
    tijdelijk.drawMatrix(t_tijdelijk, "oplossing in cijfers vector" + n);

    document.querySelector("#bewerking").innerText = "omzetten";

    let t_opl = document.querySelector("#matrix2-1");
    opl.drawMatrix(t_opl, "oplossing in letters vector" + n);
}

function terug4() {
    let oef = document.querySelector("#js_hints");
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

function hint9() {
    let oef = document.querySelector("#js_hints");
    document.querySelectorAll(".rm2").forEach(value => oef.removeChild(value));// alles wat nog overbleef van scherm verwijderen
    uitleg_hint = "";
    eind_opl.forEach(value => uitleg_hint += value);// eindoplossing tonen


    let hint_knop = document.querySelector("#hint");
    hint_knop.innerText = "Geen Hints meer, dit is letterlijk de oplossing";
    hint_knop.disabled = true;
}


//////////////////////////////////////

// Iterative Javascript program to find modular
// inverse using extended Euclid algorithm <<dkit algoritme wordt gebruikt om de mmi de berekenen

// Returns modulo inverse of a with respect
// to m using extended Euclid Algorithm
// Assumption: a and m are coprimes, i.e.,
// gcd(a, m) = 1
function modInverse(a, m = 26) {
    let m0 = m;
    let y = 0;
    let x = 1;
    if (m == 1)
        return 0;
    while (a > 1) {

        // q is quotient
        let q = parseInt(a / m);
        let t = m;

        // m is remainder now,
        // process same as
        // Euclid's algo
        m = a % m;
        a = t;
        t = y;

        // Update y and x
        y = x - q * y;
        x = t;
    }

    // Make x positive
    if (x < 0)
        x += m0;
    return x;
}


// This code is contributed by _saurabh_jaiswal
///////////////////////////////////////////////

function ShowMMI(event) {
    let input = event.target.value;
    document.querySelector("#js_output_MMI_calculator").value = modInverse(input);
}

function showTime() {
    let p = document.querySelector("#js_timer");
    let min = Math.floor(tijd / 60);
    let sec = tijd - min * 60;
    p.innerText = `${min}:${sec}`;
    tijd--;
    console.log(tijd)
    if(tijd==0){
        encoded_key = "andere";//nieuwe key kan random maar moet veelvoud van 3 letters hebben
        document.querySelector("#js_hints").innerText="";//hints leegmaken
        showData();
         hint_nr = 0;    //alles wat te maken heeft met de hints resetten
         matrices = [];
         n = 0;
         uitleg_hint="";
        eind_opl = [];
        tijd=300;
    }
}

function startTimer() {
    tijd = 10; //5 minuten
    setInterval(showTime, 1000);
    showData();
    document.querySelector("#hint").disabled = false;
}

function init() {
    console.log("hallo");
    encoder = new Matrix();
    let determinant = encoder.getDeterminant();
    while (determinant === 0 || determinant % 26 === 0) {
        encoder = new Matrix();
        determinant = encoder.getDeterminant();
    }
    encoder.importMatrix([[6, 24, 1], [13, 16, 10], [20, 17, 15]]);
    decoder = encoder.getInverse().adjunct;
    for (let i = 0; i < encoder.aantalRijen; i++) {
        for (let j = 0; j < encoder.aantalKolommen; j++) {
            decoder.matrix[i][j] *= modInverse(encoder.getDeterminant());
            decoder.matrix[i][j] %= 26;
            if (decoder.matrix[i][j] < 0) {//enkel positieve getallen bij modulo van negatief getal
                decoder.matrix[i][j] += 26;
            }
        }
    }
    document.querySelector("#js_input_MMI_calculator").addEventListener("input", ShowMMI);
    encoded_key = "pannek";//momenteel hardgecodeerd, kan random worden of iets dat een coole tekst wordt als je het decodeerd
    showAlfabet_table();    //LET OP: alleen keys kiezen die meervoud van 3 zijn
    document.querySelector("#js_timer_start").addEventListener("click", startTimer);
    //showData();
    document.getElementById("hint").addEventListener("click", hint);
    document.getElementById("mainPage").addEventListener("click", terug);//eventlistener voor exit knop
}

function terug() {
    let spelernaam = localStorage.getItem("huidige speler");
    let speler = new Speler(spelernaam);
    speler.eindTutorialOefening(localStorage.getItem("selected_button"));
    window.open("./main.html", "_self");
}


init();
