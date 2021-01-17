export interface User {
    email: string;
    password?: string;
    passwordConfirm?: string;
    id?: number;
    isValidated?: boolean;
    onlyActiveProjects?: boolean;
}
