export class OrganizationAlreadyExistsError extends Error {
  constructor() {
    super("Already exists an organization with this e-mail.");
  }
}
