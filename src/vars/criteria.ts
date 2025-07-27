const minuscule = 'une (01) minuscule';
const majuscule = 'une (01) majuscule';
const digit = 'un (01) chiffre';
const specialChar = 'un (01) caractère spécial (!@#$%^&*)';

export const CRITERIA_PASSWORD = {
    minuscule,
    majuscule,
    digit,
    specialChar,
    message: `Le mot de passe doit contenir au moins ${minuscule}, ${majuscule}, ${digit} et ${specialChar}`,
};