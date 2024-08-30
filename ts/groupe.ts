import { Contact } from "./contact.js";

export class Groupe {
	private contacts: Contact[];

	constructor(contacts: Contact[] = []) {
		this.contacts = contacts;
	}

	addContact(contact: Contact) {
		this.contacts.push(contact);
	}

	public displayContacts(affichageContacts: HTMLElement): void {
		affichageContacts.innerHTML = this.contacts
			.map(
				(contact) =>
					`<li>${contact.getFirstName()} ${contact.getLastName()}</li>`
			)
			.join("");
	}
	public getContacts(): Contact[] {
		return this.contacts;
	}
}
