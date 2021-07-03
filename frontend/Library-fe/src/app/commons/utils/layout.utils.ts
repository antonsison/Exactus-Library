import { NavigationComponent } from "../../components/main/navigation/navigation.component";
import { FooterComponent } from "../../components/main/footer/footer.component";


export function ContentOnly(content) {
    return { content: content };
}

export function NavContent(content) {
    return {
        navigation: NavigationComponent,
        content: content,
        footer: FooterComponent
    }
}