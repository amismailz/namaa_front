"use client"

import React from "react"
import { motion, Variants } from "framer-motion"
import Image from "next/image"
import { formatCurrency } from "@/lib/utils"
import HostingRequestDialog from "./HostingRequestDialog"
import { MdMarkEmailRead } from "react-icons/md"
import { IoServer } from "react-icons/io5"
import { FaFileAlt } from "react-icons/fa"
import { HostingPlansType } from "@/types.type"
import Translate from "./Translate"

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

const MarketingManagePackage = ({
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
          <div className="grid grid-cols-1 lg:grid-cols-3">
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
                      alt="icon"
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
                  {formatCurrency(Number(item?.price))}
                </h5>
                <span className="inline-block text-muted-foreground text-base font-light">
                  {item.billing_cycle}
                </span>
                <p className="text-sm mt-2">
                  <Translate id="package_pricing.marketing_package_plans.tagline" />
                </p>
              </div>

              <div className="hidden lg:block mt-5">
                <HostingRequestDialog
                  packageName={item?.slug}
                  title={item?.name}
                />
              </div>
            </div>
            <div className="col-span-1 lg:col-span-2 rounded-xl bg-[#E8E8E8]">
              <div className=" items-center lg:h-full p-5 flex gap-10">
                <ul className="space-y-7">
                  <li className="flex gap-4 items-center">
                    <MdMarkEmailRead />
                    <span>
                      <Translate id="package_pricing.marketing_package_plans.listing.item1" />
                    </span>
                  </li>
                  <li className="flex gap-4 items-center">
                    <IoServer />
                    <span>
                      <Translate id="package_pricing.marketing_package_plans.listing.item2" />
                    </span>
                  </li>
                  <li className="flex gap-4 items-center">
                    <FaFileAlt />
                    <span>
                      <Translate id="package_pricing.marketing_package_plans.listing.item3" />
                    </span>
                  </li>
                </ul>
              </div>
              <div className="block lg:hidden mt-5  p-5">
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

export default MarketingManagePackage
