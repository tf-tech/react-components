import {IconDefinition} from "@fortawesome/fontawesome-svg-core";

export interface Icons {
    faArrowLeft: IconDefinition
    faEye: IconDefinition
    faSearch: IconDefinition
    faTrash: IconDefinition
    faXmark: IconDefinition
}

export interface Configuration {
    iconSet: Icons
}

export function buildIconsFromIconSet(iconSet: Icons): Icons {
    return {
        faArrowLeft: iconSet.faArrowLeft,
        faEye: iconSet.faEye,
        faSearch: iconSet.faSearch,
        faTrash: iconSet.faTrash,
        faXmark: iconSet.faXmark,
    }
}