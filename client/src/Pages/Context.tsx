import React, { createContext, PropsWithChildren, useState, useEffect } from 'react';
import serverApi from '../Apis/ServerApi';
import { AxiosResponse } from 'axios';
import { UserInterface } from '../Interfaces/Interfaces';

export const myContext = createContext<Partial<UserInterface>>({});

export default function Context(props: PropsWithChildren<any>) {
    const [user, setUser] = useState<UserInterface>();

    useEffect(() => {
        serverApi.get("/user", { withCredentials: true }).then((res: AxiosResponse) => {
            setUser(res.data);
        })
    }, []);

    return (<myContext.Provider value={user!}>{props.children}</myContext.Provider>)
}