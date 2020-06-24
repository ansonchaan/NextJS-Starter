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
    const {pathname, basePath} = route;
    
    const smooth = useRef(null);
    const scrollWrap = useRef(null);
    

    useEffect(()=>{
        const urlArray = pathname.split('/');
        urlArray.splice(0,1);
        if('/'+urlArray[0] === basePath){
            urlArray.splice(0,1);
        }
        const isMatch = urlArray[1];
        setPage(isMatch ? urlArray[1] + (urlArray[2] ? 'detail' : '') : 'home');
    },[pathname])
    
    useEffect(()=>{
        if(page !== prevPage && page !== null){
            dispatch({type:'UPDATE_PAGE', page:page});
            if(smooth.current)
                smooth.current.reset();
        }
    },[page])

    useEffect(()=>{
        smooth.current = new SmoothScroll(scrollWrap.current,(s, y, h) => {});
        return () => { 
            smooth.current.off();
            smooth.current = null;
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