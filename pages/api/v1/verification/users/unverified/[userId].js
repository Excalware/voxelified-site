export default async function handler(request, response, shardManager) {
    return response.status(426).send({
        state: 'requires_api_v2',
        message: 'This endpoint is only available on v2',
        error: true
    });
}