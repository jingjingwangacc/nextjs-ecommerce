import { createClient, OAuthStrategy } from "@wix/sdk";
import { products, collections } from '@wix/stores'
import { cookies } from "next/headers";
import { categories } from "@wix/categories";
import { productsV3 } from "@wix/stores";




export const wixClientServer = async () => {


    let refreshToken;

    try {
        const cookieStore = cookies()
        refreshToken = JSON.parse(cookieStore.get('refreshToken')?.value || '{}')
    } catch (e) {

    }


    const wixClient = createClient({
        modules: {
            products,
            categories,
        },
        auth: OAuthStrategy({
            clientId: process.env.NEXT_PUBLIC_WIX_CLIENT_ID!,
            tokens: {
                refreshToken,
                accessToken: { value: "", expiresAt: 0, }
            },
        }),
    });

    return wixClient;
}