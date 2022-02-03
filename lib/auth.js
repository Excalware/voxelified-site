import { useRouter } from 'next/router';
import { supabase } from './supabase/client';

function stringToArrayBuffer(str) {
	var array = new Uint8Array(str.length);
	for (var i = 0; i < str.length; i++) {
		array[i] = str.charCodeAt(i);
	}
	return array.buffer
}

export default class Auth {
    async setupFaceTouchID() {
        const { user, access_token } = supabase.auth.session();
        const profile = await supautil.getProfile();
        await navigator.credentials.create({
            publicKey: {
                rp: {
                    name: "voxelified.com"
                },
                user: {
                    id: stringToArrayBuffer(user.id),
                    name: user.email,
                    displayName: profile.username
                },
                challenge: stringToArrayBuffer(access_token),
                attestation: "direct",
                pubKeyCredParams: [
                    {
                        type: "public-key",
                        alg: -7
                    }
                ],
                authenticatorSelection: {
                    authenticatorAttachment: "platform"
                }
            }
        });
    }
};

export async function getServerSideProps({ req }) {
    if(process.env.NODE_ENV == "production") {
        const { user } = await supabase.auth.api.getUserByCookie(req);
        if (!user) {
            return { props: {}, redirect: { destination: '/login', permanent: false } };
        }
    
        return { props: { user } };
    }
    return { props: {} };
};