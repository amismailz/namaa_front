"use client"

import React from "react"
import HostingPackageBox from "@/components/HostingPackageBox"
import { formatCurrency } from "@/lib/utils"
import { motion, Variants } from "framer-motion"
import { HostingPlansType } from "@/types.type"

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
  const getRelativeImageIcon = (id: number) => {
    switch (id) {
      case 6:
        return {
          src: "/clarity_host-outline-badged.svg",
          width: 48,
          height: 48
        }
      case 7:
        return {
          src: "/material-symbols-light_host-outline.svg",
          width: 48,
          height: 48
        }
      default:
        return {
          src: "/clarity_host-outline-alerted.svg",

          width: 51,
          height: 51
        }
    }
  }

  return (
    <div className="space-y-7">
      <h3 className="font-medium text-3xl">{heading}</h3>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }} // trigger when 20% visible
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-10"
      >
        {data.map((item) => {
          return (
            <motion.div key={item.id} variants={itemVariants}>
              <HostingPackageBox
                key={item.id}
                image={getRelativeImageIcon(item.id)}
                title={item.name}
                price={formatCurrency(Number(item.price))}
                content={item.description}
                currency={item.currency}
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
