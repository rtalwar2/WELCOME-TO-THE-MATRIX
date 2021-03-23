
export default class Speler {
    naam;
    tutorials_finished;
    // in local storage:(spelers:[naam1, naam2, ...], naam1:data1, naam2:data2, ...)

    constructor(naam) {             //Voor Spelers aan te maken
        this.naam = naam;

        if (localStorage.getItem("spelers").includes(this.naam)){      //als speler al bestaat
            let myJSON = localStorage.getItem(this.naam);
            this.tutorials_finished = JSON.parse(myJSON);
        }else {
            this.tutorials_finished = new Map ([[0, false],[1, false],[2, false],[3, false],[4, false],[5, false],[6, false]]);
        }

    }

    getData(){                      //Om data speler op te halen
        return this.tutorials_finished;
    }

    eindTutorialOefening(nummer){   //na bepaalde oefening/tutorial opslaan in map ,ook naar localstorage
        this.tutorials_finished.set(nummer, true);
        this.saveData()
    }


    saveData(){                     //Om data naar local storage te sturen
        let myJSON = JSON.stringify(this.tutorials_finished);
        localStorage.setItem(this.naam, myJSON);
    }
}