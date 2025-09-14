"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog"
import PackageRequestForm from "@/components/PackageRequestForm"
import { cn } from "@/lib/utils"
import Translate from "@/components/Translate"
import { ScrollArea } from "@/components/ui/scroll-area"

// 🔹 Reusable Request Dialog
export default function HostingRequestDialog({ packageName, title }: {title:string; packageName: string }) {
  const [open, setOpen] = useState(false)
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="h-[52px] rounded-full">
          <span className="uppercase inline-block px-5">
            <Translate id="actions.request_now" />
          </span>
        </Button>
      </DialogTrigger>

      <DialogContent
        showCloseButton={false}
        className={cn(
          "max-w-lg p-0 overflow-hidden",
          "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
          "data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-bottom-[48%]",
          "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95"
        )}
      >
        <DialogHeader className="px-6 py-4 bp-0 ltr:text-left rtl:text-right">
          <DialogTitle className="py-3 font-bold text-2xl">
            <Translate id="package_pricing.request_dialog.title" />
          </DialogTitle>
          <DialogDescription className="text-lg bg-primary rounded-full py-2 px-4 font-light text-background">
            {title}
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="max-w-lg :max-h-[calc(100vh-130px)] lg:max-h-[70vh] overflow-y-auto px-6 py-4">
          <p className="text-muted-foreground leading-7 font-light">
            <Translate id="package_pricing.request_dialog.discraption" />
          </p>

          <PackageRequestForm
            packageName={packageName}
            onClose={() => setOpen(false)}
            onSubmitted={() => {
              setOpen(false)
            }}
          />
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}