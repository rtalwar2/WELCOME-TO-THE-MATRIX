export class Speler {
    naam;
    tutorials_finished;

    // in local storage:(naam1:data1, naam2:data2, ...)

    constructor(naam) {             //Om Spelers aan te maken
        this.naam = naam;

        if (localStorage.getItem(this.naam) === null){          //als speler niet bestaat
            this.tutorials_finished = new Map(
                [["VermenigvuldigTutorial", false],
                    ["TransponeerTutorial", false],
                    ["InverseTutorial", false],
                    ["DeterminantTutorial", false],
                    ["DeterminantOefening", false],
                    ["InverseOefening", false],
                    ["VermenigvuldigOefening", false]]);
            this.saveData();
        }else {                                                 //als speler wel bestaat
            let myJSON = localStorage.getItem(this.naam);
            this.tutorials_finished = JSON.parse(myJSON);
        }

        localStorage.setItem("huidige speler", this.naam);
    }

    getData() {                      //Om data speler op te halen
        return this.tutorials_finished;
    }

    eindTutorialOefening(naamTutOef) {   //na bepaalde oefening/tutorial opslaan in map ,ook naar localstorage
        this.tutorials_finished[naamTutOef] = true;
        this.saveData();
    }

    saveData() {                     //Om data naar local storage te sturen
        let myJSON = JSON.stringify(this.tutorials_finished);
        localStorage.setItem(this.naam, myJSON);
    }
}
