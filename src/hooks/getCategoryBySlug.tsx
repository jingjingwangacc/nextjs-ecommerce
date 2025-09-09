import { createClient, OAuthStrategy } from "@wix/sdk";
import { wixClientServer } from "@/lib/wixClientServer";


export async function getCategoryBySlug(slug: string) {
    const wixClient = await wixClientServer();
    const { categories: cats } = await wixClient.categories.searchCategories({
        filter: { slug }
    }, {
        treeReference: { appNamespace: "@wix/stores", treeKey: null }
    });

    return cats?.[0] ?? null;
}
