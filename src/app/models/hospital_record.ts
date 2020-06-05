import { HospitalRegistration } from './hospital_registration';

export class HospitalRecord {
    id: number;
    pandemicType: string;
    floor: string;
    section: string;
    room: string;
    itemId: string;
    itemName: string;
    itemType: string;
    itemCount: number;
    availableCount: number;
    isAvailable: boolean;
    availableFrom: string;
    availableTill: string;
    note: string;
    notifyWhenUserSubscribe: boolean;
    hospitalRegistration: HospitalRegistration;
}
