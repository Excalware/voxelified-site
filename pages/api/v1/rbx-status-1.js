import got from 'got';
export default async function handler(request, response, shardManager) {
    if(request.method !== "GET")
        return response.status(405);
    const data = await got.get('https://roblox.com', {
        retry: { limit: 0 }
    }).catch(err => {
        response.status(200).json({
            status: 1
        });
    });

    if(data) {
        if(data.body.toLowerCase().includes("maintenance"))
            response.status(200).json({
                status: 2
            });
        else if(data.statusCode != 200)
            response.status(200).json({
                status: 1,
                text: data.statusMessage
            });
        else
            response.status(200).json({
                status: 0
            });
    }
}