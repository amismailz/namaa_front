"use client"

import React, { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import Translate from "@/components/Translate"
import { Button } from "@/components/ui/button"
import ApplyJobForm from "@/components/ApplyJobForm"

const ApplyJobDialog = ({
  jobTitle,
  jobSlug
}: {
  jobTitle: string
  jobSlug: string
}) => {
  const [open, setOpen] = useState(false)
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="rounded-full h-[52px]">
          <span className="px-4">
            <Translate id="actions.apply_now" />
          </span>
        </Button>
      </DialogTrigger>

      <DialogContent
        showCloseButton={false}
        className={cn(
          "max-w-lg p-0 rounded-none lg:rounded-xl overflow-hidden",
          "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
          "data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-bottom-[48%]",
          "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95"
        )}
      >
        <DialogHeader className="px-6 py-5 flex justify-between ltr:text-left rtl:text-right items-center w-full lg:flex">
          <DialogTitle className="w-full py-3 font-bold text-2xl">
            {jobTitle}
          </DialogTitle>
          <DialogDescription className="hidden">Descraption</DialogDescription>
        </DialogHeader>

        <ScrollArea className="max-w-lg p-6 pt-0 max-h-[calc(100vh-60px)] lg:max-h-[70vh]">
          <ApplyJobForm
            onClose={() => setOpen(false)}
            jobTitle={jobTitle}
            jobSlug={jobSlug}
            onSubmitted={() => {
              setOpen(false)
            }}
          />
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}

export default ApplyJobDialog
