import React, { createContext, PropsWithChildren, useState, useEffect } from 'react';
import serverApi from '../Apis/ServerApi';

export const myContext = createContext<any>({});

export default function Context(props: PropsWithChildren<any>) {
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        serverApi.get('/user').then(res => {
            setUser(res.data);
        });
    }, []);

    return (<myContext.Provider value={user}>{props.children}</myContext.Provider>)
}