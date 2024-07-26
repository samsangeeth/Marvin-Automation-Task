import { faker } from "@faker-js/faker";

class GenericFunctions {

  //Generate a random generic first name
  getFirstName() {
    const firstName = faker.name.firstName()
    return firstName;
  }

  //Generate a random generic last name
  getlastName() {
    const lastName = faker.name.lastName()
    return lastName;
  }

  //Generate a random generic zip code
  getZipCode() {
    const zipCode = faker.address.zipCode()
    return zipCode;
  }


}

export { GenericFunctions }