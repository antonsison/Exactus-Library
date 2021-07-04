import { Book } from './book.model';
import { User } from './user.model';

export class CheckedOutModel {
    id                  : string = null;
    book                : Book;
    checked_out_by      : User;
    checked_out_date    : string = null;
    returned_date       : string = null;

    constructor(data={}) {
        Object.assign(this, data);
    }
}