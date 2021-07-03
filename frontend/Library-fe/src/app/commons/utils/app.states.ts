import { USER_STATES } from "../../components/users/user.states";
import { MAIN_STATES } from "../../components/main/main.states";
import { BOOK_STATES } from "../../components/books/book.states";

export const APP_STATES = {
    otherwise : '/login/',
    states    : [].concat(
        MAIN_STATES,
        USER_STATES,
        BOOK_STATES,
    )
}