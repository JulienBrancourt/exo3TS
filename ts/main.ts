import { Contact } from "./contact.js";
import { Groupe } from "./groupe.js";

let affichageContacts = document.querySelector(
	"#affichageContacts"
) as HTMLUListElement;
let addContactButton = document.querySelector(
	"#addContact"
) as HTMLButtonElement;
let contactModal = document.querySelector("#contactModal") as HTMLDivElement;
let closeModalButton = document.querySelector(
	"#closeModal"
) as HTMLButtonElement;
let contactForm = document.querySelector("#contactForm") as HTMLFormElement;
let contactDetails = document.querySelector(
	"#detailsContent"
) as HTMLParagraphElement;
let editButton = document.querySelector("#editContact") as HTMLButtonElement;
let deleteButton = document.querySelector(
	"#deleteContact"
) as HTMLButtonElement;

let editModal = document.querySelector("#editModal") as HTMLDivElement;
let closeEditModalButton = document.querySelector(
	"#closeEditModal"
) as HTMLButtonElement;
let editForm = document.querySelector("#editForm") as HTMLFormElement;

// Créez un groupe et ajoutez des contacts
let groupe = new Groupe([]);

// Ajout des contacts existants
let contact1 = new Contact(
	"Albert",
	"Dupond",
	new Date(1967, 8, 13),
	"albert@dupond",
	"0123456789"
);
let contact2 = new Contact(
	"Albert2",
	"Dupond2",
	new Date(2000, 8, 13),
	"dupond@albert",
	"9876543210"
);
groupe.addContact(contact1);
groupe.addContact(contact2);

groupe.displayContacts(affichageContacts);

let selectedContact: Contact | null = null;
let selectedIndex: number | null = null;

//-------------------afficher les détails d'un contact
function afficherDetailsContact(contact: Contact, index: number): void {
	contactDetails.innerHTML = `
        <p><strong>Name:</strong> ${contact.getFirstName()} ${contact.getLastName()}<br></p>
        <p><strong>Date of Birth:</strong> ${contact.dateOfBirth.toDateString()}<br></p>
        <p><strong>Email:</strong> ${contact.email}<br></p>
        <p><strong>Phone:</strong> ${contact.phone}</p>`;
	selectedContact = contact;
	selectedIndex = index;
}

// Ajouter un événement "click" à chaque élément de la liste de contacts
affichageContacts.addEventListener("click", (event) => {
	let target = event.target as HTMLLIElement;
	let index = Array.from(affichageContacts.children).indexOf(target);

	if (index >= 0) {
		let selectedContact = groupe.getContacts()[index];
		afficherDetailsContact(selectedContact, index);
	}
});

// ------------Modale ajout
addContactButton.addEventListener("click", () => {
	contactModal.style.display = "block";
});

closeModalButton.addEventListener("click", () => {
	contactModal.style.display = "none";
});

//------------ajouter un nouveau contact
contactForm.addEventListener("submit", (event) => {
	event.preventDefault();

	let firstname = (document.querySelector("#firstname") as HTMLInputElement)
		.value;
	let lastname = (document.querySelector("#lastname") as HTMLInputElement)
		.value;
	let dateOfBirth = new Date(
		(document.querySelector("#dateOfBirth") as HTMLInputElement).value
	);
	let email = (document.querySelector("#email") as HTMLInputElement).value;
	let phone = (document.querySelector("#phone") as HTMLInputElement).value;

	let newContact = new Contact(firstname, lastname, dateOfBirth, email, phone);
	groupe.addContact(newContact);

	groupe.displayContacts(affichageContacts);

	contactModal.style.display = "none";
	contactForm.reset();
});

// --------------------------Modale edit
editButton.addEventListener("click", () => {
	if (selectedContact && selectedIndex !== null) {
		(document.querySelector("#editFirstName") as HTMLInputElement).value =
			selectedContact.getFirstName();
		(document.querySelector("#editLastName") as HTMLInputElement).value =
			selectedContact.getLastName();
		(document.querySelector("#editDateOfBirth") as HTMLInputElement).value =
			selectedContact.dateOfBirth.toISOString().split("T")[0];
		(document.querySelector("#editEmail") as HTMLInputElement).value =
			selectedContact.email;
		(document.querySelector("#editPhone") as HTMLInputElement).value =
			selectedContact.phone;

		editModal.style.display = "block";
	}
});

closeEditModalButton.addEventListener("click", () => {
	editModal.style.display = "none";
});

// ----------------------sauvegarder les modifications d'un contact
editForm.addEventListener("submit", (event) => {
	event.preventDefault();

	if (selectedContact && selectedIndex !== null) {
		let updatedFirstName = (
			document.querySelector("#editFirstName") as HTMLInputElement
		).value;
		let updatedLastName = (
			document.querySelector("#editLastName") as HTMLInputElement
		).value;
		let updatedDateOfBirth = new Date(
			(document.querySelector("#editDateOfBirth") as HTMLInputElement).value
		);
		let updatedEmail = (
			document.querySelector("#editEmail") as HTMLInputElement
		).value;
		let updatedPhone = (
			document.querySelector("#editPhone") as HTMLInputElement
		).value;

		selectedContact.setFirstName(updatedFirstName);
		selectedContact.setLastName(updatedLastName);
		selectedContact.setDateOfBirth(updatedDateOfBirth);
		selectedContact.setEmail(updatedEmail);
		selectedContact.setPhone(updatedPhone);

		groupe.displayContacts(affichageContacts);

		editModal.style.display = "none";
	}
});

// -------------------supprimer un contact
deleteButton.addEventListener("click", () => {
	if (selectedIndex !== null) {
		groupe.getContacts().splice(selectedIndex, 1);
		groupe.displayContacts(affichageContacts);
		selectedContact = null;
		selectedIndex = null;
	}
});
