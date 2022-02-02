import { supabase } from '../../../../../lib/supabase/client';
export default async function handler(request, response) {
    if(request.method !== "GET")
        return response.status(405).json({
            state: 'unsupported_method',
            message: 'Only GET is supported by this endpoint.',
            error: true
        });

    if(!request.headers.authorization)
        return response.status(401).json({
            state: 'missing_auth',
            message: 'The Authorization header is missing.',
            error: true
        });
    
    const { user, error } = await supabase.auth.api.getUser(
        request.headers.authorization,
    );
    if(error)
        return response.status(500).json({
            state: 'supabase_error',
            message: error.message,
            error: true
        });

    const { data, error2 } = await supabase
    .from('verificationUsers')
    .select('*')
    .eq('uid', user.id);
    if(error2)
        return response.status(500).json({
            state: 'supabase_error',
            message: error2.message,
            error: true
        });

    return response.status(200).json({
        data,
        error: false
    });
}