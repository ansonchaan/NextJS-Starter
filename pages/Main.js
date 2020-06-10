import { useEffect } from 'react'
import { useSelector, useDispatch }  from 'react-redux';
import { SmoothScroll } from '../globalFunc'
// import { useRouter } from 'next/router';

// Components
import Nav from '../components/Nav'

const Main = (props) => {
    const page = useSelector(state => state.page);
    // const dispatch = useDispatch();
    // const route = useRouter();
    
    useEffect(()=>{
        let smooth = new SmoothScroll('#scrollWrap',(s, y, h) => {});
        smooth.on();
        return () => { 
            smooth.off();
            smooth = null;
        }
    },[])

    // useEffect(()=>{
        // const {query} = route;
        // dispatch({type:'UPDATE_LANGUAGE', language: query.lang});
    // },[])

    return (
        <>
            <div id="mainWrap" className={page}>
                <div id="scrollWrap">
                    {props.children}
                </div>
            </div>
            <Nav/>
        </>
    )
}

export default Main;