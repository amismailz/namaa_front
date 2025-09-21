"use client"

import { FaqItem } from "@/types.type"
import React from "react"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion"
import { format } from "date-fns"
import Translate from "@/components/Translate"

const FaqList = ({ data }: { data: FaqItem[] }) => {
  return (
    <Accordion
      type="multiple"
      defaultValue={[`item-0`]}
      className="w-full space-y-4"
    >
      {data?.map((item, index) => (
        <AccordionItem
          key={item.id}
          value={`item-${index}`}
          className="bg-background rounded-lg border shadow-sm"
        >
          <AccordionTrigger
            className="font-semibold lg:text-xl p-4 cursor-pointer hover:text-primary no-underline hover:no-underline"
          >
            <h3>{item.question}</h3>
          </AccordionTrigger>
          <AccordionContent className="lg:text-lg px-4 py-5 border-t ltr:text-left rtl:text-right">
            <h4 className="font-base text-base">{item.answer}</h4>
            <p className="mt-5 italic text-muted-foreground text-xs">
              <Translate id="blog.last_modified" />:{" "}
              {format(new Date(item.created_at), "dd-MM-yyy")}
            </p>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}

export default FaqList
