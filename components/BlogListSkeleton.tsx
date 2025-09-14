import { Skeleton } from "@/components/ui/skeleton"
import Section from "@/components/Section"
import Container from "@/components/Container"

export function BlogListSkeleton({ count = 6 }: { count?: number }) {
  return (
    <Section className="py-10">
      <Container className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: count }).map((_, idx) => (
          <div key={idx} className="space-y-3">
            {/* Image placeholder */}
            <Skeleton className="h-48 w-full rounded-lg" />
            <div className="space-y-2">
              {/* Title */}
              <Skeleton className="h-4 w-3/4" />
              {/* Meta line */}
              <Skeleton className="h-3 w-1/2" />
              {/* Short description */}
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-5/6" />
            </div>
          </div>
        ))}
      </Container>
    </Section>
  )
}
