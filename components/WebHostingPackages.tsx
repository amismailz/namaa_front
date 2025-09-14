"use client"

import React from "react"
import HostingPackageBox from "@/components/HostingPackageBox"
import { formatCurrency } from "@/lib/utils"
import { motion, Variants } from "framer-motion"
import { HostingPlansType } from "@/types.type"
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

const WebHostingPackages = ({
  data,
  heading
}: {
  data: HostingPlansType[]
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
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-10"
      >
        {data.map((item) => {
          const emailCount = item.id === 6 ? 10 : item.id === 7 ? 25 : 100
          const storageCount = item.id === 6 ? 1 : item.id === 7 ? 2 : 5
          const transferCount = item.id === 6 ? 3 : item.id === 7 ? 10 : 15

          const image =
            item.id === 6
              ? {
                  src: "/clarity_host-outline-badged.svg",
                  width: 48,
                  height: 48
                }
              : item.id === 7
              ? {
                  src: "/material-symbols-light_host-outline.svg",
                  width: 48,
                  height: 48
                }
              : {
                  src: "/clarity_host-outline-alerted.svg",

                  width: 51,
                  height: 51
                }

          return (
            <motion.div key={item.id} variants={itemVariants}>
              <HostingPackageBox
                key={item.id}
                image={image}
                title={item.name}
                price={formatCurrency(Number(item.price))}
                emailCount={emailCount}
                currency={item.currency}
                storageCount={storageCount}
                transferCount={transferCount}
                isFeatured={item.is_most_popular}
                billingCycle={item.billing_cycle}
                packageName={item.slug}
              />
            </motion.div>
          )
        })}
      </motion.div>
    </div>
  )
}

export default WebHostingPackages
