import React from 'react'

const AnimatedWaves = () => {
  return (
    <div className="waves-container">
      {/* 2 ondas orgânicas sem bordas retas */}
      <svg className="wave wave-1" viewBox="0 0 1200 400" preserveAspectRatio="none">
        <path d="M-100,200 C300,320 900,80 1300,200 C1300,300 1300,400 -100,400 Z" />
      </svg>
      
      <svg className="wave wave-2" viewBox="0 0 1200 400" preserveAspectRatio="none">
        <path d="M-100,180 C400,280 800,100 1300,180 C1300,300 1300,400 -100,400 Z" />
      </svg>
    </div>
  )
}

export default AnimatedWaves