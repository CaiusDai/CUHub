const config = {
    IdentityCodes: {
        Admin: 0,
        NormalUser: 1,
        Visitor: 2,
        Blocked: 3,
    },
    ErrorCodes: {
        InvalidRequest: 0, // E.g.: Create an Account that has been created before
        NotAuthenticated: 1, // Caused by visitor invalid access.
        NotAdmin: 2, // Caused by normal user attempting to do admin operation.
        InvalidAccess: 3, // Caused by normal user attempting to do something that he has no right to do.
    },
    HTTPCode: {
        BadRequest: 400,
        NotFound: 404,
        Ok: 200,
        Created: 201,
        Unauthorized: 401,
    },
    ApiPath: {
        login: `/api/authentication/login/`,
        logout: 'api/authentication/logout/',
    },
    ListenPort: process.env.PORT || 5000,
}

module.exports = config
