import { getLocale } from "next-intl/server"
import { NextRequest, NextResponse } from "next/server"

const baseUrl = process.env.API_URL

export async function POST(request: NextRequest) {
  try {
    const locale = await getLocale()
    const body = await request.json()
    const { name, email, phone, message, hosting_plan } = body

    if (!name || !email || !phone || !hosting_plan) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      )
    }

    const response = await fetch(`${baseUrl}/submit/hosting-plan-request`, {
      method: "POST",
      body: JSON.stringify({ name, email, phone, message, hosting_plan }),
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
        text: "Server Error!"
      },
      { status: 500 }
    )
  }
}
