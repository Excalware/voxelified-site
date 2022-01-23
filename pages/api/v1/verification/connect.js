import * as uuid from 'uuid';
import { supabase, supautil } from '../../../../lib/supabase/client';
export default async function handler(request, response) {
    if(request.method !== "POST")
        return response.status(405).json({
            state: 'unsupported_method',
            message: 'Only POST is supported by this endpoint.',
            error: true
        });

    if(!request.headers.authorization)
        return response.status(401).json({
            state: 'missing_auth',
            message: 'The Authorization header is missing.',
            error: true
        });

    if(!request.body)
        return response.status(400).json({
            state: 'missing_body',
            message: 'The request body is missing',
            error: true
        });

    const { userId } = request.body;
    if(typeof userId != "number")
        return response.status(400).json({
            state: 'invalid_userId',
            message: 'body.userId is invalid.',
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
    .eq('userId', userId);
    if(error2)
        return response.status(500).json({
            state: 'supabase_error',
            message: error2.message,
            error: true
        });

    const code = uuid.v5(userId.toString(), user.id);
    if(data.length == 0) {
        const { data2, error3 } = await supabase
        .from('verificationUsers')
        .insert([
            {
                userId,
                code,
                uid: user.id
            }
        ]);
        return response.status(200).json({
            code,
            data: data2,
            error: false
        });
    }

    return response.status(200).json({
        state: "already_connected",
        code,
        data: data[0],
        error: false
    });
}