import React, { useState } from 'react';
import serverApi from '../Apis/ServerApi';

export default function Login() {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleLogin = () => {
        console.log(username, password);
        serverApi.post('/login', { username, password })
            .then(res => {
                console.log(res.data);
                if (res.data === 'success') {
                    // window.location.href = '/';
                }
            }).catch(e => {
                console.log(e);
            });
    }

    return (<div>
        <h1>Login</h1>
        <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
        <input type="text" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
        <button onClick={handleLogin} >Login</button> <br />
    </div>);
}