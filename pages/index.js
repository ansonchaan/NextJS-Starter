import { useEffect } from "react";
import { useRouter } from 'next/router';

const Index = () => {
    const route = useRouter();

    useEffect(()=>{
        route.push('/[lang]', '/en');
    })

    return (
        <div>loading...</div>
    )
}

export default Index;