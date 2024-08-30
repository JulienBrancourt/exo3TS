export class Groupe {
    constructor(contacts = []) {
        this.contacts = contacts;
    }
    addContact(contact) {
        this.contacts.push(contact);
    }
    displayContacts(affichageContacts) {
        affichageContacts.innerHTML = this.contacts
            .map((contact) => `<li>${contact.getFirstName()} ${contact.getLastName()}</li>`)
            .join("");
    }
    getContacts() {
        return this.contacts;
    }
}
