import './globals.css'

export const metadata = {
  title: 'Task Manager',
  description: 'A modern task management application',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
          {children}
        </div>
      </body>
    </html>
  )
}