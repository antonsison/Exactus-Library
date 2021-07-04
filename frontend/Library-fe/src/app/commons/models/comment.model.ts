export class CommentModel {
    message : string = null;
    user: string = null;
    book_id: string = null;

    constructor(data={}) {
        Object.assign(this, data);
    }
}