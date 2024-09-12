import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        
        console.log('Username:', username, 'Password:', password);
        sessionStorage.setItem('username',username);
        navigate('/ComplaintForm');
    };

    const inlineStyles = {
        container: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            backgroundColor: '#f7f7f7'
        },
        form: {
            display: 'flex',
            flexDirection: 'column',
            width: '300px',
            padding: '20px',
            border: '1px solid #ccc',
            borderRadius: '5px',
            backgroundColor: 'white'
        },
        input: {
            marginBottom: '10px',
            padding: '10px',
            fontSize: '16px',
            borderRadius: '4px',
            border: '1px solid #ccc'
        },
        button: {
            padding: '10px 20px',
            fontSize: '16px',
            color: 'white',
            backgroundColor: '#007bff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
        }
    };


    const handleManager =() =>{
      navigate('/AdminComplaintDisplay');
    }

    return (
        <div style={inlineStyles.container}>
            <form style={inlineStyles.form} onSubmit={handleSubmit}>
                <label>
                    Email:
                    <input
                        type="email"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        style={inlineStyles.input}
                        required
                    />
                </label>
                <label>
                    Password:
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={inlineStyles.input}
                        required
                    />
                </label>
                <button type="submit" style={inlineStyles.button}>
                    Login
                </button>
            </form>

            <button onClick={handleManager}>Customer service Manager</button>
        </div>
    );
}

export default LoginPage;
