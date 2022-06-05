import { createClient } from '@supabase/supabase-js';

import Store from '../store';
import { setProfile, setSession } from '../slices/user';
const supabase = createClient(
    "https://wbbclranhtvzzdnfxlbj.supabase.co",
    process.env.SUPABASE_SERVICE_ROLE ?? process.env.NEXT_PUBLIC_SUPABASE_ANON
);

class supautil {
    static getDisplayName() {
        const session = supabase.auth.session();
        if(session)
            return session.user.identities[0].identity_data.name;
        return "supautil:getDisplayName() failed";
    }

    static async getProfile() {
        const session = supabase.auth.session();
        if(session) {
            const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id);
            if(error)
                return console.error(error);

            return data[0];
        }
        return "supautil:getProfile() failed";
    }

    static logout() {
        return supabase.auth.signOut();
    }
}

//TODO: just rewrite everything
function login(session) {
    Store.dispatch(setSession(session));
    supautil.getProfile().then(profile =>
        Store.dispatch(setProfile(profile))
    );
}
const session = supabase.auth.session();
if(session)
    login(session);
supabase.auth.onAuthStateChange((event, session) => {
    if(event == 'SIGNED_IN')
        login(session);
});
export { supabase, supautil };