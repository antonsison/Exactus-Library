export class Login {
    email    : string = '';
    password : string = '';

    constructor (data={}) {
      Object.assign(this, data);
    }
  }