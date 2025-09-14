import { getLocale } from "next-intl/server"
import { NextRequest, NextResponse } from "next/server"

const baseUrl = process.env.API_URL

export async function POST(request: NextRequest) {
  try {
    const locale = await getLocale()
    const formData = await request.formData()

   //  const name = formData.get("name") as string | null
   //  const email = formData.get("email") as string | null
   //  const phone = formData.get("phone") as string | null
   //  const jobTitle = formData.get("job_title") as string | null
   //  const image = formData.get("image") as File | null

   //  if (!name || !email || !phone || !jobTitle) {
   //    return NextResponse.json(
   //      { error: "All fields are required" },
   //      { status: 400 }
   //    )
   //  }

    // Build FormData to forward to backend API
   //  const backendFormData = new FormData()
   //  backendFormData.append("name", name)
   //  backendFormData.append("email", email)
   //  backendFormData.append("phone", phone)
   //  backendFormData.append("job_title", jobTitle)

   //  if (image) {
   //    backendFormData.append("image", image)
   //  }

    const response = await fetch(`${baseUrl}/submit/job-application`, {
      method: "POST",
      body: formData,
      headers: {
        "Accept-Language": locale // don't set Content-Type, fetch will handle it
      }
    })


    const result = await response.json()

    return NextResponse.json(result, {
      status: response.status
    })
  } catch {
    return NextResponse.json(
      {
        status: "error",
        message: "Server Error!"
      },
      { status: 500 }
    )
  }
}
