import React from "react"

const Footer = () => {
  return (
    <footer className="mt-12 bg-gray-800 border-t border-gray-700 py-6 text-center text-gray-400 text-sm">
      <p>
        Workout Buddy &copy; {new Date().getFullYear()} - Stay Fit, Stay Healthy
      </p>
    </footer>
  )
}

export default Footer
