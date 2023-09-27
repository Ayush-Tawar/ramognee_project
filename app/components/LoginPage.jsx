import React, { useState } from "react";
import { countries, citiesByState, statesByCountry } from "./dropdownData";
import CountryMobileCodeDropdown from "./CountryMobileCodeDropdown";
import * as Yup from "yup";
import { useRouter } from "next/navigation";

export function LoginPage() {
    const [isLoginFormVisible, setIsLoginFormVisible] = useState(true);
    const [isSignUpFormVisible, setIsSignUpFormVisible] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState("");
    const [selectedState, setSelectedState] = useState("");
    const [selectedCity, setSelectedCity] = useState("");
    const [selectedMobileCode, setSelectedMobileCode] = useState("");


    const initialFormData = {
        userType: "individual",
        firstName: "",
        lastName: "",
        email: "",
        address: "",
        country: "",
        state: "",
        city: "",
        pincode: Number,
        mobile: Number,
        fax: Number,
        phone: Number,
        password: "",
        confirmPassword: "",
        mobileCode: "",
    };

    const [formData, setFormData] = useState(initialFormData);
    const [errors, setErrors] = useState({});
    const router = useRouter();
    console.log("errors", errors);
    const handleLoginClick = () => {
        setIsLoginFormVisible(true);
        setIsSignUpFormVisible(false);
    };

    const handleSignUpClick = () => {
        setIsLoginFormVisible(false);
        setIsSignUpFormVisible(true);
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleCountryChange = (event) => {
        const selectedCountry = event.target.value;
        setSelectedCountry(selectedCountry);
        setSelectedState(""); // Clear selected state when country changes
        setSelectedCity(""); // Clear selected city when country changes
    };

    // Event handler for selecting a state.
    const handleStateChange = (event) => {
        const selectedState = event.target.value;
        setSelectedState(selectedState);
        setSelectedCity(""); // Clear selected city when state changes
    };

    // Event handler for selecting a city.
    const handleCityChange = (event) => {
        const selectedCity = event.target.value;
        setSelectedCity(selectedCity);
    };

    const handleMobileCodeChange = (event) => {
        const selectedMobileCode = event.target.value;
        setSelectedMobileCode(selectedMobileCode);
    };

    const validationSchema = Yup.object().shape({
        firstName: Yup.string().required("First name is required"),
        lastName: Yup.string().required("Last name is required"),
        email: Yup.string().email("Invalid email address").required("Email is required"),
        address: Yup.string().required("Address is required"),
        country: Yup.string().required("Country is required"),
        state: Yup.string().required("State is required"),
        city: Yup.string().required("City is required"),
        pincode: Yup.number()
            .typeError("Pincode must be a number") // Custom error message for non-numeric input
            .required("Pincode is required")
            .positive("Pincode must be a positive number") // Optionally enforce positivity
            .integer("Pincode must be an integer"),

        fax: Yup.number()
            .typeError("Fax must be a number") // Custom error message for non-numeric input
            .required("Fax is required")
            .positive("Fax must be a positive number") // Optionally enforce positivity
            .integer("Fax must be an integer"),
        password: Yup.string()
            .required("Password is required")
            .min(8, "Password must be at least 8 characters long")
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
                "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
            ),
        confirmPassword: Yup.string()
            .required("Confirm Password is required")
            .oneOf([Yup.ref("password"), null], "Passwords must match"),
        phone: Yup.string()
            .matches(/^\d{10}$/, "Phone number must be 10 digits")
            .required("Phone number is required"),
        mobile: Yup.string()
            .matches(/^\d{10}$/, "Mobile number must be 10 digits")
            .required("Mobile number is required"),
        // Add more validation rules for other fields as needed
    });

    const handleSignup = async (event) => {
        event.preventDefault();
        try {
            await validationSchema.validate(formData, { abortEarly: false });
            setFormData(initialFormData);
            setErrors({});
        } catch (validationErrors) {
            const errors = {};
            validationErrors.inner.forEach((error) => {
                errors[error.path] = error.message;
            });
            setErrors(errors);
        }
    };
    const handleSubmit = () => {
        console.log("working ......");
        router.push("/product");
    };

    return (
        <div className="p-10 w-3/4">
            <div className="flex justify-between topButtonContainer rounded-full border-2">
                <button
                    className={`flex align-center w-full p-1 rounded-full justify-center ${isLoginFormVisible ? "activeButton" : ""}`}
                    onClick={handleLoginClick}
                >
                    Login
                </button>
                <button
                    className={`flex align-center w-full p-1 rounded-full justify-center ${isSignUpFormVisible ? "activeButton" : ""}`}
                    onClick={handleSignUpClick}
                >
                    Sign Up
                </button>

            </div>
            {isLoginFormVisible && (
                <form className="flex flex-col mt-8">
                    <div className="flex flex-col">
                        <label className="p-1">
                            Email:
                        </label>
                        <input className="border-2 rounded-full p-1" placeholder="Email" type="email" />
                    </div>
                    <div className="flex flex-col">
                        <label className="p-1">
                            Password:
                        </label>
                        <input className="border-2 rounded-full p-1" type="password" placeholder="Password" />
                    </div>
                    <button onClick={handleSubmit} className="activeButton rounded-full mt-4 p-1 flex justify-center align-center" type="submit">Log me in </button>
                </form>
            )}
            {isSignUpFormVisible && (
                <form className="mt-8" onSubmit={ () => handleSubmit}>
                    <div>
                        <label className="my-2">Individual/Enterprise/Goverment</label>
                        <div className="w-full flex justify-between">
                            <label>
                                Individual
                                <input
                                    className="border-2 ms-5 rounded p-1"
                                    type="radio"
                                    name="userType"
                                    value="individual"
                                    checked={formData.userType === "individual"}
                                    onChange={handleInputChange} />
                            </label>
                            <label>
                                Enterprise
                                <input
                                    className="border-2 ms-5 rounded p-1"
                                    type="radio"
                                    name="userType"
                                    value="enterprise"
                                    checked={formData.userType === "enterprise"}
                                    onChange={handleInputChange} />
                            </label>
                            <label>
                                Government
                                <input
                                    className="border-2 ms-5 rounded p-1"
                                    type="radio"
                                    name="userType"
                                    value="government"
                                    checked={formData.userType === "government"}
                                    onChange={handleInputChange} />
                            </label>
                        </div>
                    </div>

                    <div className="flex w-full gap-2">
                        <div className="flex w-full flex-col">
                            <label>First Name:</label>
                            <input
                                className="border-2 rounded p-1"
                                type="text"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleInputChange} />
                            <p className="text-red-500 text-sm">{errors.firstName}</p>
                        </div>
                        <div className="flex w-full flex-col">
                            <label>Last Name:</label>
                            <input
                                className="border-2 rounded p-1"
                                type="text"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleInputChange} />
                            <p className="text-red-500 text-sm">{errors.lastName}</p>
                        </div>
                    </div>
                    <div className="flex  flex-col">
                        <label>Email:</label>
                        <input
                            className="border-2 rounded p-1"
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange} />
                        <p className="text-red-500 text-sm">{errors.email}</p>
                    </div>
                    <div className="flex flex-col">
                        <label>Address:</label>
                        <input
                            className="border-2 rounded p-1"
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange} />
                        <p className="text-red-500 text-sm">{errors.address}</p>
                    </div>

                    <div className="mt-2 flex gap-5">
                        <div className="flex w-full items-center">
                            <label>Country:</label>
                            <div className="ms-4">
                                <select className="border-2 p-2 w-full rounded" value={selectedCountry} onChange={handleCountryChange}>
                                    <option value="">Select a country</option>
                                    {countries.map((country) => (
                                        <option key={country} value={country}>
                                            {country}
                                        </option>
                                    ))}
                                </select>
                                <p className="text-red-500 text-sm">{errors.country}</p>
                            </div>
                        </div>
                        <div className="flex w-full items-center">
                            <label>State:</label>
                            <div className="ms-4">
                                <select className="border-2 p-2  w-full rounded" value={selectedState} onChange={handleStateChange} disabled={!selectedCountry}>
                                    <option value="">Select a state</option>
                                    {selectedCountry &&
                                        statesByCountry[selectedCountry].map((state) => (
                                            <option key={state} value={state}>
                                                {state}
                                            </option>
                                        ))}
                                </select>
                                <p className="text-red-500 text-sm">{errors.state}</p>
                            </div>
                        </div>
                        <div className="flex w-full items-center">
                            <label>City:</label>
                            <div className="ms-4">
                                <select className="border-2 p-2 w-full rounded" value={selectedCity} onChange={handleCityChange} disabled={!selectedState}>
                                    <option value="">Select a city</option>
                                    {selectedState &&
                                        citiesByState[selectedState].map((city) => (
                                            <option key={city} value={city}>
                                                {city}
                                            </option>
                                        ))}
                                </select>
                                <p className="text-red-500 text-sm">{errors.city}</p>

                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <label>Pincode:</label>
                        <input
                            className="border-2 rounded p-1"
                            type="number"
                            name="pincode"
                            value={formData.pincode}
                            onChange={handleInputChange} />
                        <p className="text-red-500 text-sm">{errors.pincode}</p>
                    </div>
                    <div className="flex flex-col">
                        <CountryMobileCodeDropdown
                            countryMobileCodes={["+1", "+44", "+91"]} // Example mobile codes
                            selectedCode={selectedMobileCode}
                            onChange={handleMobileCodeChange} />
                        <p className="text-red-500 text-sm">{errors.mobileCode}</p>
                    </div>
                    <div className="flex flex-col">
                        <label>Mobile Number:</label>
                        <input
                            className="border-2 rounded p-1"
                            type="number"
                            name="mobile"
                            value={formData.mobile}
                            onChange={handleInputChange} />
                        <p className="text-red-500 text-sm">{errors.mobile}</p>
                    </div>
                    <div className="flex flex-col">
                        <label>Fax:</label>
                        <input
                            className="border-2 rounded p-1"
                            type="number"
                            name="fax"
                            value={formData.fax}
                            onChange={handleInputChange} />
                        <p className="text-red-500 text-sm">{errors.fax}</p>
                    </div>
                    <div className="flex flex-col">
                        <label>Phone:</label>
                        <input
                            className="border-2 rounded p-1"
                            type="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange} />
                        <p className="text-red-500 text-sm">{errors.phone}</p>
                    </div>
                    <div className="flex flex-col">
                        <label>Password:</label>
                        <input
                            className="border-2 rounded p-1"
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange} />
                        <p className="text-red-500 text-sm">{errors.password}</p>
                    </div>
                    <div className="flex flex-col">
                        <label>Confirm Password:</label>
                        <input
                            className="border-2 rounded p-1"
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleInputChange} />
                        <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
                    </div>


                    <button className="activeButton flex justify-center w-full mt-8 p-1 rounded-full" onClick={handleSignup} type="submit">Sign Up</button>
                </form>
            )}
        </div>
    );
}
