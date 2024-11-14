import { useState } from 'react';
import { useAppContext } from '../components/AuthContext'; 
import { useNavigate } from 'react-router-dom';

const useLogin = () => {
    const { login } = useAppContext(); 
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); 

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:3000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                login(); 
                navigate('/panel'); 
            } else {
                alert('Login failed. Please check your credentials.');
            }
        } catch (error) {
            console.error('Error during login:', error);
            alert('An error occurred during login.');
        }
    };

    return { email, setEmail, password, setPassword, handleSubmit };
};

export default useLogin;