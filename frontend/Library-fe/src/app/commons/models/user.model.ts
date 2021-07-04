export class User {
    id            : string = null;
    email         : string = null;
    first_name    : string = null;
    last_name     : string = null;
    full_name     : string = null;
    avatar         : any = null;
    date_joined  : string = null;
    date_updated : string = null;

    constructor(data={}) {
      Object.assign(this, data);
    }
}


export class ShortUser {
    id          : string = null;
    email       : string = null;
    first_name  : string = null;
    last_name   : string = null;
    full_name   : string = null;
    avatar       : string = null;
}