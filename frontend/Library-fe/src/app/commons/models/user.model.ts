export class User {
    id            : string = null;
    email         : string = null;
    first_name    : string = null;
    last_name     : string = null;
    full_name     : string = null;
    has_usable_pass : boolean = null;
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
    username    : string = null;
    firstname  : string = null;
    full_name   : string = null;
    lastname   : string = null;
    avatar       : string = null;
}