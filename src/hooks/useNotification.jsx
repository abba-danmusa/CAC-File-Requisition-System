import { useEffect, useState } from "react"

export const useAuthNotification = (notifications) => {
  const [notification, setNotification] = useState(notifications)

  if ('Notification' in window) {
    if (Notification.permission !== 'granted') {
      Notification.requestPermission()
    }
  }

  useEffect(() => {
    if (Notification.permission === 'granted') {
      new Notification(notification.subject, {
        body: notification.body,
        icon: './images/logos.png',
        tag: notification._id
      })
    }
  }, [notification])

}
