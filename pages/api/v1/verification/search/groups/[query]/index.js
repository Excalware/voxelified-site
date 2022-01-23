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
        const groupId = parseInt(query);
        if(groupId) {
            const res = await ky.get(`https://groups.roblox.com/v1/groups/${groupId}`).json();
            data = [res];
        } else {
            const res = await ky.get(`https://groups.roblox.com/v1/groups/search/lookup?groupName=${encodeURI(query)}`).json();
            data = res.data;
        }
        await ky.get(`https://thumbnails.roblox.com/v1/groups/icons?groupIds=${data.map(u => u.id).join(",")}&size=150x150&format=Png&isCircular=false`).json().then(images => {
            data = data.map(group => {
                group.image = images.data.find(i => i.targetId == group.id).imageUrl;
                return group;
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