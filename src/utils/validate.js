export const checkValidData = (email, password) => {
    // using regex to validate email
    const isEmailValid = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/.test(email);
    const isPasswordValid = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);
    
    if(!isEmailValid) return ("Invalid Email id");
    if(!isPasswordValid) return ("Invalid Password");
    
    return null;

}

export const checkName = (name) => {
    const isNameValid = /^[A-Za-z\s]+$/.test(name);
    if(!isNameValid) return "Invalid Name";

    return null;
}