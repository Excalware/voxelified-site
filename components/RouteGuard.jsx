import ky from 'ky';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

import { supabase } from '/lib/supabase/client';

function checkSession(router, session) {
    if(!session)
        router.push('/login');
}

export default function RouteGuard({ children }) {
    const router = useRouter();
    useEffect(() => {
        checkSession(router, supabase.auth.session())
        supabase.auth.onAuthStateChange(async (event, session) => {
            await ky.post('/api/v1/auth/authenticate', {
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json'
                },
                json: { event, session }
            });
            checkSession(router, session)
        });
    });
    
    return children;
};