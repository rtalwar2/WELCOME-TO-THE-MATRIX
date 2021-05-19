

export class Oefeningen {
    matrix1;
    aantal_matrices;
    oplossing;
    matrices = [];


    constructor(m1) {
        if (this.constructor === Oefeningen) {
            throw new Error("Abstract classes can't be instantiated.");
        }
        this.matrix1=m1;
    }

    maakInvul(){
        throw new Error("maakInvul needs to be implemented.");
    }

    checkOplossing(){
        throw new Error("checkOplossing needs to be implemented.");
    }

    setHint(tekst){
        //vul de hintknop correct in
        $('[data-toggle="popover"]').attr('data-content',tekst.innerHTML);
        //let content = document.getElementById('popovercontent');
        //content.appendChild(tekst);
    }
}
