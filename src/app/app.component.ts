import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from "@angular/forms";
import { MyFormGroup, TableData } from "./types/form";
import { FormBy } from "./types/form.type";

type Form = FormBy<MyFormGroup>;

@Component({
	selector: "app-root",
	templateUrl: "./app.component.html",
	styleUrls: ["./app.component.css"],
	standalone: true,
	imports: [CommonModule, ReactiveFormsModule],
})
export class AppComponent {
	public title = "Moje Aplikace";
	public myForm: Form;
	public tableData: TableData[] = [];

	constructor(private readonly fb: FormBuilder) {
		this.myForm = new FormGroup({
			name: new FormControl("", { nonNullable: true, validators: [Validators.required] }),
			surname: new FormControl("", { nonNullable: true, validators: [Validators.required] }),
		});
		console.log(this.myForm);

		// Načtení dat z localStorage při načtení aplikace
		const storedData = JSON.parse(localStorage.getItem("tableData") || "[]");
		this.tableData = Array.isArray(storedData) ? storedData : [];
	}

	public onSubmit(): void {
		if (this.myForm.invalid) {
			this.myForm.markAllAsTouched();
			return;
		}

		const formData = this.myForm.value;

		// Přidání nového záznamu do tableData
		this.tableData.push({
			name: formData.name,
			surname: formData.surname,
		});

		// Uložení aktualizovaného pole tableData do localStorage
		localStorage.setItem("tableData", JSON.stringify(this.tableData));

		// Vyprázdnění formuláře
		this.myForm.reset();
	}

	public getErrors(controlName: string): ValidationErrors | null {
		const control = this.myForm.get(controlName);
		return control?.touched && control.errors ? control.errors : null;
	}

	public trackByFn(index: number, item: TableData): string {
		return `${item.name}-${item.surname}`;
	}
}
