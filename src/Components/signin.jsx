import React, {useState, useContext, useEffect} from 'react';
import axios from 'axios';
import {Button, Card, CardBody, CardFooter, Dialog, Input, Typography} from "@material-tailwind/react";
import {CurrentUserContext} from "./CurrentUserProvider.jsx";
import {Link} from "react-router-dom";
import {createUser, userLogin,} from "../AxiosAdmin.js";
import SuccessAlert from "./SuccessAlert.jsx";
import { useNavigate } from 'react-router-dom';
import {XMarkIcon} from "@heroicons/react/24/outline/index.js";
function Signin() {
    const {
        opensignin, handleOpenSignin, handleOpenSignup,setAdminToken,
        setClientToken , setCurrentUser, adminsession, setadminsession,
        clientsession, setclientsession,
    } = useContext(CurrentUserContext);
    const [username, setusername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState(null);
    const [Success, setSuccess] = useState('');
    const navigate = useNavigate();
    const handleSubmit = async (e) => {

        e.preventDefault();
        console.log(username, password);
        try {
            const response = await userLogin(username, password);

            if (response.data.status === 'success') {
                if(response.data.message.role==="user"){


                    setPassword('')
                    setusername('')
                    setClientToken(response.data.message.data.user_id)
                    console.log(response.data.message.data.user_id)
                    setSuccess(response.data.message.message);
                    setError(null)
                    const interval = setTimeout(() => {
                        setSuccess("")
                        handleOpenSignin()
                    }, 1000)


                    return () => clearTimeout(interval);


                }
                if(response.data.message.role==="admin"){
                    navigate('/');


                    console.log(response)
                    setAdminToken(response.data.message.data)
                }



                setError(null)

            } else {
                setError(response.data.message);
                console.log(response.data)
            }

        } catch (error) {
            setMessage('An error occurred while logging in.');
        }
    };


    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    // Function to update screenWidth state on window resize
    const updateScreenWidth = () => {
        setScreenWidth(window.innerWidth);
    };

    // Effect to add event listener for window resize
    useEffect(() => {
        window.addEventListener('resize', updateScreenWidth);
        return () => {
            window.removeEventListener('resize', updateScreenWidth);
        };
    }, []); // Empty dependency array means this effect runs only once

    // Determine size based on screen width
    const size = screenWidth <= 500 ? 'xl' : 'sm';




    return (
        <>
            {Success && <SuccessAlert txt={Success}/>}
            <Dialog
size={size}
                open={opensignin}
                handler={handleOpenSignin}
                className="bg-transparent flex h-full  md:h-auto pt-10    md:pb-[0rem]   md:pt-0   pb-[40rem] w-full shadow-none"
            >









                <Card    className="w-full   h-full ">

                    <button
                        color="red"
                        onClick={handleOpenSignin}
                        className="absolute top-0 z-10 p-2  right-0"
                    >
                        <XMarkIcon className="w-7 h-7  text-blue-gray-700" />
                    </button>
                    <CardBody className="flex flex-col">
                        <Typography variant="h4" color="blue-gray">
                            Sign In
                        </Typography>
                        <Typography className=" font-normal" variant="paragraph" color="gray">
                            Enter your email and password to Sign In.
                        </Typography>

                        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                            <div className=" flex w-full h-[40px] relative flex justify-center ">
                                {error && <Typography variant="small"
                                                      className="mt-4  text-center text-red-500">{error}</Typography>}

                            </div>
                            <Input
                                label="Email"
                                size="lg"
                                value={username}
                                error={error !== null}
                                onChange={(e) => setusername(e.target.value)}
                            />

                            <Input
                                label="Password"
                                size="lg"
                                type="password"
                                value={password}
                                error={error !== null}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <Button variant="gradient" fullWidth type="submit">
                                Sign In
                            </Button>
                        </form>
                    </CardBody>
                    <CardFooter className="pt-0">
                        <Typography variant="small" className="mt-4 flex justify-center">
                            Don&apos;t have an account?
                            <a  onClick={handleOpenSignup} className="ml-1 font-bold">
                                Sign up
                            </a>
                        </Typography>
                    </CardFooter>

                </Card>
            </Dialog>
        </>
    );
}

export default Signin;
