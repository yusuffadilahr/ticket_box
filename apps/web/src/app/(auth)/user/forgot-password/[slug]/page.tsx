'use client';

import { usePathname, useRouter } from 'next/navigation';
import { Formik, Form, Field } from 'formik';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useState } from 'react';
import Link from 'next/link';
import { ErrorMessage } from 'formik';
import toast, { Toaster } from 'react-hot-toast';
import { forgotPasswordSchema } from './../../../../../features/forgot-password/schema/forgotPasswordSchema';
import instance from './../../../../../utils/axiosInstance/axiosInstance';
import { useMutation } from '@tanstack/react-query';

interface Params {
    slug: string;
}
export default function ForgotPassword({ params }: { params: Params }) {
    const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
    const [confirmationPasswordVisible, setConfirmationPasswordVisible] = useState<boolean>(false);
    const { slug } = params
    const router = useRouter()

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };
    const togglePasswordConfirmationVisibility = () => {
        setConfirmationPasswordVisible(!confirmationPasswordVisible);
    };


    const { mutate: mutateResetPassword } = useMutation({
        mutationFn: async ({ password }: { password: string }) => {
            return instance.patch('/auth/reset-password', {
                password
            }, {
                headers: {
                    'Authorization': `Bearer ${slug}`
                }
            })
        },
        onSuccess: (res) => {
            console.log(res)
            toast.success('Reset password success')
            router.push('/user/login')
        },
        onError: (err) => {
            console.log(err)
        }
    })



    return (
        <main className="h-svh md:h-lvh flex justify-center items-center">
            <section className="w-[800px] h-[500px] justify-center items-center flex rounded-xl">
                <Formik
                    initialValues={{
                        password: '',
                    }}
                    validationSchema={forgotPasswordSchema}
                    onSubmit={(values) => {
                        mutateResetPassword({ password: values.password });
                    }}
                >
                    <Form className="w-full flex flex-col px-10 gap-7">
                        <div id="password-input" className="relative flex flex-col">
                            <div className="flex gap-3">
                                <label htmlFor="email" className="text-sm md:text-base">
                                    Password <span className="text-red-500">*</span>
                                </label>
                                <ErrorMessage
                                    name="password"
                                    component="div"
                                    className="text-red-500 text-sm mt-1"
                                />
                            </div>
                            <Field
                                type={passwordVisible ? 'text' : 'password'}
                                name="password"
                                id="password"
                                placeholder="password..."
                                className="py-2 text-sm mt-3 rounded-lg px-4 border focus:outline-none active:border focus:border-yellow-400"
                            />
                            <span
                                className="absolute  right-3 transform translate-y-12 flex items-center cursor-pointer text-gray-500"
                                onClick={togglePasswordVisibility}
                            >
                                {passwordVisible ? <FaEye /> : <FaEyeSlash />}
                            </span>
                        </div>
                        <div id="confirmPassword-input" className="relative flex flex-col">
                            <div className="flex gap-3">
                                <label htmlFor="email" className="text-sm md:text-base">
                                    Confirm Password <span className="text-red-500">*</span>
                                </label>
                                <ErrorMessage
                                    name="confirmPassword"
                                    component="div"
                                    className="text-red-500 text-sm mt-1"
                                />
                            </div>
                            <Field
                                type={confirmationPasswordVisible ? 'text' : 'password'}
                                name="confirmPassword"
                                id="confirmPassword"
                                placeholder="Confirm Password..."
                                className="py-2 text-sm mt-3 rounded-lg px-4 border focus:outline-none active:border focus:border-yellow-400"
                            />
                            <span
                                className="absolute  right-3 transform translate-y-12 flex items-center cursor-pointer text-gray-500" 
                                onClick={togglePasswordConfirmationVisibility}
                            >
                                {confirmationPasswordVisible ? <FaEye /> : <FaEyeSlash />}
                            </span>
                        </div>

                        <button
                            type="submit"
                            className="text-white text-sm rounded-lg w-full py-2 bg-yellow-500 hover:bg-yellow-600"
                        >
                            Reset Password
                        </button>

                    </Form>
                </Formik>
            </section>
        </main>
    );
}
