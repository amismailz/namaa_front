"use client"

import React, { useState } from "react"
import { ButtonWithIcon } from "@/components/ui/button-with-icon"
import { GoArrowUpRight } from "react-icons/go"
import { useTranslations } from "next-intl"
import { Loader } from "lucide-react"
import { usePortfolio } from "@/providers/PortfolioProvider"
import { motion, Variants } from "framer-motion"
import PortofilioLightBox from "@/components/PortofilioLightBox"

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15 // delay between items
    }
  }
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" }
  }
}

const PortofilioList = () => {
  const t = useTranslations()
  const { items, pagination, loadMore, isLoading } = usePortfolio()

  // state
  const [openGallery, setOpenGallery] = useState<{isShown:boolean; index:number}>({isShown:false, index:0})

  return (
    <>
      <motion.div
        className="columns-2 md:columns-3 lg:columns-4 space-y-4 gap-6 mt-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {items?.map((item, idx) => (
          <motion.div
            key={item.id}
            className="break-inside-avoid cursor-zoom-in rounded-xl overflow-hidden shadow"
            variants={itemVariants}
            onClick={() => setOpenGallery({isShown:true, index:idx})}
          >
            <img
              key={item.id}
              src={item.image}
              style={{ width: "100%", height: "auto" }}
            />
          </motion.div>
        ))}
      </motion.div>

      {pagination && pagination.current_page < pagination.last_page ? (
        <div className="mx-auto flex justify-center items-center p-6">
          <ButtonWithIcon
            onClick={loadMore}
            disabled={isLoading}
            isDisabled={isLoading}
            icon={
              isLoading ? (
                <Loader className="animate-spin text-primary" />
              ) : (
                <GoArrowUpRight className="text-foreground" />
              )
            }
            iconClass="bg-background"
          >
            {t("actions.more")}
          </ButtonWithIcon>
        </div>
      ) : null}

      {openGallery.isShown && (
        <PortofilioLightBox
          open={openGallery.isShown}
          startIndex={openGallery.index}
          onClose={() => setOpenGallery({isShown:false, index:0})}
          slides={items.map((i) => ({ src: i.image }))}
        />
      )}
    </>
  )
}

export default PortofilioList
