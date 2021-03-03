import React, { useContext } from 'react';
import { myContext } from './Context';

export default function HomePage() {
    const cxt = useContext(myContext);
    return (<div>HomePage { cxt}</div>);
}