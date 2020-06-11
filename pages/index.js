import { useEffect } from "react";
import { useRouter } from 'next/router';
import Home from './[lang]';

const Index = () => {
    const route = useRouter();

    useEffect(()=>{
        route.replace('/[lang]', '/en');
    })

    return (
        <Home/>
    )
}

export default Index;