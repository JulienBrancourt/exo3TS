export class Contact {
    constructor(firstname, lastname, dateOfBirth, email, phone) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.dateOfBirth = dateOfBirth;
        this.email = email;
        this.phone = phone;
    }
    affichage() {
        return `Name: ${this.firstname} ${this.lastname}, Date of Birth: ${this.dateOfBirth.toDateString()}, Email: ${this.email}, Phone: ${this.phone}`;
    }
    setFirstName(firstname) {
        this.firstname = firstname;
    }
    setLastName(lastname) {
        this.lastname = lastname;
    }
    setDateOfBirth(dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }
    setEmail(email) {
        this.email = email;
    }
    setPhone(phone) {
        this.phone = phone;
    }
    getFirstName() {
        return this.firstname;
    }
    getLastName() {
        return this.lastname;
    }
}
