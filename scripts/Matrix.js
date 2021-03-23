export default class Matrix{
    constructor(aantalRijen, aantalKolommen){
        this.aantalRijen = aantalRijen;
        this.aantalKolommen = aantalKolommen;
        this.matrix = [aantalRijen][aantalKolommen];
    }
}
