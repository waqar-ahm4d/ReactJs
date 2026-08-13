import parsePhoneNumberFromString from "libphonenumber-js";

export function validatePhone(phone, country) {
    const value = phone.replace(/[\s-]/g, "");

    if(country === "PK") {
        const isValid = /^(03\d{9}|\+923\d{9}|\923\d{9})$/.test(value);

        if(!isValid) {
            return "Enter a valid phone number"
        }
        return "";
    }
    const phoneNumber = parsePhoneNumberFromString(value, country);

    if(!phoneNumber || !phoneNumber.isValid()) {
        return "Enter a valid phone number"
    }

    return ""
}