import { Contact } from "./contact.js";
import { Groupe } from "./groupe.js";
let affichageContacts = document.querySelector("#affichageContacts");
let addContactButton = document.querySelector("#addContact");
let contactModal = document.querySelector("#contactModal");
let closeModalButton = document.querySelector("#closeModal");
let contactForm = document.querySelector("#contactForm");
let contactDetails = document.querySelector("#detailsContent");
let editButton = document.querySelector("#editContact");
let deleteButton = document.querySelector("#deleteContact");
let editModal = document.querySelector("#editModal");
let closeEditModalButton = document.querySelector("#closeEditModal");
let editForm = document.querySelector("#editForm");
// Créez un groupe et ajoutez des contacts
let groupe = new Groupe([]);
// Ajout des contacts existants
let contact1 = new Contact("Albert", "Dupond", new Date(1967, 8, 13), "albert@dupond", "0123456789");
let contact2 = new Contact("Albert2", "Dupond2", new Date(2000, 8, 13), "dupond@albert", "9876543210");
groupe.addContact(contact1);
groupe.addContact(contact2);
groupe.displayContacts(affichageContacts);
let selectedContact = null;
let selectedIndex = null;
//-------------------afficher les détails d'un contact
function afficherDetailsContact(contact, index) {
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
    let target = event.target;
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
    let firstname = document.querySelector("#firstname")
        .value;
    let lastname = document.querySelector("#lastname")
        .value;
    let dateOfBirth = new Date(document.querySelector("#dateOfBirth").value);
    let email = document.querySelector("#email").value;
    let phone = document.querySelector("#phone").value;
    let newContact = new Contact(firstname, lastname, dateOfBirth, email, phone);
    groupe.addContact(newContact);
    groupe.displayContacts(affichageContacts);
    contactModal.style.display = "none";
    contactForm.reset();
});
// --------------------------Modale edit
editButton.addEventListener("click", () => {
    if (selectedContact && selectedIndex !== null) {
        document.querySelector("#editFirstName").value =
            selectedContact.getFirstName();
        document.querySelector("#editLastName").value =
            selectedContact.getLastName();
        document.querySelector("#editDateOfBirth").value =
            selectedContact.dateOfBirth.toISOString().split("T")[0];
        document.querySelector("#editEmail").value =
            selectedContact.email;
        document.querySelector("#editPhone").value =
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
        let updatedFirstName = document.querySelector("#editFirstName").value;
        let updatedLastName = document.querySelector("#editLastName").value;
        let updatedDateOfBirth = new Date(document.querySelector("#editDateOfBirth").value);
        let updatedEmail = document.querySelector("#editEmail").value;
        let updatedPhone = document.querySelector("#editPhone").value;
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
