import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import AxiosInstance from "../helpers/AxiosInstance";

const ResetPassword = (props) => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [getParams, setParams] = useSearchParams();

    useEffect(()=>{
        const checkReset = async () => {
            try{
                const body = {
                    Email: getParams.get('email'),
                    Token: getParams.get('token')
                }

                const res = await AxiosInstance().post('/check-reset-password.php', body);
            }catch(error){

            }
        }
        checkReset();
    },[])

    const handleResetPassword = async () => {
        try {
            // debugger;
            const Email = getParams.get('email');
            const Token = getParams.get('token');
            if (password === '' || confirmPassword === '' || password !== confirmPassword) throw new Error("Please check your input informations");
            const body = { Email, Token, Password: password };
            const res = await AxiosInstance().post('/reset-password.php', body);
            console.log(res);

            if (res.status === true) {
                window.location.href = '/';
            }

        }catch(error) {
            console.log("Reset Password fail because: " + error)
        }
    }

    return (
        <div className="container mx-5 mx-auto">
            <h1 className='text-center mb-3'>Sửa tin tức</h1>
            <form className=".conatiner mx-5 my-5 col-md-6 mx-auto">
                <div className="mb-3 mt-3">
                    <label className="form-label">New Password:</label>
                    <input value={password} onChange={(event) => setPassword(event.target.value)}
                        type="password" className="form-control" placeholder="Password"
                        name="title" />
                </div>

                <div className="mb-3 mt-3">
                    <label className="form-label">Confirm Password:</label>
                    <input value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)}
                        type="password" className="form-control" placeholder="Confirm Password"
                        name="title" />
                </div>

                <button type="button" onClick={handleResetPassword} className="btn btn-primary mx-auto">Submit</button>
            </form>
        </div>
    );
};

export default ResetPassword;