import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { wrapper } from '../../src/store'
import { useRouter } from 'next/router';
import { motion } from 'framer-motion'

const About = () => {
    const language = useSelector(state => state.language);
    // const dispatch = useDispatch();
    const route = useRouter();
  
    useEffect(()=>{
        // console.log(route)
    },[]);

    return (
        <div id="about">
            <motion.span initial={{scale:0}} animate={{scale:1}} exit={{scale:0}}>
                about {language}
            </motion.span>
        </div>
    )
}

export const getStaticProps = wrapper.getStaticProps( async ({ store, params }) => {
    store.dispatch({type:'UPDATE_LANGUAGE', language: params.lang})
    store.dispatch({type:'UPDATE_PAGE', page:'about'})
})
  
export const getStaticPaths = async () => {
    const lang = ['en'];

    const paths = lang.map((v)=>({
        params: { lang: v }
    }))
  
    return{ paths, fallback: false }
}


export default About;