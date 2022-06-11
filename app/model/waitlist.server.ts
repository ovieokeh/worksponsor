const SibApiV3Sdk = require("@sendinblue/client");

const contactsApi = new SibApiV3Sdk.ContactsApi();
const createContact = new SibApiV3Sdk.CreateContact();

contactsApi.setApiKey(
  SibApiV3Sdk.ContactsApiApiKeys.apiKey,
  process.env.SENDINBLUE_API_KEY || ""
);

export async function addWaitlist(email: string): Promise<boolean> {
  try {
    createContact.email = email;
    createContact.listIds = [5]; // Waitlist list in SendInBlue

    return contactsApi.createContact(createContact).then((result: any) => {
      return result.body;
    });
  } catch (error: any) {
    throw new Error(error);
  }
}
