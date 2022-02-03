import { useEffect } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';

import Grid from './Grid';
import Spinner from './Spinner';

import { supabase } from '../lib/supabase/client';

const SpinnerContainer = styled(Grid)`
    width: 100vw;
    height: 100vh;
    align-items: center;
    justify-content: center;
`;

export default function RouteGuard({ children }) {
    const router = useRouter();
    const session = supabase.auth.session();
    useEffect(() => {
        if (!session) {
            router.push('/login');
        }
    });
    if(!session)
        return <SpinnerContainer>
            <Spinner/>
        </SpinnerContainer>;
    return children;
};