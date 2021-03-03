import React, { useEffect, useState, useContext } from 'react';
import serverApi from '../Apis/ServerApi';
import { myContext } from './Context';
import { UserInterface } from '../Interfaces/Interfaces';
import { AxiosResponse } from 'axios';

export default function AdminPage() {
    const [data, setData] = useState<UserInterface[]>();
    const [selectedUserId, setSelectedUserId] = useState<string>();
    const user: UserInterface = useContext(myContext);

    useEffect(() => {
        serverApi.get('/getallusers').then((res: AxiosResponse) => {
            console.log(res.data);
            const users = res.data.filter((e: UserInterface) => e.username !== user.username);
            setData(users);
        });
    }, [user]);

    const handleDeleteUser = () => {
        serverApi.post('/deleteuser', {
            id: selectedUserId
        }).then(res => {
            console.log(res.data);
        })
    }

    return (
        <div>
            <h1>Admin Page, Only admin can see this!</h1>
            <select onChange={e => setSelectedUserId(e.target.value)} name="deleteuser" id="deleteuser">
                <option>Select A User</option>
                {data && data.map((item: UserInterface) => {
                    return (<option key={item.username} value={item.id}>{item.username}</option>)
                })}
            </select>
            {selectedUserId && <h1>Selected UserId is {selectedUserId}</h1>}
            <br />
            <button onClick={handleDeleteUser}>Delete User</button>
        </div>
    );
}