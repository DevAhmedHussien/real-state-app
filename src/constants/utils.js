  // Validation functions
  export const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) return 'Email is required';
    if (!regex.test(email)) return 'Invalid email format';
    return '';
    };

    export const validatePassword = (password) => {
    if (!password) return 'Password is required';
    if (password.length < 8) return 'Password must be at least 8 characters';
    return '';
    };


    export const validateFirstName = (name) => {
    return name.trim().length > 0 ? null : 'First name is required';
    };

    export  const validateLastName = (name) => {
        return name.trim().length > 0 ? null : 'Last name is required';
    };

    export const validateTelephone = (telephone) => {
    const phoneRegex = /^[0-9]{10,15}$/;
    return phoneRegex.test(telephone) ? null : 'Invalid telephone number';
    }; 
