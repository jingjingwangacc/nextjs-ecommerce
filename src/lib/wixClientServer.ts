import { createClient, OAuthStrategy} from "@wix/sdk";
import {products, collections} from '@wix/stores'
import { cookies } from "next/headers";

const cookieStore = cookies()
const refreshToken = JSON.parse(cookieStore.get('refreshToken')?.value||'{}')


export const wixClientServer = createClient({
    modules: {
      products,
      collections,
    },
    auth: OAuthStrategy({
      clientId: process.env.NEXT_PUBLIC_WIX_CLIENT_ID! ,
      tokens: {
        refreshToken,
        accessToken: {value: "", expiresAt: 0,}
      },
    }),
  });