"use client"

import { ArrowRight, ArrowLeft } from "lucide-react"
// lightbox
import Lightbox from "yet-another-react-lightbox"
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails"
import Counter from "yet-another-react-lightbox/plugins/counter"
import Zoom from "yet-another-react-lightbox/plugins/zoom"

// styles for lightbox gallery
import "yet-another-react-lightbox/styles.css"
import "yet-another-react-lightbox/plugins/thumbnails.css"
import "yet-another-react-lightbox/plugins/counter.css"

type PortofilioLightBoxProps = {
  slides: { src: string }[]
  //   thumbs: { src: string }[]
  open: boolean
  onClose: () => void
  startIndex?: number
}

export default function PortofilioLightBox({
  slides,
  open,
  onClose,
  startIndex = 0
}: PortofilioLightBoxProps) {
  return (
    <Lightbox
      index={startIndex}
      open={open}
      close={onClose}
      render={{
        iconPrev: () => <ArrowLeft />,
        iconNext: () => <ArrowRight />
      }}
      slides={slides}
      carousel={{ preload: 2, imageFit: "contain" }}
      plugins={[Thumbnails, Counter, Zoom]}
      controller={{ closeOnPullDown: true }}
      thumbnails={{
        position: "bottom",
        width: 100,
        height: 80,
        border: 0,
        borderRadius: 18,
        padding: 4,
        gap: 7,
        showToggle: true,
        vignette: true
      }}
    />
  )
}
