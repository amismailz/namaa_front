"use client"

import { useEffect } from 'react'

const HideLocale = () => {

   useEffect(() => {
      let switcherControl
      switcherControl = document.getElementById('switcher-control')
      if (switcherControl) {
         switcherControl.style.display = "none"
      }

      return () => {
         switcherControl!.style.display = "block"

      }
   })
   return null
}

export default HideLocale