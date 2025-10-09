import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";



export default function Signin() {

    const [message, setMessage] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();


    async function SubmitForm(e: any) {

        e.preventDefault()

        try {
            const response = await axios.post("http://localhost:3000/api/v1/users/signin", {
                email: email,
                password: password
            }, {
                withCredentials: true
            });

    

            if (response.status === 200 ) {
                setMessage(response.data.message);

                setTimeout(() => {
                    setMessage('')
                    setEmail('')
                    setPassword('')
                }, 3000)
                navigate("/home", { replace: true });

            } else {
                setMessage(response.data.message);
            }


        }

        catch (er) {
           let errorMessage = "An unexpected error occurred."; // Default message

    // 1. Check if it is an Axios error and if it has a response
    if (axios.isAxiosError(er) && er.response) {
        // 2. The server sends the specific message in er.response.data.message
        if (er.response.data && er.response.data.message) {
            errorMessage = er.response.data.message;
        } else if (er.response.status === 400) {
            // Fallback for generic 400 if the message field is missing
            errorMessage = "Login failed. Check your email and password.";
        }
    }
    
    // Set the state to display the specific message
    setMessage(errorMessage); 
    
    // Log the full error for detailed debugging in the console
    console.error("Login Error Details:", er);


            setTimeout(() => {
                setMessage('')
                setEmail('')
                setPassword('')
            }, 3000)
        }

    }
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] px-4">

            <div className="w-full max-w-md  sm:max-w-lg rounded-md px-8 shadow-2xl bg-gradient-to-br from-blue-200 via-indigo-200 to-purple-200">

                <h1 className="font-bold  text-blue-700 text-center text-lg sm:text-xl mb-6 mt-5">Login Here</h1>

                <form className="space-y-5" onSubmit={SubmitForm} autoComplete="off">

                    <div>
                        <label className="font-bold text-lg sm:text-xl block mb-1">
                            Email
                        </label>

                        <input onChange={(e) => setEmail(e.target.value)} required value={email} className="w-full px-4 py-2 rounded-md border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Enter your Email" type="email" />
                    </div>


                    <div>
                        <label className="font-bold text-lg sm:text-xl block mb-1">
                            Password
                        </label>

                        <input required onChange={(e) => setPassword(e.target.value)} value={password} className="w-full px-4 py-2 rounded-md border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Enter your Password" type="Password" />
                    </div>


                    <button className="text-center font-bold text-lg sm:xl  w-full rounded-lg bg-blue-500 text-white mb-5 px-3 py-2">
                        Login
                    </button>

                </form>

                <div className="w-full mb-10 items-center justify-center text-center mt-3 ">

                    <p className="text-sm sm:text-lg text-gray-600">
                        Don’t have an account?{' '}
                        <Link to="/register" className="text-blue-500 hover:underline cursor-pointer">
                            Sign up
                        </Link>
                    </p>

                </div>


                {message && (

                    <p className="font-black text-center text-md sm:text-lg mb-10">{message}</p>
                )}

            </div>

        </div>
    )
}