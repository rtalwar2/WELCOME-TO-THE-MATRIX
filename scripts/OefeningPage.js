export class OefeningPage{
    static alle_oefeningen=["InverseOefeningen","vermenigvuldigingOefeningen","DeterminantOefeningen"];

    constructor(){
    }
    getTutorials(){
        return this.alle_beschrijvingen.keys();
    }
}
