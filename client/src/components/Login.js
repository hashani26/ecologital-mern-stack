import React, { useState, useContext } from "react";
import { Form, Button } from "react-bootstrap"
import { ToastContainer, toast } from 'react-toastify';
import { SendRequest } from "../helper/HandleRequest";
import { GlobalContext } from "../HOC/Global";
import { saveUser } from '../store/actions/user';
import 'react-toastify/dist/ReactToastify.css';

function Login() {

    const [Loading, setLoading] = useState(false)
    const [mail, setMail] = useState('')
    const [password, setPassword] = useState('')
    const { userDispatch } = useContext(GlobalContext);

    const handleLogin = async (e) => {
        e.preventDefault()

        setLoading(true)

        const route = "http://localhost:8000/api/users/login"
        const data = { mail, password }
        const respData = await SendRequest(route, data)
        if (respData.success) {
            toast.success("Login successful")
            const { returnedValue: { token } } = respData
            localStorage.setItem('token', token);
            userDispatch(saveUser(respData.returnedValue))
            setTimeout(() => window.location.href = "http://localhost:3000/SecuredPage", 500)
        }
        else {
            toast.error("Login Failed.")
        }
        setLoading(false)
    }

    return (
        <div className="h-100 d-flex mt-4 align-items-center flex-column">
            <ToastContainer />

            <div style={{ minWidth: "40%" }} className="text-left">
                <Form>
                    <h1 className="text-center">Login</h1>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control onChange={(e) => setMail(e.target.value)} type="email" placeholder="Enter email" />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" />
                    </Form.Group>
                    <hr></hr>

                    <Button disabled={Loading} onClick={(e) => handleLogin(e)} block variant="primary" type="submit">
                        Submit
                </Button>
                    <Form.Group>
                        <Form.Text className="mt-1 float-left">
                            <a href="/register">Dont have an account?</a>
                        </Form.Text>
                    </Form.Group>
                </Form>
            </div>


        </div>
    );
}

export default Login;
