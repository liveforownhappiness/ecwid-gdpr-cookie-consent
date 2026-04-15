const ECWID_TOKEN_URL = 'https://my.ecwid.com/api/oauth/token'

export async function exchangeToken(code: string): Promise<{
  access_token: string
  store_id: number
}> {
  const params = new URLSearchParams({
    client_id: process.env.ECWID_CLIENT_ID!,
    client_secret: process.env.ECWID_CLIENT_SECRET!,
    code,
    redirect_uri: process.env.ECWID_REDIRECT_URI!,
    grant_type: 'authorization_code',
  })

  const res = await fetch(ECWID_TOKEN_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params.toString(),
  })

  if (!res.ok) {
    const text = await res.text()
    throw new Error(`Token exchange failed: ${res.status} ${text}`)
  }

  return res.json()
}
