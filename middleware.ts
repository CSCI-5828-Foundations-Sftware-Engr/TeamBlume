import { NextRequest, NextResponse } from 'next/server';
import { createMiddlewareSupabaseClient } from '@supabase/auth-helpers-nextjs';

/**
 * @param req
 * @returns void
 * @description This is a middleware that checks if the user is logged in. If not, it redirects to the homepage.
 * This is useful for pages that require a user to be logged in.
 * This middleware by default applies to all routes that start with /api.
 */
export async function middleware(req: NextRequest) {
  const pathName = req.nextUrl.pathname;
  const res = NextResponse.next();

  if (
    pathName.startsWith('/api') // exclude Next.js internals
  ) {
    const supabase = createMiddlewareSupabaseClient({ req, res });
    // Check if we have a session
    const {
      data: { user }
    } = await supabase.auth.getUser();

    if (user) {
      // We have a session, so we can return the user
      return res;
    }

    const redirectUrl = req.nextUrl.clone();
    redirectUrl.pathname = '/';
    redirectUrl.searchParams.set(`redirectedFrom`, req.nextUrl.pathname);
    return NextResponse.redirect(redirectUrl);
  } else {
    return res;
  }
}
