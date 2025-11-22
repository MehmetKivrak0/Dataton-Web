import { useEffect, useState } from "react"

function getTimeLeft(targetDate) {
  const now = new Date().getTime()
  const distance = targetDate - now

  if (distance <= 0) {
    return {
      days: "00",
      hours: "00",
      minutes: "00",
      seconds: "00",
      completed: true,
    }
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24))
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((distance % (1000 * 60)) / 1000)

  const format = value => String(value).padStart(2, "0")

  return {
    days: format(days),
    hours: format(hours),
    minutes: format(minutes),
    seconds: format(seconds),
    completed: false,
  }
}

export function CountdownTimer({ targetDate }) {
  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(targetDate))

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getTimeLeft(targetDate))
    }, 1000)

    return () => clearInterval(interval)
  }, [targetDate])

  const items = [
    { label: "Gün", value: timeLeft.days },
    { label: "Saat", value: timeLeft.hours },
    { label: "Dakika", value: timeLeft.minutes },
    { label: "Saniye", value: timeLeft.seconds },
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {items.map(item => (
        <div
          key={item.label}
          className="rounded-2xl border border-cyber-dark-secondary bg-gradient-to-br from-cyber-dark to-cyber-dark-secondary px-6 py-4 text-center shadow-lg shadow-cyan-500/10"
        >
          <p className="text-4xl font-orbitron text-cyber-cyan">{item.value}</p>
          <p className="text-sm uppercase tracking-widest text-muted-foreground">{item.label}</p>
        </div>
      ))}
    </div>
  )
}

