import { getLocale } from "next-intl/server"
import { NextRequest, NextResponse } from "next/server"

const baseUrl = process.env.API_URL

export async function POST(request: NextRequest) {
  try {
    const locale = await getLocale()
    const body = await request.json()
    const { name, email, phone, notes } = body

    if (!name || !email || !phone || !notes) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      )
    }

    const response = await fetch(`${baseUrl}/submit/contact-us`, {
      method: "POST",
      body: JSON.stringify({ name, email, phone, notes }),
      headers: {
        "Content-Type": "application/json",
        "Accept-Language": locale
      }
    })

    const result = await response.json()

    return NextResponse.json(result, {
      status: response.status
    })
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: "Server Error!"
      },
      { status: 500 }
    )
  }
}
