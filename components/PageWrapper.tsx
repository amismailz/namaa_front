"use client"

import React from "react"

const PageWrapper = ({children}: {children:React.ReactNode}) => {
  return (
    <div className="page-wrapper min-h-dvh ">
     {children}
    </div>
  )
}

export default PageWrapper
