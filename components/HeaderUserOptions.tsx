import {
  Session,
  useSession,
  useSupabaseClient
} from '@supabase/auth-helpers-react';

import AccountDetails from './AccountDetails';
import { Database } from '../utils/database.types';

import { useRouter } from 'next/router';

import Link from 'next/link';
// import { Link } from "react-router-dom";
// import Link from "react-dom/client";

import { Dropdown, Text, Grid, User } from '@nextui-org/react';
import Account from '../pages/auth/Account';

interface Props {
  session: Session;
}

const HeaderUserOptions = ({ session }: Props) => {
  const supabase = useSupabaseClient<Database>();
  const accountDetails = AccountDetails({ session }) || '';
  const router = useRouter();

  // function reloadAccountPage(){
  //     console.log(<Account session={session} />);
  //     document.getElementById('global-container').innerHTML = <Account session={session} />;
  // }

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
              name={accountDetails ? accountDetails.username : ''}
              text={session.user.email?.charAt(0)}
            />
          </Dropdown.Trigger>
          <Dropdown.Menu
            color="primary"
            aria-label="User Actions"
            disabledKeys={['profile']}
          >
            <Dropdown.Item
              key="profile"
              css={{ height: '$18' }}
              textValue="profile description"
            >
              <Text b color="inherit" css={{ d: 'flex' }}>
                Signed in as
              </Text>
              <Text b color="inherit" css={{ d: 'flex' }}>
                {session.user.email}
              </Text>
            </Dropdown.Item>
            <Dropdown.Item
              key="account"
              color="primary"
              withDivider
              textValue="account edit page"
            >
              <Link href="/auth/Account">
                <div color="inherit" className="header_dropdown_option">
                  Account
                </div>
              </Link>
              {/* <Link to="/auth/Account"><div color="inherit" className="header_dropdown_option">Account</div></Link> */}
              {/* <div color="inherit" className="header_dropdown_option" onClick={()=>{}>Account 2</div> */}
            </Dropdown.Item>
            <Dropdown.Item
              key="logout"
              color="error"
              withDivider
              textValue="logout"
            >
              <div
                color="inherit"
                className="header_dropdown_option"
                onClick={() => {
                  supabase.auth.signOut();
                }}
              >
                Log Out
              </div>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Grid>
    </Grid.Container>
  );
};

export default HeaderUserOptions;
