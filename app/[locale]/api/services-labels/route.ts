import { getLocale } from "next-intl/server"
import { NextResponse } from "next/server"
import { ServicesFormResponse } from "@/types.type"

const baseUrl = process.env.API_URL

export async function GET() {
  try {
    const locale = await getLocale()

    const response = await fetch(`${baseUrl}/form/client-request`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Accept-Language": locale
      }
    })

    const result: ServicesFormResponse = await response.json()
    const {msg_data} = result
    const modifiedResult = msg_data ? Object.entries(msg_data).map(([label, value]) => ({
        label,
        value
      })) : []

    return NextResponse.json(modifiedResult, {
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
