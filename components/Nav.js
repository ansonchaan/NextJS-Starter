import Link from 'next/link'
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';

const Nav = () => {
    const language = useSelector(state => state.language);
    const dispatch = useDispatch();
    const route = useRouter();

    const onChangeLang = (_lang) => {
        route.replace(route.pathname, `${route.pathname.replace('[lang]',_lang)}`);
        dispatch({type:'UPDATE_LANGUAGE', language: _lang});
    }

    return(
        <div id="nav">
            <Link href="/[lang]" as={`/${language}`}><a>Home</a></Link>
            <Link href="/[lang]/about" as={`/${language}/about`}><a>About</a></Link>
            <br/>
            <br/>
            <div onClick={()=>onChangeLang('en')}>EN</div>
            <br/>
            <div onClick={()=>onChangeLang('tc')}>TC</div>
            <br/>
            <div onClick={()=>onChangeLang('sc')}>SC</div>
        </div>
    )
}

export default Nav;