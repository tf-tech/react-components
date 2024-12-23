import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
export interface Icons {
    faArrowLeft: IconDefinition;
    faEye: IconDefinition;
    faSearch: IconDefinition;
    faTrash: IconDefinition;
    faXmark: IconDefinition;
    faRotateRight: IconDefinition;
}
export interface Translations {
    search: string;
    search_reset: string;
    generate: string;
    id: string;
    delete: string;
    abort: string;
    edit: string;
}
export interface Configuration {
    iconSet: Icons;
    translations: Translations;
}
export declare function buildIconsFromIconSet(iconSet: Icons): Icons;
