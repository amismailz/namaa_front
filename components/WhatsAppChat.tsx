"use client"

import { useEffect, useState } from "react";
import { FloatingWhatsApp } from "react-floating-whatsapp"

const WhatsAppChat = () => {
  const [isJSEnabled, setIsJSEnabled] = useState(false);

  useEffect(() => {
    // This code ONLY runs on the client after successful hydration.
    // Therefore, if it runs, JavaScript is enabled.
    setIsJSEnabled(true);
  }, []);

  if (!isJSEnabled) return null

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
