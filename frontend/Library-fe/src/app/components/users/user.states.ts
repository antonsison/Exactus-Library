import { ContentOnly, NavContent } from "src/app/commons/utils/layout.utils";
import { LoginComponent } from "./login/login.component";
import { Disconnect, LoginRequired } from "src/app/commons/utils/security.utils";
import { RegisterComponent } from "./register/register.component";
import { SettingsComponent } from "./settings/settings.component"

export const USER_STATES: Object[] = [
    {
        name: 'login',
        url : '/login/',
        views: ContentOnly(LoginComponent),
        params: { next: window.location.pathname }
    },
    {
        name    : 'logout',
        url     : '/logout/',
        onEnter : Disconnect
    },
    {
        name    : 'register',
        url     : '/register/',
        views: ContentOnly(RegisterComponent),
        params: { next: window.location.pathname }
    },
    {
        name : 'settings',
        url  : '/settings/',
        views:  NavContent(SettingsComponent),
        //onEnter: LoginRequired
    },
];