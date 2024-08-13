// NextjsでBasic認証を構築する場合
import { NextResponse } from 'next/server';

export async function GET(request) {
    const authHeader = request.headers.get('authorization');
    
    if (!authHeader || !authHeader.startsWith('Basic ')) {
        return new NextResponse('Unauthorized', { status: 401, headers: { 'WWW-Authenticate': 'Basic realm="Login Required"' } });
    }

    const base64Credentials = authHeader.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
    const [username, password] = credentials.split(':');

    const validUsername = process.env.BASIC_AUTH_USERNAME;
    const validPassword = process.env.BASIC_AUTH_PASSWORD;

    if (username === validUsername && password === validPassword) {
        return new NextResponse('Authorized', { status: 200 });
    } else {
        return new NextResponse('Unauthorized', { status: 401, headers: { 'WWW-Authenticate': 'Basic realm="Login Required"' } });
    }
}
