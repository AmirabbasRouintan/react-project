import React from 'react';
import useLogin from '../js_folder/useLogin';
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import '../index.css';

export default function LoginPage() {
    const { email, setEmail, password, setPassword, handleSubmit } = useLogin();

    return (
        <div className="Login-Container">
            <form onSubmit={handleSubmit} className="Login-Form">
                <h1>Login Page</h1>
                <Input 
                    className='Login-Form-Components' 
                    label="کدملی" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                />
                <Input 
                    className='Login-Form-Components' 
                    label="رمز عبور" 
                    type="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                />
                <Button 
                    type="submit" 
                    className='Login-Form-Components' 
                    id='Login-Form-Component1' 
                    variant="solid"
                >
                    ورود
                </Button>
            </form>
        </div>
    );
}