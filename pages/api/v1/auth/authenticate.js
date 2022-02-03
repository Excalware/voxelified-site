import { supabase } from '../../../../lib/supabase/client';
export default async function handler(request, response) {
    if(request.method !== "POST")
        return response.status(405).json({
            state: 'unsupported_method',
            message: 'Only POST is supported by this endpoint.',
            error: true
        });

    if(!request.body)
        return response.status(400).json({
            state: 'missing_body',
            message: 'The request body is missing',
            error: true
        });

    const { event, session } = request.body;
    if(typeof event != "string")
        return response.status(400).json({
            state: 'invalid_code',
            message: 'body.event is invalid.',
            error: true
        });
    if(typeof session != "object")
        return response.status(400).json({
            state: 'invalid_method',
            message: 'body.session is invalid.',
            error: true
        });
    return supabase.auth.api.setAuthCookie(request, response);
}