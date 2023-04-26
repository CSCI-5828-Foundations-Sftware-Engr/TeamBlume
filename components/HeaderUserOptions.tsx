import { Session, useSession, useSupabaseClient } from '@supabase/auth-helpers-react';

import AccountDetails from './AccountDetails';
import AccountImage from './AccountImage';
import { Database } from '../utils/database.types';

import { useRouter } from "next/router";

import Link from 'next/link'

import { Dropdown, Text, Grid, User } from "@nextui-org/react";

interface Props {
    session : Session;
}


const HeaderUserOptions = ({session} : Props) => {

    const supabase = useSupabaseClient<Database>();
    const accountDetails = AccountDetails({session}) || "";
    const avatarImg = AccountImage({avatar_url : (accountDetails.avatar_url!=null ? accountDetails.avatar_url : "")}) || "";
    const router = useRouter();

    return (
        <Grid.Container justify="flex-start" gap={2}>
            <Grid>
                <Dropdown placement="bottom-left">
                <Dropdown.Trigger>
                    <User
                    bordered
                    as="button"
                    size="lg"
                    color="primary"
                    src={avatarImg ? avatarImg : ''}
                    name={accountDetails ? accountDetails.username : ''}
                    text={session.user.email?.charAt(0)}
                    />
                </Dropdown.Trigger>
                <Dropdown.Menu color="primary" aria-label="User Actions" disabledKeys={["profile"]}>
                    <Dropdown.Item key="profile" css={{ height: "$18" }} textValue='profile description'>
                    <Text b color="inherit" css={{ d: "flex" }}>
                        Signed in as
                    </Text>
                    <Text b color="inherit" css={{ d: "flex" }}>
                        {session.user.email}
                    </Text>
                    </Dropdown.Item>
                    <Dropdown.Item key="account" color="primary" withDivider textValue='account edit page'>
                    <Link href='/auth/Account' ><div color="inherit" className="header_dropdown_option">Account</div></Link>
                    </Dropdown.Item>
                    <Dropdown.Item key="logout" color="error" withDivider textValue='logout'>
                    <div color="inherit" className="header_dropdown_option" onClick={()=>{supabase.auth.signOut();}}>Log Out</div>
                    </Dropdown.Item>
                </Dropdown.Menu>
                </Dropdown>
            </Grid>
            </Grid.Container>
    );

}

export default HeaderUserOptions;