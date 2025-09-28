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
import ServiceRequestForm from "@/components/ServiceRequestForm"
import { ButtonWithIcon } from "@/components/ui/button-with-icon"
import { GoArrowUpRight } from "react-icons/go"
import { cn } from "@/lib/utils"
import Translate from "@/components/Translate"

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

const ServiceRequestDialog = ({ slug }: { slug: string; }) => {
  const [open, setOpen] = useState(false)

  const handleOpen = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault()
    setOpen(true)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <a onClick={handleOpen} href={`${baseUrl}${slug}`}>
          <ButtonWithIcon
            icon={<GoArrowUpRight className="text-foreground" />}
            iconClass="bg-background"
            className="bg-primary-green hover:bg-primary-green/90"
          >
            <Translate id="actions.request_now" />
          </ButtonWithIcon>
        </a>
      </DialogTrigger>

      <DialogContent
        showCloseButton={false}
        className={cn(
          "max-w-lg p-0 rounded-none lg:rounded-xl",
          "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
          "data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-bottom-[48%]",
          "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95"
        )}
      >
        <DialogHeader className="px-6 py-5 flex justify-between ltr:text-left rtl:text-right items-center w-full lg:flex">
          <DialogTitle className="w-full">
            <Translate id="services.request_service" />
          </DialogTitle>
          <DialogDescription className="hidden">Descraption</DialogDescription>
        </DialogHeader>

        <ScrollArea className="max-w-lg max-h-[calc(100vh-60px)] lg:max-h-[70vh]">
          <p className="text-muted-foreground leading-7 px-6 font-light">
            <Translate id="services.request_service_descraption" />
          </p>

          <ServiceRequestForm
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

export default ServiceRequestDialog
