import { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { wrapper } from '../../src/store'
// import { useRouter } from 'next/router';
import { motion } from 'framer-motion'

const Home = () => {
  const language = useSelector(state => state.language);
  // const dispatch = useDispatch();
  // const route = useRouter();

  return (
    <div id="home">
      <motion.span initial={{scale:0}} animate={{scale:1}} exit={{scale:0}}>
        Home {language}
      </motion.span>
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