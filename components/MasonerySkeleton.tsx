import { cn } from "@/lib/utils"
import Section from "./Section"
import Container from "./Container"

export function MasonrySkeleton({ count = 10 }: { count?: number }) {
  return (
    <Section className="py-12">
      <Container className="mt-5 space-y-10">
        <nav className="flex gap-3 lg:gap-8 items-center justify-center ">
          {Array.from({ length: 5 }).map((_, idx) => {
            return (
              <span
              key={idx}
                className="inline-block cursor-pointer w-20 bg-muted h-5 rounded-xl"
              >
              </span>
            )
          })}
        </nav>

        <div className="columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-4">
          {Array.from({ length: count }).map((_, idx) => (
            <div
              key={idx}
              className={cn(
                "break-inside-avoid rounded-xl overflow-hidden shadow bg-muted",
                // randomize height a bit to mimic masonry layout
                idx % 3 === 0 ? "h-60" : idx % 3 === 1 ? "h-72" : "h-48"
              )}
            />
          ))}
        </div>
      </Container>
    </Section>
  )
}
