import { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { wrapper } from '../../src/store'
import { useRouter } from 'next/router';
import { motion } from 'framer-motion'

const Home = () => {
  const language = useSelector(state => state.language);
  // const dispatch = useDispatch();
  // const route = useRouter();
  const scrollWrap = useRef(null);
  
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

  return (
    <div ref={scrollWrap} id="scrollWrap">
      <div id="home">
        <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
          Home {language}
        </motion.div>
      </div>
    </div>
  )
}

export const getStaticProps = wrapper.getStaticProps( async ({ store, params }) => {
  store.dispatch({type:'UPDATE_LANGUAGE', language: params.lang})
  store.dispatch({type:'UPDATE_PAGE', page:'home'})
})

export const getStaticPaths = async () => {
  const lang = ['en'];

  const paths = lang.map((v)=>({
      params: { lang: v }
  }))

  return{ paths, fallback: false }
}


export default Home;