"use client"
import Link from 'next/link';
import React, { useState } from 'react';
import * as Yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function ResetForm() {
    const [resetEmail, setResetEmail] = useState('');
    const [resetError, setResetError] = useState('');

    const validationSchema = Yup.object().shape({
        resetEmail: Yup.string()
            .email('Invalid email address')
            .required('Email is required'),
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setResetEmail(value); // Set the email directly as a string
    }

    const handleSubmit = () => {
        try {
            validationSchema.validate({ resetEmail }, { abortEarly: false });
            setResetError('');
            toast.success('Email Reset successfull!', {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 2000, // Auto close the toast after 2 seconds
            });
        } catch (error) {
            const errorMessage = "Please Enter a valid email";

            setResetError(errorMessage);
        }
    }

    return (
        <div className='w-full h-screen bg-blue-700 flex justify-center items-center'>
            <div className='flex p-10 flex-col items-center gap-5 justify-center bg-white w-2/4 h-2/4'>
                <label className='text-black-500'>
                    Please provide your registered email id to Reset password
                </label>
                <input
                    placeholder='Enter your email'
                    className='border-2 ps-3 py-1 w-full rounded'
                    type="email"
                    name="resetEmail"
                    value={resetEmail.resetEmail}
                    onChange={handleChange}
                />
                {resetError && (
                    <p className='text-red-500 text-sm'>{resetError}</p>
                )}
                <div className='flex w-full justify-center gap-5'>
                    <button onClick={handleSubmit} className='bg-blue-700 w-full flex justify-center text-white p-2  rounded'>
                        Reset
                    </button>
                    <Link className='w-full' href="/">
                        <button className='bg-blue-700 w-full flex justify-center text-white p-2 rounded'>
                            Login/SignUp
                        </button></Link>

                </div>
            </div>
            <ToastContainer />
        </div>
    )
}

export default ResetForm;
