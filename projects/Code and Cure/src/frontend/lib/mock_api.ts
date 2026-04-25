//backend contract

export type Role = "patient" | "doctor";

export interface User {
    id: string;
    name: string;
    role: Role;
}

export interface Doctor {
    id: string;
    name: string;
    specialty: string;
    lat: number;
    lng: number;
}

export interface Appointment {
    id: string;
    doctorId: string;
}