import {IconDefinition} from "@fortawesome/fontawesome-svg-core";

export interface Icons {
    faArrowLeft: IconDefinition
    faEye: IconDefinition
    faSearch: IconDefinition
    faTrash: IconDefinition
    faXmark: IconDefinition,
    faRotateRight: IconDefinition
}

export interface Translations {
    search: string
    search_reset: string
    generate: string
    id: string
    delete: string
    abort: string
    edit: string
}

export interface Configuration {
    iconSet: Icons,
    translations: Translations
}

export function buildIconsFromIconSet(iconSet: Icons): Icons {
    return {
        faArrowLeft: iconSet.faArrowLeft,
        faEye: iconSet.faEye,
        faSearch: iconSet.faSearch,
        faTrash: iconSet.faTrash,
        faXmark: iconSet.faXmark,
        faRotateRight: iconSet.faRotateRight,
    }
}