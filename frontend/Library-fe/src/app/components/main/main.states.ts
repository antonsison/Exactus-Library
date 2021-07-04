import { NavContent } from "src/app/commons/utils/layout.utils";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { LoginRequired } from "src/app/commons/utils/security.utils";


export const MAIN_STATES: Object[] = [
    {
        name : 'dashboard',
        url  : '/dashboard/',
        views:  NavContent(DashboardComponent),
        onEnter: LoginRequired
    },
]