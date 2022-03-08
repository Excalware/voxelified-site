import ky from 'ky';
import * as uuid from 'uuid';
import { supabase } from '/lib/supabase/client';
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

    const { code, method } = request.body;
    if(typeof code != "string" || !uuid.validate(code))
        return response.status(400).json({
            state: 'invalid_code',
            message: 'body.code is invalid.',
            error: true
        });
    if(typeof method != "number" || (method < 0 || method > 2))
        return response.status(400).json({
            state: 'invalid_method',
            message: 'body.method is invalid.',
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
    .select('userId')
    .match({ code, verified: false });
    if(error2)
        return response.status(500).json({
            state: 'supabase_error',
            message: error2.message,
            error: true
        });

    if(data.length == 0)
        return response.status(409).json({
            state: 'not_found',
            message: 'No pending accounts were found.',
            error: true
        });

    switch(method) {
        case 0:
            const { description } = await ky.get(`https://users.roblox.com/v1/users/${data[0].userId}`).json();
            if(!description.includes(code))
                return response.status(400).json({
                    state: 'method_failed',
                    message: 'Profile Description does not contain the code.',
                    error: true
                });
            break;
        default:
            return response.status(409).json({
                state: 'method_unavailable',
                message: `Method ${method} is unavailable.`,
                error: true
            });
    }

    const { data2, error3 } = await supabase
    .from('verificationUsers')
    .update({ verified: true })
    .match({ code: code });
    if(error3)
        return response.status(500).json({
            state: 'supabase_error',
            message: error3.message,
            error: true
        });

    return response.status(200).json({
        state: 'success',
        error: false
    });
}