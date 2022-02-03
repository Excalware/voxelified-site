import { supabase } from '../../../../lib/supabase/client';
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
            message: 'The request body is missing.',
            error: true
        });

    const { body } = request;
    if(typeof request.id == "string" || request.type !== "public-key")
        return response.status(400).json({
            state: 'invalid_body',
            message: 'The request body is invalid.',
            error: true
        });
    console.log(body);

    const { user, error } = await supabase.auth.api.getUser(
        request.headers.authorization,
    );

    return supabase.auth.api.setAuthCookie(request, response);
}