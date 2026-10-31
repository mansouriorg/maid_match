// Details of the business that publishes the site. They are shown on the legal
// notice (mentions legales) and on the privacy page. A field left empty is shown
// on the page as "[a completer]", so fill in every field before the site goes
// online. The legal notice is required by French law for a professional site.
export const business = {
  // Company name, or first and last name of the person who runs the business
  name: "",
  // For example: auto-entrepreneur, SAS, SARL
  legalForm: "",
  address: "",
  email: "",
  phone: "",
  // SIREN or SIRET number
  registration: "",
  // VAT number. Leave empty if you have none (the line is then hidden).
  vatNumber: "",
  publicationDirector: "",
  // The company that hosts the site (for example Vercel Inc.) and its address
  hostName: "",
  hostAddress: "",
  // How long the booking requests are kept (for example: 3 years after the last contact)
  retention: "",
};

// The text shown for a detail that is not filled in yet.
export function shown(value: string): string {
  return value.trim() === "" ? "[\u00e0 compl\u00e9ter]" : value;
}
