import React from "react"
import ContactInfo from "@/components/header/ContactInfo"
import SocialInfo from "@/components/header/SocialInfo"
import Container from "@/components/Container"
import NavItems from "@/components/header/NavItems"
import MainLogo from "@/components/header/MainLogo"
import Sticky from "@/components/Sticky"
import LocaleSwitcher from "@/components/LocaleSwitcher"
import { ContactInfoData } from "@/types.type"
import NavToggler from "@/components/header/NavToggler"
import Translate from "@/components/Translate"

const Navbar = ({ data }: { data: ContactInfoData }) => {
  return (
    <Sticky negativeOffset="-45px">
      <header className="w-full bg-background flex flex-col divide-y divide-black/10 shadow-md shadow-b-2.5 -shadow-spread-2 shadow-slate-500/15">
        <Container className="flex justify-between items-center">
          <ContactInfo whatsApp={data?.whatsapp_number} email={data?.email} className="hidden lg:flex" />
          <SocialInfo
            className="flex w-full lg:w-auto items-center justify-center lg:justify-end gap-3 lg:gap-4"
            instegram={data?.instagram_link}
            facebook={data?.facebook_link}
            twitter={data?.twitter_link}
            tiktok={data?.tiktok_link}
            linkedin={data?.linkedIn_link}
            snapchat={data?.snapchat_link}
            youtube={data?.youtube_link}
          />
        </Container>

        <Container className="flex justify-between lg:grid lg:grid-cols-[auto_1fr_auto] items-center gap-4">
          {/* Logo */}
          <MainLogo className="shrink-0 flex-none lg:rtl:pl-4 lg:ltr:pr-4 py-1" />
          {/* Navigation */}

          {/* <NavItems className="hidden lg:grid grid-cols-[repeat(auto-fit,minmax(120px,1fr))] justify-center items-center h-full lg:px-6" /> */}
          <NavItems className="hidden lg:flex flex-row justify-center items-center rtl:border-r ltr:border-l border-black/10 lg:gap-1 h-full lg:px-1" />

          {/* Language switcher */}
          <div className="shrink-0 lg:rtl:pr-4 lg:ltr:pl-4 flex items-center gap-2">
            <LocaleSwitcher />
            <NavToggler />
             
          </div>
        </Container>
      </header>
    </Sticky>
  )
}

export default Navbar
