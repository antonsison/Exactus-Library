export class Register {
    email    : string = null;
    first_name    : string = null;
    last_name    : string = null;
    password : string = null;
    confirm_password : string = null;

    constructor (data={}) {
      Object.assign(this, data);
    }
  }