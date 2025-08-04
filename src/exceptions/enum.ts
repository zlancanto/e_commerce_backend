export enum ErrorCode {
    // 1000–1999 => Erreurs liées aux utilisateurs (auth, login, inscription)
    USER_NOT_FOUND = 1001,
    USER_ALREADY_EXISTS = 1002,
    INCORRECT_PASSWORD = 1003,

    // 2000–2999 => Erreurs liées aux produits, objets métiers
    // 3000–3999 => Erreurs liées aux paiements, transactions
    // 4000–4999 =>	Erreurs liées aux droits, permissions
    UNAUTHORIZED = 4001,
    NOT_TOKEN_EXIST = 4002,

    // 5000–5999 =>	Erreurs système, serveur, ou non classées
    ENV_VARIABLE_NOT_DEFINED = 5001,
}

export enum StatusCode {
    OK = 200,
    CREATED = 201,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    CONFLICT = 409,
    INTERNAL_SERVER_ERROR = 500,
}