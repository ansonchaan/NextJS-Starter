import { useEffect } from 'react';
import { useDispatch, connect } from 'react-redux';
import { wrapper } from '../store'

const Home = () => {
  const dispatch = useDispatch();
  
  useEffect(()=>{
    dispatch({type:'UPDATE_PAGE', page:'home'});
  },[]);

  return (
    <div id="home">
      <div id="featuredVideo">
        <div className="bigSectionTitle sb center">海納百川、靈活多變</div>
      </div>
      <div id="latestShow">
        <div className="sectionTitle sb center">最新劇目</div>
      </div>
    </div>
  )
}

export const getStaticProps = wrapper.getStaticProps( async ({ store }) => {
  store.dispatch({type:'UPDATE_PAGE', page:'home'})
})

export default Home;