import { Label } from "./label.model";
import { Language } from "./language.model";
import { Role } from "./role.model";
import { UserPreference } from "./user-preference.model";

export interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    userName: string;
    active: boolean;
    apiAccessAllowed: boolean;
    roles: Role[];
    labels: Label[];
    userPreferences: UserPreference[];
    password: string | undefined;
    departmentId: string;
    notify: boolean;
    language: Language;
    role: string;
    enabled: boolean,
    tokenExpiration: number;
  }