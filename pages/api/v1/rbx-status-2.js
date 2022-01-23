import got from 'got';
let apiList = [
    //"abtesting",
    "accountinformation",
    "accountsettings",
    "adconfiguration",
    "ads",
    "api",
    "assetdelivery",
    "auth",
    "avatar",
    "badges",
    "billing",
    "catalog",
    "cdnproviders",
    "chat",
    //"chatmoderation",
    "clientsettings",
    //"contacts",
    "contentstore",
    "develop",
    //"discussions",
    //"economy",
    //"economycreatorstats",
    //"engagementpayouts",
    "followings",
    "friends",
    //"gameinternationalization",
    //"gamejoin",
    //"gamepersistence",
    "games",
    //"gamepasses",
    "groups",
    //"groupsmoderation",
    "inventory",
    //"itemconfiguration",
    //"locale",
    //"localizationtables",
    //"metrics",
    //"midas",
    "notifications",
    "points",
    "premiumfeatures",
    "presence",
    "privatemessages",
    "publish",
    //"punishments",
    "search",
    //"share",
    "textfilter",
    "thumbnails",
    //"thumbnailsresizer",
    "trades",
    //"translationroles",
    //"translations",
    "twostepverification",
    "users",
    //"usermoderation",
    "voice"
];
export default async function handler(request, response, shardManager) {
    if(request.method !== "GET")
        return response.status(405);
    let apis = [[], apiList];
    for (let i = 0; i < apiList.length; i++) {
        let apiName = apiList[i];
        const data = await got.get(`https://${apiName}.roblox.com/docs`, {
            retry: { limit: 0 }
        }).catch(err => {});
        if(data && data.statusCode == 200)
            apis[0].push(apiName);
    }
    response.status(200).json({
        apis
    });
}