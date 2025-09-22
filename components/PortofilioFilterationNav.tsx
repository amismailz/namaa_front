"use client"

import { cn } from "@/lib/utils"
import { Loader, X } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import React, { useCallback, useTransition } from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import Translate from "@/components/Translate"

type Props = {
  filters: { label: string; value: string }[]
  service_slug?: string
}

const PortofilioFilterationNav = ({ filters, service_slug }: Props) => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const transitionToRoute = useCallback(
    (route: string) => {
      startTransition(() => {
        router.push(`?${route}`, { scroll: true })
      })
    },
    [router]
  )

  const handleFilterClicked = useCallback(
    (value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set("service_slug", value)
      transitionToRoute(params.toString())
    },
    [transitionToRoute]
  )

  const resetFilter = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString())
    params.delete("service_slug")
    transitionToRoute(params.toString())
  }, [transitionToRoute])

  return (
    <>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild className="m-0 block lg:hidden">
          <Button variant="outline">
            <Translate id="portfilio.filter_button_text" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-full" align="start">
          <DropdownMenuLabel>
            <Translate id="portfilio.filter_button_subtext" />
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup
            value={service_slug}
            onValueChange={handleFilterClicked}
            className="divide-y divide-black/5 "
          >
            <DropdownMenuRadioItem
              className="py-3 px-6 cursor-pointer rounded-none [&_span]:size-3 ltr:[&_span]:mr-3 rtl:[&_span]:ml-3"
              value={""}
            >
              All
            </DropdownMenuRadioItem>
            {filters.map(({ label, value }) => {
              return (
                <DropdownMenuRadioItem
                  className="py-3 px-6 cursor-pointer rounded-none [&_span]:size-3 ltr:[&_span]:mr-3 rtl:[&_span]:ml-3"
                  key={value}
                  value={value}
                >
                  {label}
                </DropdownMenuRadioItem>
              )
            })}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      <nav className="hidden lg:flex gap-2 items-center flex-wrap justify-center max-w-auto mx-auto">
        {filters.map(({ label, value }: any) => {
          const isActive = value === service_slug
          return (
            <div
              key={value}
              className={cn(
                "border overflow-hidden relative rounded-lg whitespace-nowrap ",
                isActive
                  ? "border-border ltr:pr-10 rtl:pl-10"
                  : "border-transparent"
              )}
            >
              <span
                role="button"
                key={value}
                aria-label="filter button"
                className={`cursor-pointer transition-colors duration-200 py-2 px-3 inline-block ${
                  isActive
                    ? "text-primary font-semibold"
                    : "text-muted-foreground hover:text-primary"
                }`}
                onClick={() => handleFilterClicked(value)}
              >
                {label}
              </span>
              {isActive ? (
                <span
                  onClick={resetFilter}
                  role="button"
                  aria-label="cancel filter"
                  className="w-10 h-full absolute top-0 ltr:right-0 rtl:left-0 bg-secondary text-foreground cursor-pointer flex justify-center items-center"
                >
                  <X className="size-4" />
                </span>
              ) : null}
            </div>
          )
        })}
      </nav>

      {isPending ? (
        <div className="fixed w-full h-screen top-0 left-0 z-[9999] bg-background/70 flex items-center justify-center">
          <Loader size={48} className="animate-spin text-primary" />
        </div>
      ) : null}
    </>
  )
}

export default PortofilioFilterationNav
