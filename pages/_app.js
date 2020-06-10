import { useEffect } from 'react'
import { adjustFontSize } from '../globalFunc'
import { wrapper } from '../store'

// Components
import Main from './Main'

// scss
import '../scss/style.scss';


const MyApp = ({ Component, pageProps }) => {
    useEffect(()=>{
        adjustFontSize();
        window.addEventListener('resize', ()=>adjustFontSize());
        return () => {
            window.removeEventListener('resize', ()=>adjustFontSize());
        }
    },[])

    return (
        <Main>
            <Component {...pageProps} />
        </Main>
    )
}

export default wrapper.withRedux(MyApp);