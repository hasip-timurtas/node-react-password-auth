import React, { createContext, PropsWithChildren } from 'react';

export const myContext = createContext<any>({});

export default function Context(props: PropsWithChildren<any>) {
    const value = 1000;
    return (<myContext.Provider value={value}>{props.children}</myContext.Provider>)
}