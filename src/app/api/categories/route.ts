import { NextResponse } from 'next/server';
import { wixClientServer } from '@/lib/wixClientServer';

export async function GET() {
  try {
    const wixClient = await wixClientServer();
    const cats = await wixClient.categories.searchCategories({}, {
      treeReference: {
        "appNamespace": "@wix/stores",
        "treeKey": null
      }
    });

    return NextResponse.json({ categories: cats.categories || [] });
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json({ categories: [] }, { status: 500 });
  }
}
