import { NextRequest, NextResponse } from 'next/server'
import { exchangeToken } from '@/lib/ecwid'
import { prisma } from '@/lib/db'

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl
  const code = searchParams.get('code')
  const storeId = searchParams.get('store_id')

  if (!code || !storeId) {
    return NextResponse.redirect(new URL('/error?reason=missing_params', req.url))
  }

  try {
    const { access_token } = await exchangeToken(code)

    await prisma.store.upsert({
      where: { storeId },
      update: { accessToken: access_token },
      create: { storeId, accessToken: access_token, plan: 'free' },
    })

    // 기본 배너 config 없으면 생성
    await prisma.bannerConfig.upsert({
      where: { storeId },
      update: {},
      create: { storeId },
    })

    return NextResponse.redirect(
      new URL(`/dashboard?store_id=${storeId}`, req.url)
    )
  } catch (err) {
    console.error('OAuth callback error:', err)
    return NextResponse.redirect(new URL('/error?reason=oauth_failed', req.url))
  }
}
