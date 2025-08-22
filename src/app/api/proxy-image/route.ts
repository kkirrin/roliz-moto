import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const imageUrl = searchParams.get('url');

    if (!imageUrl) {
        return NextResponse.json({ error: 'Missing image URL' }, { status: 400 });
    }

    try {
        const decodedUrl = decodeURIComponent(imageUrl);

        const response = await fetch(decodedUrl, {
            headers: {
                'Authorization': `Bearer ${process.env.NEXT_PUBLIC_JWT_KEY}`,
                'Accept': 'image/webp,image/apng,image/*,*/*;q=0.8',
            },
        });

        if (!response.ok) {
            return new NextResponse(null, { status: response.status });
        }

        const contentType = response.headers.get('content-type');
        const buffer = await response.arrayBuffer();

        return new NextResponse(buffer, {
            headers: {
                'Content-Type': contentType || 'image/jpeg',
                'Cache-Control': 'public, max-age=3600',
            },
        });
    } catch (err) {
        console.error("Error in proxy-image API:", err);
        return NextResponse.json({ error: 'Failed to proxy image' }, { status: 500 });
    }
}
