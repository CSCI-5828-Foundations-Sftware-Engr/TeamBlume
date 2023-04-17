import { Session } from '@supabase/auth-helpers-react';
import Link from 'next/link'

import HeaderUserOptions from './HeaderUserOptions';

interface Props {
    session : Session;
}

const Header = ({session} : Props) => {

    return (
      <div className="global-header">
        <div className="logo">
            <Link href="/"><h2>PACom</h2></Link>
        </div>
        {session ? (
        <div className="header-elements nav-buttons">

            <HeaderUserOptions session={session}/>
            
        </div>
        
        ) : (<></>)

        }
      </div>
    );
}

export default Header;