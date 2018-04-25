export class Deadline{
    private _id: string;
    private _date: string;
    private _vak: string;
    private _beschrijving: string;
    private _procent: string;
    private _classroom: string;

    constructor(date: string,vak:string, beschrijving: string, procent: string) {
        this._date = date;
        this._vak = vak;
        this._beschrijving = beschrijving;
        this._procent = procent;
    }

    /*
        static methode want er wordt niet eerst een object aangemaakt
    */
    static fromJSON(json: any): Deadline
    {
        let deadline = new Deadline(json.date,json.vak, json.beschrijving, json.procent);
        //_id buiten constructor
        deadline._id = json._id;
        deadline.classroom = json.classroom;
        return deadline;
    }

    /*
        niet static want er moet .verplicht. een object aangemaakt worden met ingevulde attributen
    */
    toJSON(){
        return {
            _id: this._id,
            date: this._date,
            vak: this._vak,
            beschrijving: this._beschrijving,
            procent: this._procent,
            classroom: this._classroom
        }
    }

    
    //vanaf hier enkel setters

    get id():string
    {
        return this._id;
    }

    get vak():string
    {
        return this._vak;
    }

    get date(){
        return this._date;
    } 

    get beschrijving():string
    {
        return this._beschrijving;
    }

    get procent():string
    {
        return this._procent;
    }

    get classroom():string
    {
        return this._classroom;
    }

    set classroom(id:string){
        this._classroom = id;
    }
}