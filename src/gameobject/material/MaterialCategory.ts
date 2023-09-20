import {ContractorType} from "../contractor/ContractorType.js";

export enum MaterialCategory {
    CONSTRUCTION = 'CONSTRUCTION',
    ELECTRICAL = 'ELECTRICAL ',
    PLUMBING = 'PLUMBING',
    LANDSCAPING = 'LANDSCAPING',
    HVAC = 'HVAC',
}

export function stringToEnumMaterialCategory(material: string): MaterialCategory {
    switch (material) {
        case 'CONSTRUCTION': {
            return MaterialCategory.CONSTRUCTION;
        }
        case 'ELECTRICAL': {
            return MaterialCategory.ELECTRICAL;
        }
        case 'PLUMBING': {
            return MaterialCategory.PLUMBING;
        }
        case 'LANDSCAPING': {
            return MaterialCategory.LANDSCAPING;
        }
        case 'HVAC': {
            return MaterialCategory.HVAC;
        }
    }
}