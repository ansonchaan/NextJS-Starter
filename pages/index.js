import { useEffect } from "react";
import { useRouter } from 'next/router';
import Home from './[lang]';

const Index = () => {
    const route = useRouter();
    const { basePath } = route;

    useEffect(()=>{
        // route.replace('/[lang]', '/en', {shallow:true});
        window.history.pushState(null,null,`${basePath}/en`)
    })

    return (
        <Home/>
    )
}

export default Index;