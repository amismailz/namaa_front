"use client"

import { Loader } from "lucide-react"
import React from "react"

const PackagesLoading = () => {
  return (
    <div className="fixed bg-background/60 inset-0 z-[999] flex justify-center items-center">
      <Loader className="animate-spin text-primary size-6" />
    </div>
  )
}

export default PackagesLoading
