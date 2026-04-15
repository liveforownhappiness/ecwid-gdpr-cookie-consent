import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

// GET: 현재 배너 설정 반환
export async function GET(req: NextRequest) {
  const storeId = req.nextUrl.searchParams.get('store_id')
  if (!storeId) return NextResponse.json({ error: 'Missing store_id' }, { status: 400 })

  const store = await prisma.store.findUnique({
    where: { storeId },
    include: { config: true },
  })

  if (!store) return NextResponse.json({ error: 'Store not found' }, { status: 404 })

  return NextResponse.json({ config: store.config, plan: store.plan })
}

// POST: 배너 설정 저장
export async function POST(req: NextRequest) {
  const body = await req.json()
  const { storeId, ...fields } = body

  if (!storeId) return NextResponse.json({ error: 'Missing storeId' }, { status: 400 })

  const store = await prisma.store.findUnique({ where: { storeId } })
  if (!store) return NextResponse.json({ error: 'Store not found' }, { status: 404 })

  // Free 플랜은 blockScripts 불가
  const isPro = store.plan === 'pro'
  const safeFields = { ...fields }
  if (!isPro) safeFields.blockScripts = false

  const config = await prisma.bannerConfig.upsert({
    where: { storeId },
    update: safeFields,
    create: { storeId, ...safeFields },
  })

  return NextResponse.json({ config })
}
