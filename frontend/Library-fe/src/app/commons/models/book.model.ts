import { User } from './user.model'
import { Author } from './author.model'

export class Book {
    id             : string = null;
    title          : string = null;
    status         : string = null;
    category       : string = null;
    author         : Author;
    owner          : User;
    date_created   : string = null;

    constructor(data={}) {
      Object.assign(this, data);
    }
}
