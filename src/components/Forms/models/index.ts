export enum FormTypes {
	login = 'login',
	registration = 'registration',
};

export type ValidationAuthParams = {
	email: string;
	password: string;
}

export type ValidationRegParams = {
	email: string;
	password: string;
}

export type InputType = 'password' | 'text' | 'email';