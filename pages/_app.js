import { useEffect, useState, useRef } from 'react'
import { useSelector, useDispatch }  from 'react-redux'
import { usePrevious, adjustFontSize } from '../globalFunc'
// import LocomotiveScroll from 'locomotive-scroll'
import { AnimatePresence } from 'framer-motion'
import { wrapper } from '../src/store'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import Head from 'next/head'


// Components
// import Main from './Main'
import Nav from '../src/components/Nav'

// scss
import '../scss/style.scss';


const MyApp = ({ Component, pageProps, router }) => {
    const [page, setPage] = useState(null);

    const prevPage = usePrevious(page);
    const dispatch = useDispatch();
    const language = useSelector(state => state.language);
    const {asPath, pathname, basePath, route} = router;
    const scroll = useRef(null);
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
        }
    },[page])

    useEffect(()=>{
        adjustFontSize();
        window.addEventListener('resize', ()=>adjustFontSize());
        return () => {
            window.removeEventListener('resize', ()=>adjustFontSize());
        }
    },[])

    useEffect(()=>{
        import("locomotive-scroll").then(LM => {
            scroll.current = new LM.Smooth({
                el: scrollWrap.current,
                smooth: true
            });
        })
    
        return () => {
            if(scroll.current)
                scroll.current.destroy();
        }
    },[])
    
    const getTitle = () => {
        const title = asPath.replace(basePath, '').replace(/\?.+/g,'').split('/');
        title.splice(0,2);

        for(let i=0; i<title.length; i++){
            title[i] = decodeURIComponent(title[i].charAt(0).toUpperCase() + title[i].slice(1));
        }

        return title.length ? title.reverse().join(' | ') : 'title';
    }

    const onExitComplete = () => {
        if(scroll.current){
            scroll.current.destroy();
            scroll.current.init();
        }
    }

    return (
        <>
            <Head>
                <title>{getTitle()}</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <div id="bodyWrap" className={`${language} ${page}`}>
                <Nav/>
                <div ref={scrollWrap} id="scrollWrap">
                    <AnimatePresence initial={false} exitBeforeEnter onExitComplete={onExitComplete}>
                        <Component {...pageProps} key={route}/>
                    </AnimatePresence>
                </div>
            </div>
        </>
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