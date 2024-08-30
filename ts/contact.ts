export class Contact {
	private firstname: string;
	private lastname: string;
	private dateOfBirth: Date;
	private email: string;
	private phone: string;

	constructor(
		firstname: string,
		lastname: string,
		dateOfBirth: Date,
		email: string,
		phone: string
	) {
		this.firstname = firstname;
		this.lastname = lastname;
		this.dateOfBirth = dateOfBirth;
		this.email = email;
		this.phone = phone;
	}

	public affichage(): string {
		return `Name: ${this.firstname} ${
			this.lastname
		}, Date of Birth: ${this.dateOfBirth.toDateString()}, Email: ${
			this.email
		}, Phone: ${this.phone}`;
	}

	public setFirstName(firstname: string): void {
		this.firstname = firstname;
	}

	public setLastName(lastname: string): void {
		this.lastname = lastname;
	}

	public setDateOfBirth(dateOfBirth: Date): void {
		this.dateOfBirth = dateOfBirth;
	}

	public setEmail(email: string): void {
		this.email = email;
	}

	public setPhone(phone: string): void {
		this.phone = phone;
	}

	public getFirstName(): string {
		return this.firstname;
	}

	public getLastName(): string {
		return this.lastname;
	}
}
