//const response = await axios.post('http://localhost:3000/auth/login', { username, password });
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // or useHistory if you're using an older version of React Router


const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(''); // For error message
    const navigate = useNavigate(); // For navigation

    const handleLogin = async (e: React.FormEvent) => {
        try {
            e.preventDefault();
            const response = await axios.post('http://localhost:3000/auth/login', { username, password });
            console.log(response)
            if (response?.status === 201 && response.data.status === 200) {
                navigate('/reviews');
            } else {
                //@ts-ignore
                setError(response?.message || 'invalid credentials')
            }
        } catch (error) {
            setError('An error occurred while logging in');
        }
    };

    const handleRegister = async (e: React.FormEvent) => {
        try {
            e.preventDefault();
            const response = await axios.post('http://localhost:3000/auth/register', { username, password });
            console.log('Registering with', username, password);
        } catch (error) {

        }
    };

    const handleGuest = () => {
        try {
            console.log('Continuing as guest');
        } catch (e) {

        }
    };

    return (
        <div style={styles.background}>
            <div style={styles.container}>
                <h1>Welcome to Rate My Professor</h1>
                {error && <p style={styles.error}>{error}</p>}
                <form style={styles.form}>
                    <div style={styles.inputGroup}>
                        <label style={styles.label as any}>Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            style={styles.input}
                        />
                    </div>
                    <div style={styles.inputGroup}>
                        <label style={styles.label as any}>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={styles.input}
                        />
                    </div>
                    <div style={styles.buttonGroup}>
                        <button onClick={handleLogin} style={styles.button}>
                            Login
                        </button>
                        <button onClick={handleRegister} style={styles.button}>
                            Register
                        </button>
                    </div>
                </form>
                <button onClick={handleGuest} style={styles.guestButton}>
                    Continue as Guest
                </button>
            </div>
        </div>
    );
};

// Inline styles
const styles = {
    error: {
        color: 'red',
        marginBottom: '15px',
    },
    background: {
        backgroundSize: 'cover',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    label: {
        paddingRight: '10px',  // Adds space between label and input
        width: '100px',       // Fixed width for consistent alignment
        textAlign: 'right',   // Right align label text
    },
    container: {
        textAlign: 'center' as const,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        padding: '30px',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    },
    form: {
        marginBottom: '20px',
    },
    inputGroup: {
        marginBottom: '15px',
        display: 'flex',
        alignItems: 'center',  // Align label and input on the same row
    },
    input: {
        padding: '10px',
        width: '200px',
        borderRadius: '5px',
        border: '1px solid #ccc',
    },
    buttonGroup: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: '15px',
    },
    button: {
        padding: '10px 20px',
        backgroundColor: '#4CAF50',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        width: '45%',
    },
    guestButton: {
        marginTop: '20px',
        padding: '10px 20px',
        backgroundColor: '#555',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
};

export default LoginPage;
