import { useSelector }  from 'react-redux';

const Main = (props) => {
    const page = useSelector(state => state.page)
    
    return (
        <div id="mainWrap" className={page}>
            <div id="scrollWrap">
                {props.children}
            </div>
        </div>
    )
}

export default Main;