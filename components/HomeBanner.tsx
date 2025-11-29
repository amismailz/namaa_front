import React from "react"
import Section from "@/components/Section"
import Container from "@/components/Container"
import AnimatedLetters from "@/components/AnimatedLetters"
import { GoArrowUpRight } from "react-icons/go"
import { ButtonWithIcon } from "@/components/ui/button-with-icon"
import { ROUTES } from "@/constants"
import Counter from "@/components/Counter"
import Image from "next/image"
import { BannerItemType } from "@/types.type"
import Translate from "@/components/Translate"
import { cn } from "@/lib/utils"
import RenderHtml from "@/components/RenderHtml"
import { Link } from "@/i18n/routing"

const HomeBanner = ({
  data,
  className
}: {
  data: BannerItemType
  className?: string
}) => {
  if (!data) return null

  const words = data.title.split(" ")

  const titleFirstTwo = words.slice(0, 2).join(" ")
  const titleRest = words.slice(2).join(" ")

  return (
    <Section className={cn(className)}>
      <Container className="flex flex-col lg:flex-row items-center justify-between gap-6">
        <div className=" flex-1 lg:flex-[1.1] space-y-8 lg:space-y-12 relative">
          <h1 className="scroll-m-20 text-4xl lg:text-6xl font-semibold">
            <span className="inline-block text-primary p-1 border border-primary/50 rounded-lg relative">
              <AnimatedLetters text={titleFirstTwo} />
              <span className="absolute -top-2 -left-2 w-3 h-3 border border-primary/50 rounded rotate-animation"></span>
              <span className="absolute -top-2 -right-2 w-3 h-3 border border-primary/50 rounded rotate-animation [animation-delay:0.3s]"></span>
              <span className="absolute -bottom-2 -left-2 w-3 h-3 border border-primary/50 rounded rotate-animation [animation-delay:0.6s]"></span>
              <span className="absolute -bottom-2 -right-2 w-3 h-3 border border-primary/50 rounded rotate-animation [animation-delay:0.9s]"></span>
            </span>{" "}
            {titleRest}
          </h1>


          <RenderHtml html={data.description} />

          <div className="flex items-center gap-6">
            <Link href={`/${ROUTES.ABOUT_US}`}>
              <ButtonWithIcon
                icon={<GoArrowUpRight className="text-foreground" />}
                iconClass="bg-background"
                variant="green"
              >
                <span>
                  <Translate id="actions.read_more" />
                </span>
              </ButtonWithIcon>
            </Link>

            <Link href={`/${ROUTES.CONTACT_US}`}>
              <ButtonWithIcon
                variant="outline"
                icon={<GoArrowUpRight className="text-background" />}
                iconClass="bg-primary-green"
                className="bg-transparent border-primary-green hover:bg-background"
              >
                <span>
                  <Translate id="navbar.contact_us" />
                </span>
              </ButtonWithIcon>
            </Link>
          </div>

          <div className="flex w-auto items-center  gap-18">
            <div className=" lg:w-auto flex flex-col justify-center items-center lg:items-start gap-1">
              <h2 className="scroll-m-20 text-4xl lg:text-6xl font-semibold">
                <Counter
                  value={data.years_of_experience}
                  defaultValue={data.years_of_experience}
                  suffix="+"
                />
              </h2>
              <h3 className="text-base lg:text-lg text-muted-foreground">
                <Translate id="home.main_banner.experience" />
              </h3>
            </div>
            <div className=" lg:w-auto flex flex-col justify-center items-center lg:items-start gap-1">
              <h2 className="scroll-m-20 text-4xl lg:text-6xl font-semibold">
                <Counter
                  value={data.completed_projects}
                  defaultValue={data.completed_projects}
                  suffix="+"
                />
              </h2>
              <h3 className="text-base lg:text-lg text-muted-foreground">
                <Translate id="home.main_banner.project_completed" />
              </h3>
            </div>
          </div>

          <Image
            src="/mask_1.png"
            alt="frame shap icon"
            width={128}
            height={68}
            className="slide-x-animation lg:absolute rtl:-left-16 ltr:lg:-right-16 lg:bottom-12 lg:-translate-y-1/3"
          />
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center justify-center  lg:justify-end flex-1 lg:flex-[.9]  max-h-[500px]">
          <Image
            src={data.image}
            alt={`${data.title} image`}
            width={839}
            height={636}
            className="bounce-animation object-contain max-w-[80%] lg:max-w-full"
          />
        </div>
      </Container>
    </Section>
  )
}

export default HomeBanner
