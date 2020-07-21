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

// get global data

// MyApp.getInitialProps = async ({ctx}) => {
    // const g = await fetch(getApiPath('global', ctx.query.lang))
    // const globalData = await g.json(); 
    // let pageProps = {};
    // if (Component.getInitialProps) {
    //   pageProps = await Component.getInitialProps(ctx);
    // }
    // return { pageProps: { ...pageProps, globalData} };
// };

export default wrapper.withRedux(MyApp);