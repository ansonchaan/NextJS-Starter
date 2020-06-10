import { useEffect } from 'react'
import { SmoothScroll, adjustFontSize } from '../globalFunc'
import { wrapper } from '../store'

// Components
import Main from './Main'
import Nav from '../components/Nav'

// scss
import '../scss/style.scss';


const MyApp = ({ Component, pageProps }) => {
    useEffect(()=>{
        let smooth = new SmoothScroll('#scrollWrap',(s, y, h) => {});
        smooth.on();

        adjustFontSize();
        window.addEventListener('resize', ()=>adjustFontSize());
        return () => {
            smooth.off();
            smooth = null;

            window.removeEventListener('resize', ()=>adjustFontSize());
        }
    },[])

    return (
        <>
            <Main>
                <Component {...pageProps} />
            </Main>
            <Nav/>
        </>
    )
}

export default wrapper.withRedux(MyApp);