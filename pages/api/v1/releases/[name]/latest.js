import ky from 'ky';
import lt from 'semver/functions/lt';
import { Octokit } from "@octokit/rest";

const octokit = new Octokit();
const applications = {
    'mdpkm': 'blookerss',
    'goggle-trans': 'blookerss'
};

async function getSignature(name, assets) {
    const signature = assets.find(asset => asset.name === `${name}.sig`);
    if(!signature)
        return null;

    const response = await ky.get(signature.browser_download_url).text();
    return response;
}

let latest = {}, cached = 0;
export default async function handler(request, response) {
    if(request.method !== "GET")
        return response.status(405).json({
            state: 'unsupported_method',
            message: 'Only GET is supported by this endpoint.',
            error: true
        });

    const { name, target, current } = request.query;
    const owner = applications[name];
    if(!owner)
        return response.status(400).json({
            state: 'invalid_application',
            message: `${name} does not exist.`,
            error: true
        });
    
    if(!latest[name] || (Date.now() - cached) >= 10 * 60000) {
        const { data: release } = await octokit.rest.repos.getLatestRelease({
            repo: name,
            owner
        });

        latest[name] = {
            name: release.tag_name,
            notes: release.name,
            pub_date: release.published_at,
            platforms: {}
        };
        for (const { name: aname, browser_download_url } of release.assets) {
            const platform = [
                [/\.msi\.zip$/, 'windows-x86_64'],
                [/\.AppImage\.zip$/, 'linux']
            ].find(p => p[0].test(browser_download_url))?.[1];
            if (!platform)
                continue;
            latest[name].platforms[platform] = {
                url: browser_download_url,
                signature: await getSignature(aname, release.assets)
            };
        }
    }
    return response.status(200).json(latest[name]);
}