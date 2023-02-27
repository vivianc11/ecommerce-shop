import Commerce from "@chec/commerce.js";

// Creating a new commerce instance
export const commerce = new Commerce(process.env.REACT_APP_CHEC_PUBLIC_KEY, true);