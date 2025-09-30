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
        avatar="/default_avatar.jpg"
        allowClickAway={false}
        notification
        notificationSound
        className="!left-4 !right-auto !bottom-4" // ✅ Tailwind override
      />
    </div>
  )
}

export default WhatsAppChat
