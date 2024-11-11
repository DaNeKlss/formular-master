/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormArray, FormControl, FormGroup } from "@angular/forms";

export type FormControlMap<T> = {
	[P in keyof T]: FormControl<T[P]>;
};

export type FormBy<Type = object> = FormGroup<{
	[Property in keyof Type]: Type[Property] extends any[]
		? Type[Property] extends (infer ArrayType)[]
			? ArrayType extends Record<string, any>
				? FormArray<FormBy<ArrayType>> // Pokud je prvek pole, vytvoříme pole formulářů pro každý prvek
				: FormControl<ArrayType> // Pokud jsou prvky pole jednoduchého typu, použijeme formControl pro každý prvek
			: never // Pokud se jedná o jiný typ pole, označíme jako "never"
		: Type[Property] extends Record<string, any>
			? FormBy<Type[Property]> // Pokud je prvek objekt, rekurzivně zavoláme FormBy pro tento objekt
			: FormControl<Type[Property]>; // Pokud není prvek pole ani objekt, použijeme formControl
}>;

export interface SelectOption {
	label: string;
	value: string | boolean;
	disabled?: boolean;
}

export type ListOptions = Record<string, string>;
