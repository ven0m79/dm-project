import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';
import {NextRequest, NextResponse} from 'next/server';

// 💡 Створюємо intl middleware один раз
const intlMiddleware = createMiddleware(routing);

export default function proxy(request: NextRequest) {
  const {nextUrl} = request;
  const {pathname, hostname} = nextUrl;

  // ---------------------------------------------------------------------------
  // 1. 🔁 301 redirect з www → canonical
  // ---------------------------------------------------------------------------
  if (hostname.startsWith('www.')) {
    const url = nextUrl.clone();
    url.hostname = hostname.replace(/^www\./, '');
    return NextResponse.redirect(url, 301);
  }

  // ---------------------------------------------------------------------------
  // 2. 🌍 next-intl routing
  // ---------------------------------------------------------------------------
  const response = intlMiddleware(request);

  // Якщо next-intl зробив redirect — одразу повертаємо
  if (response.headers.has('Location')) {
    return response;
  }

  // ---------------------------------------------------------------------------
  // 3. 🔁 Legacy redirect /home → /
  // ---------------------------------------------------------------------------
  if (pathname.endsWith('/home')) {
    const url = nextUrl.clone();
    url.pathname = pathname.replace(/\/home$/, '') || '/';
    return NextResponse.redirect(url, 301);
  }

  // ---------------------------------------------------------------------------
  // 4. 🧱 Заборона індексації тестових доменів
  // ---------------------------------------------------------------------------
  if (hostname.startsWith('test')) {
    response.headers.set('X-Robots-Tag', 'noindex, nofollow');
  }

  return response;
}

export const config = {
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)'
};
