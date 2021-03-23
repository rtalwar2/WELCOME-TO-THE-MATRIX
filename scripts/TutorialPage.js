


class TutorialPage{
    alle_beschrijvingen=new Map();

    constructor(){
        this.alle_beschrijvingen.set("TransponeerTutorial",["stap1","stap2","stap3","stap4"]);
        this.alle_beschrijvingen.set("Vermenigvuldigtutorial",["stap1","stap2","stap3","stap4"]);
        this.alle_beschrijvingen.set("InverseTutorial",["stap1","stap2","stap3","stap4"]);
        this.alle_beschrijvingen.set("DeterminantTutorial",["stap1","stap2","stap3","stap4"]);
    }
    getTutorials(){
        return this.alle_beschrijvingen.keys();
    }
}