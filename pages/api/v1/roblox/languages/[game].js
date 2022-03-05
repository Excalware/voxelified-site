import ky from 'ky';
export default async function handler(request, response) {
    if(request.method !== "GET")
        return response.status(405).json({
            state: 'unsupported_method',
            message: 'Only GET is supported by this endpoint.',
            error: true
        });

    const { game } = request.query;
    return response.status(200).json(
        await ky.get(`https://gameinternationalization.roblox.com/v1/supported-languages/games/${game}`).json()
    );
}