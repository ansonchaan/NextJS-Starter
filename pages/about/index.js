import { useEffect } from 'react';
import { useDispatch, connect } from 'react-redux';
import { wrapper } from '../../store'

const About = () => {
    const dispatch = useDispatch();
  
    useEffect(()=>{
      dispatch({type:'UPDATE_PAGE', page:'about'});
    },[]);

    return (
        <div id="about">
            about
        </div>
    )
}

export const getStaticProps = wrapper.getStaticProps( async ({ store }) => {
    store.dispatch({type:'UPDATE_PAGE', page:'about'})
})

export default About;