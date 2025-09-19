"use client"

import parse, { HTMLReactParserOptions } from "html-react-parser"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import Translate from "@/components/Translate"
import BlogPostWhatsAppButton from "@/components/BlogPostWhatsAppButton"
import { BsPhone } from "react-icons/bs"

const CTAComponent = ({ currentUrl }: { currentUrl: string }) => {
  return (
    <span className="flex gap-2 items-center w-full mt-2 p-2 not-prose">
      <span className="w-full lg:max-w-[600px] mx-auto flex gap-3 items-center ">
        <Button className="flex-1 h-[48px] rounded-xl gap-3" asChild>
          <a href="tel:+966536322194" target="_blank" rel="nofollow">
            <BsPhone />
            <span>
              <Translate id="actions.contact_us" />
            </span>
          </a>
        </Button>
        <BlogPostWhatsAppButton currentUrl={currentUrl} phone="966544175137" />
      </span>
    </span>
  )
}

export default function BlogPostContent({
  html,
  currentUrl
}: {
  html: string
  currentUrl: string
}) {
  const options: HTMLReactParserOptions = {
    replace: (domNode: any) => {
      if (domNode.type === "text" && domNode.data) {
        // Look for markers in text nodes
        if (domNode.data.includes("[[CTA_COMPONENT]]")) {
          return <CTAComponent currentUrl={currentUrl} />
        }
      }
    }
  }

  return (
    <div
      className={cn(
        `prose lg:prose-lg max-w-full prose-a:text-green-600 prose-a:hover:text-green-700 prose-a:underline prose-a:font-medium prose-headings:text-primary prose-img:rounded-xl prose-img:max-w-full prose-h1:text-4xl prose-h2:text-3xl prose-h3:text-2xl prose-h4:text-xl prose-h5-text-lg prose-h5:font-bold prose-p:text-foreground prose-li:text-foreground prose-strong:font-bold`
      )}
    >
      {parse(html, options)}
    </div>
  )
}
