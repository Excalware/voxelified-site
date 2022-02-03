import { supabase } from './supabase/client';
export async function getServerSideProps({ req }) {
    const { user } = await supabase.auth.api.getUserByCookie(req);
    if (!user) {
        return { props: {}, redirect: { destination: '/login', permanent: false } };
    }
  
    return { props: { user } };
};