import {RefinementCtx, z} from "zod";
import {REGEX_PASSWORD} from "../vars/regex";
import {CRITERIA_PASSWORD} from "../vars/criteria";

const getIssue = (issue: string) => {
    return {message: `Au moins ${issue}`}
}

export const SignUpSchema = z.object({
    email: z.email("Email invalide"),
    name: z
        .string("Vous devez renseigner un nom d'utilisateur")
        .min(2, "Le nom doit faire au moins 2 caractères"),
    password: z
        .string("Vous devez saisir un mot de passe")
        .min(6, "Le mot de passe doit contenir au moins 6 caractères")
        .superRefine((value: string, ctx: RefinementCtx<string>) => {
            if (!REGEX_PASSWORD.minuscule.test(value)) {
                ctx.addIssue(getIssue(CRITERIA_PASSWORD.minuscule));
            }
            if (!REGEX_PASSWORD.majuscule.test(value)) {
                ctx.addIssue(getIssue(CRITERIA_PASSWORD.majuscule));
            }
            if (!REGEX_PASSWORD.digit.test(value)) {
                ctx.addIssue(getIssue(CRITERIA_PASSWORD.digit));
            }
            if (!REGEX_PASSWORD.specialChar.test(value)) {
                ctx.addIssue(getIssue(CRITERIA_PASSWORD.digit));
            }
        }),
});