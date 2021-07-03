import { NavContent } from "src/app/commons/utils/layout.utils";
import { LoginRequired } from "src/app/commons/utils/security.utils";
import { BorrowedBooksComponent } from "./borrowed-books/borrowed-books.component";
import { OwnedBooksComponent } from "./owned-books/owned-books.component";

export const BOOK_STATES: Object[] = [
    {
        name : 'borrowed-books',
        url  : '/borrowed-books/',
        views:  NavContent(BorrowedBooksComponent),
        //onEnter: LoginRequired
    },
    {
        name : 'owned-books',
        url  : '/owned-books/',
        views:  NavContent(OwnedBooksComponent),
        //onEnter: LoginRequired
    },
]