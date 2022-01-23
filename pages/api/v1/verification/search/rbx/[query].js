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
        const res = await ky.get(`https://users.roblox.com/v1/users/search?keyword=${encodeURI(query)}`).json();
        data = res.data;
        await ky.get(`https://thumbnails.roblox.com/v1/users/avatar-headshot?userIds=${data.map(u => u.id).join(",")}&size=48x48&format=Png&isCircular=true`).json().then(images => {
            data = data.map(user => {
                user.image = images.data.find(i => i.targetId == user.id).imageUrl;
                return user;
            });
        });
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