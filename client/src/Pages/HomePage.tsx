import React, { useContext } from 'react';
import { myContext } from './Context';

export default function HomePage() {
    const user = useContext(myContext);
    return (<div>HomePage, Currently logged in user is  { user ? user.username : 'Not logged in.'}</div>);
}