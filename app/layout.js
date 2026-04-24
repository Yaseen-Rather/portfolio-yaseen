import { JetBrains_Mono, Orbitron } from 'next/font/google'
import './globals.css'

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

const orbitron = Orbitron({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['400', '500', '600', '700', '800', '900'],
  display: 'swap',
})

export const metadata = {
  title: 'Yaseen Rather // SOC Analyst & Cybersecurity Engineer',
  description: 'Portfolio of Yaseen Rather — SOC Analyst, Cybersecurity Engineer specializing in Blue Team operations, threat detection, and secure systems engineering.',
  keywords: ['Cybersecurity', 'SOC Analyst', 'Blue Team', 'Threat Detection', 'Yaseen Rather', 'Portfolio'],
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${jetbrains.variable} ${orbitron.variable} dark`}>
      <body className="font-mono bg-[#050505] text-emerald-50 antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  )
}
