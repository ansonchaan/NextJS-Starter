import { useEffect, useState, useRef } from 'react'
import { useSelector, useDispatch }  from 'react-redux';
import { SmoothScroll, usePrevious, adjustFontSize } from '../globalFunc'
import { wrapper } from '../src/store'
import { useRouter } from 'next/router';

// Components
// import Main from './Main'
import Nav from '../src/components/Nav'

// scss
import '../scss/style.scss';


const MyApp = ({ Component, pageProps }) => {
    const [page, setPage] = useState(null);

    const prevPage = usePrevious(page);
    const dispatch = useDispatch();
    const language = useSelector(state => state.language);
    const route = useRouter();
    const {pathname} = route;
    
    const scrollWrap = useRef(null);
    

    useEffect(()=>{
        const isMatch = pathname.match(/\/\[lang\]\/(\w*)/);
        setPage(isMatch ? pathname.match(/\/\[lang\]\/(\w*)/)[1] : 'home');
        if(page !== prevPage && page !== null){
            dispatch({type:'UPDATE_PAGE', page:page});
        }
    })

    useEffect(()=>{
        let smooth = new SmoothScroll(scrollWrap.current,(s, y, h) => {});
        return () => { 
            smooth.off();
            smooth = null;
        }
    },[])

    useEffect(()=>{
        adjustFontSize();
        window.addEventListener('resize', ()=>adjustFontSize());
        return () => {
            window.removeEventListener('resize', ()=>adjustFontSize());
        }
    },[])

    return (
        <div id="bodyWrap" className={language}>
            <div id="mainWrap" className={page}>
                <div ref={scrollWrap} id="scrollWrap">
                    <Component {...pageProps} />
                </div>
            </div>
            <Nav/>
        </div>
    )
}

export default wrapper.withRedux(MyApp);