"use client"

import React from "react"
import { AiOutlineGlobal } from "react-icons/ai"
import { BsFileEarmarkBarGraphFill } from "react-icons/bs"
import { IoMdLock } from "react-icons/io"
import { IoServer } from "react-icons/io5"
import { MdMarkEmailRead, MdOutlineVideoLabel } from "react-icons/md"
import HostingRequestDialog from "@/components/HostingRequestDialog"
import { formatCurrency } from "@/lib/utils"
import Image from "next/image"
import { HostingPlansType } from "@/types.type"
import { motion, Variants } from "framer-motion"
import Translate from "@/components/Translate"


const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15 // delay between items
    }
  }
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" }
  }
}

const WebsiteDesignPackage = ({
  item,
  heading
}: {
  item: HostingPlansType
  heading: string | React.ReactNode
}) => {

  return (
    <div className="space-y-7">
      <h3 className="font-medium text-3xl">{heading}</h3>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }} // trigger when 20% visible
        className="shadow-lg rounded-xl bg-background p-3"
      >
        <motion.div
          key={item.id}
          variants={itemVariants}
          className="border-2 border-dashed rounded-xl p-4 lg:p-6"
        >
          <div className="grid grid-col-1 lg:grid-cols-4 gap-7 lg:gap-2">
            <div className="col-span-1">
              <header className="flex gap-4 items-center">
                <div className="icon w-12 h-12 rounded-xl bg-[#E8E8E8] flex justify-center items-center">
                  <motion.span
                    animate={{ y: [0, -6, 3, 0] }}
                    transition={{
                      repeat: Infinity,
                      duration: 2,
                      ease: "easeInOut"
                    }}
                    className="h-full w-full mx-auto text-center flex justify-center items-center"
                  >
                    <Image
                      src="/clarity_host-outline-badged.svg"
                      alt={`${item.name} icon`}
                      width={48}
                      height={48}
                      className="max-w-[60%] h-auto"
                    />
                  </motion.span>
                </div>
                <h4 className="font-medium text-2xl">{item.name}</h4>
              </header>

              <div className="flex flex-col p-5">
                <h5 className="font-bold text-4xl text-primary">
                  <span className="text-2xl">{item?.currency || "EGP"}</span>
                  &nbsp;
                  {formatCurrency(Number(item.price))}
                </h5>
                <span className="text-muted-foreground text-base font-light">
                  {item.billing_cycle}
                </span>
              </div>

              <div className="mt-5 hidden lg:block">
                <HostingRequestDialog
                  packageName={item?.slug}
                  title={item?.name}
                />
              </div>
            </div>
            <div className="col-span-1 lg:col-span-3 p-5 rounded-xl bg-[#E8E8E8] flex flex-col lg:flex-row gap-6 lg:gap-10">
              <ul className="space-y-7">
                <li className="flex gap-4 items-center">
                  <IoServer />
                  <span>
                    <Translate id="package_pricing.design_package_list.item1" />
                  </span>
                </li>
                <li className="flex gap-4 items-center">
                  <MdMarkEmailRead />
                  <span>
                    <Translate id="package_pricing.design_package_list.item2" />
                  </span>
                </li>
                <li className="flex gap-4 items-center">
                  <AiOutlineGlobal />
                  <span>
                    <Translate id="package_pricing.design_package_list.item3" />
                  </span>
                </li>
                <li className="flex gap-4 items-center">
                  <AiOutlineGlobal />
                  <span>
                    <Translate id="package_pricing.design_package_list.item4" />
                  </span>
                </li>
              </ul>

              <ul className="space-y-4">
                <li className="flex gap-4 items-center">
                  <MdOutlineVideoLabel />
                  <span>
                    <Translate id="package_pricing.design_package_list.item5" />
                  </span>
                </li>
                <li className="flex gap-4 items-center">
                  <MdMarkEmailRead />
                  <span>
                    <Translate id="package_pricing.design_package_list.item6" />
                  </span>
                </li>
                <li className="flex gap-4 items-center">
                  <MdOutlineVideoLabel />
                  <span>
                    <Translate id="package_pricing.design_package_list.item7" />
                  </span>
                </li>
                <li className="flex gap-4 items-center">
                  <IoMdLock />
                  <span>
                    <Translate id="package_pricing.design_package_list.item8" />
                  </span>
                </li>
                <li className="flex gap-4 items-center">
                  <BsFileEarmarkBarGraphFill />
                  <span>
                    <Translate id="package_pricing.design_package_list.item9" />
                  </span>
                </li>
              </ul>

              <div className="mt-5 block lg:hidden">
                <HostingRequestDialog
                  packageName={item?.slug}
                  title={item?.name}
                />
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default WebsiteDesignPackage
