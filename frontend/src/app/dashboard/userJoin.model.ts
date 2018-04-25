export class UserJoin{
    private _username: string;
    private _code: string;

    constructor(name: string, code:string) {
        this._username = name;
        this._code = code;
    }

    /*
        static methode want er wordt niet eerst een object aangemaakt
    */
    static fromJSON(json: any): UserJoin
    {
        let classroom = new UserJoin(json._username, json._classroomId);
        //_id buiten constructor
        classroom._code = json.classroomCode;
        return classroom;
    }

    makeCode() {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      
        for (var i = 0; i < 8; i++)
          text += possible.charAt(Math.floor(Math.random() * possible.length));
      
        this._code = text;
      }

    /*
        niet static want er moet .verplicht. een object aangemaakt worden met ingevulde attributen
    */
    toJSON(){
        return {
            username: this._username,
            classroomId: this._code
        }
    }

    //vanaf hier enkel setters
   

    get username():string
    {
        return this._username;
    }

    get classroomId():string
    {
        return this._code;
    }
}