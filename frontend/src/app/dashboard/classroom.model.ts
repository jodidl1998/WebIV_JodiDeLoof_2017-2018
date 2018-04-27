export class Classroom {
  private _id: string;
  private _name: string;
  private _code: string;

  constructor(name: string) {
    this._name = name;
  }

  /*
        static methode want er wordt niet eerst een object aangemaakt
    */
  static fromJSON(json: any): Classroom {
    if (json != null) {
      let classroom = new Classroom(json.name);
      //_id buiten constructor
      classroom._id = json._id;
      classroom._code = json.classroomCode;
      return classroom;
    }
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
  toJSON() {
    return {
      _id: this._id,
      name: this._name,
      classroomCode: this._code
    };
  }

  //vanaf hier enkel setters
  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get classroomCode(): string {
    return this._code;
  }

  set id(id: string) {
    this._id = id;
  }

  set name(name: string) {
    this._name = name;
  }

  set classroomCode(code: string) {
    this._code = code;
  }
}
