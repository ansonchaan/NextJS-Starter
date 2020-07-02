import { useEffect, useState, useRef } from 'react'
import { useSelector, useDispatch }  from 'react-redux';
import { SmoothScroll, usePrevious, adjustFontSize } from '../globalFunc'
import { wrapper } from '../src/store'
import { useRouter } from 'next/router';
import Head from 'next/head'

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
    const {asPath, pathname, basePath} = route;
    
    const smooth = useRef(null);
    const scrollWrap = useRef(null);
    

    useEffect(()=>{
        const urlArray = pathname.split('/');
        urlArray.splice(0,1);
        if('/'+urlArray[0] === basePath){
            urlArray.splice(0,1);
        }
        const isSection = urlArray[2] ? urlArray[2].match(/section/g) : false;
        let isPost;

        isSection ? 
            isPost = urlArray[3] ? urlArray[3].match(/post/g) : false
        :
            isPost = urlArray[2] ? urlArray[2].match(/post/g) : false
        setPage(isPost ? urlArray[1]+'-post' : urlArray[1] ? urlArray[1] : 'home');
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
    
    const getTitle = () => {
        const title = asPath.replace(basePath, '').split('/');
        title.splice(0,2);

        for(let i=0; i<title.length; i++){
            title[i] = decodeURIComponent(title[i].charAt(0).toUpperCase() + title[i].slice(1));
        }

        return title.length ? title.reverse().join(' | ') : 'Barwo';
    }

    return (
        <>
            <Head>
                <title>{getTitle()}</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <div id="bodyWrap" className={language}>
                <div id="mainWrap" className={page}>
                    <div ref={scrollWrap} id="scrollWrap">
                        <Component {...pageProps} />
                    </div>
                </div>
                <Nav/>
            </div>
        </>
    )
}

export default wrapper.withRedux(MyApp);