"use client"

import { FloatingWhatsApp } from "react-floating-whatsapp"


const WhatsAppChat = () => {
  return (
    <div className="" dir="ltr">
      <FloatingWhatsApp
        accountName="Namaa Agency"
        phoneNumber="966544175137"
        statusMessage="we are online."
        chatMessage={`Any questions? \nChat Us! We Are Here To Help \n🥰`}
        allowEsc
        allowClickAway
        notification
        notificationSound
      />
    </div>
  )
}

export default WhatsAppChat
