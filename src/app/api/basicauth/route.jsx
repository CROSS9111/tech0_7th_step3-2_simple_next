// NextjsでBasic認証を構築する場合
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request) {
    // クエリパラメータを取得
    const { searchParams } = new URL(request.url);
    const path = searchParams.get('path');
    const realm = searchParams.get('realm');

    // Authorizationヘッダーを取得
    const authHeader = request.headers.get('authorization');

    if (!authHeader) {
        return new NextResponse('Unauthorized', { 
            status: 401, 
            headers: { 'WWW-Authenticate': `Basic realm="${realm || 'Login Required'}"` } 
        });
    }

    try {
        // `http://127.0.0.1:5000/api/admin`にリクエストを送信
        const response = await fetch('http://127.0.0.1:5000/api/admin', {
            method: 'GET',
            headers: {
                'Authorization': authHeader  // クライアントからの認証情報をそのまま転送
            }
        });

        if (response.ok) {
            const data = await response.json(); // JSONレスポンスを取得
            return new NextResponse(JSON.stringify(data), { status: 200 });
        } else {
            return new NextResponse('Unauthorized', { 
                status: 401, 
                headers: { 'WWW-Authenticate': `Basic realm="${realm}"` } 
            });
        }
    } catch (error) {
        console.error('Error while authenticating:', error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}

