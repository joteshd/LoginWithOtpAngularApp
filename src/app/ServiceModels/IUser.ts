export interface IUser {
    userName : string,
    userFirstName : string,
    UserlastName : string,
    IsLoginWithOpt : boolean,
    IsUserAuthenticated : boolean,
    isMobileNumber : boolean,
    Email : string
}

export interface IUserOtpValidator
{
    isValidOtp :boolean,
    apiToken : any
}
