import ky from 'ky';
export default async function handler(request, response) {
    if(request.method !== "GET")
        return response.status(405).json({
            state: 'unsupported_method',
            message: 'Only GET is supported by this endpoint.',
            error: true
        });

    const { query } = request.query;
    let data;
    try {
        const { roles } = await ky.get(`https://groups.roblox.com/v1/groups/${query}/roles`).json();
        data = roles;
    } catch(err) {
        response.status(500).json({
            state: "internal_error",
            message: "Internal Request Error",
            error: true
        });
        throw err;
    }
    return response.status(200).json({
        data,
        error: false
    });
}