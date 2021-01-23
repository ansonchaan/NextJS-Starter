import Link from 'next/link'
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';

const Nav = () => {
    const language = useSelector(state => state.language);
    const dispatch = useDispatch();
    const route = useRouter();

    const onChangeLang = (_lang) => {
        // route.replace(route.pathname, `${route.pathname.replace('[lang]',_lang)}`);
        dispatch({type:'UPDATE_LANGUAGE', language: _lang});
    }

    return(
        <div id="nav">
            <Link href="/[lang]" as={`/${language}`}><a>Home</a></Link>
            <Link href="/[lang]/about" as={`/${language}/about`}><a>About</a></Link>
            {/* <Link 
                href={`/[lang]${page !== 'home' ? `/${page.replace('detail','')}${route.query.section ? `/[section]` : ''}${route.query.detail ? `/[detail]` : ''}` : ''}`} 
                as={`/en${page !== 'home' ? `/${page.replace('detail','')}${route.query.section ? `/${route.query.section}` : ''}${route.query.detail ? `/${route.query.detail}` : ''}` : ''}`}
            >
                <a onClick={()=>onChangeLang('en')}>EN</a>
            </Link>
            <br/>
            <Link href={`/[lang]${page !== 'home' ? `/${page.replace('detail','')}${route.query.section ? `/[section]` : ''}${route.query.detail ? `/[detail]` : ''}` : ''}`} as={`/en${page !== 'home' ? `/${page.replace('detail','')}${route.query.section ? `/${route.query.section}` : ''}${route.query.detail ? `/${route.query.detail}` : ''}` : ''}`}>
                <a onClick={()=>onChangeLang('tc')}>Tc</a>
            </Link>
            <br/>
            <Link href={`/[lang]${page !== 'home' ? `/${page.replace('detail','')}${route.query.section ? `/[section]` : ''}${route.query.detail ? `/[detail]` : ''}` : ''}`} as={`/en${page !== 'home' ? `/${page.replace('detail','')}${route.query.section ? `/${route.query.section}` : ''}${route.query.detail ? `/${route.query.detail}` : ''}` : ''}`}>
                <a onClick={()=>onChangeLang('sc')}>sc</a>
            </Link> */}
        </div>
    )
}

export default Nav;