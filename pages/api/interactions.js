const Type = {
    PING: 1
};
const Callback = {
    PONG: 1,
    CHANNEL_MESSAGE_WITH_SOURCE: 4,
    DEFERRED_CHANNEL_MESSAGE_WITH_SOURCE: 5,
    DEFERRED_UPDATE_MESSAGE: 6,
    UPDATE_MESSAGE: 7,
    APPLICATION_COMMAND_AUTOCOMPLETE_RESULT: 8
};
export default async function handler(request, response) {
    if(global.root)
        switch(request.method) {
            case "POST":
                switch(request.body.type) {
                    case Types.PING:
                        return response.status(200).json({
                            type: 1
                        });
                    default:
                        return response.status(200).json(
                            await global.root.getFrom("commands", request.body)
                        );
                };
            default:
                return response.status(405).json({
                    error: '405: Method Not Allowed',
                    code: 0
                });
        }
    else
        return response.status(503).json({
            error: 'USE_DEV_DOMAIN',
            code: 1
        });
};