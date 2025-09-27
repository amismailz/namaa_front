"use client"
import Container from "@/components/Container"
import Section from "@/components/Section"
import Translate from "@/components/Translate"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useRouter } from "@/i18n/routing"

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL!

export default function NotFoundPage() {
  const router = useRouter()

  return (
    <Section className="py-20">
      <Container className="space-y-7 flex flex-col justify-center items-center">
        <Image
          src="/404.png"
          alt="not found"
          width={1000}
          height={667}
          className="max-w-full lg:max-w-[60%] h-auto object-fill mx-auto"
        />

        <p className="text-lg text-muted-foreground">
          <Translate id="errors.not_found_message" />
        </p>

        <div className="flex gap-2 items-center">
          <Button
            asChild
            size="lg"
            className="lg:px-10 rounded-full h-[52px] uppercase"
          >
            <a href={baseUrl}>
              <Translate id="errors.back_home_action" />
            </a>
          </Button>

          <Button
            variant="outline"
            size="lg"
            className="lg:px-10 rounded-full h-[52px] uppercase"
            onClick={() => router.back()}
          >
            <Translate id="errors.back_step_action" />
          </Button>
        </div>
      </Container>
    </Section>
  )
}
