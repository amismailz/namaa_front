import { JobFormType } from "@/components/ApplyJobForm"
import { useMutation } from "@tanstack/react-query"

async function fetcher(data: JobFormType) {
  const formData = new FormData()

  // Append all fields dynamically
  Object.entries(data).forEach(([key, value]) => {
    if (value == null) return

    // Handle file input (FileList or File)
    if (key === "image" && value instanceof FileList) {
      if (value.length > 0) {
        formData.append(key, value[0]) // take first file
      }
    } else if (key === "image" && value instanceof File) {
      formData.append(key, value)
    } else {
      formData.append(key, value as any)
    }
  })

  const res = await fetch("/api/apply-job", {
    method: "POST",
    body: formData
  })

  return res.json()
}

export default function useApplyJob() {
  return useMutation({
    mutationFn: fetcher
  })
}
