// 2024/08/13時点で未実装。
// 申し訳ないです。
// https://techjourney-code.com/nextjs-middleware-auth/
// import { NextResponse} from "next/server";

// export async function middleware(request) {
//   let response = NextResponse.next({
//     request: {
//       headers: request.headers,
//     },
//   });

//   const path = new URL(request.url).pathname;

//   const user = "<ユーザを取得する関数>"

//   if (
//     (path === "/" ||
//       path === "/example-page1" ||
//       path === "/example-page2" ||
//       path === "/example-page3" ||
//       path === "/example-page4" ||
//       path === "/example-page5") &&
//     !user
//   ) {
//     return NextResponse.redirect(new URL("/login", request.url));
//   }

//   return response;
// }

// export const config = {
//   matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
// };