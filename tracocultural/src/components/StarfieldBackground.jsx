import React from 'react'
import './StarfieldBackground.css'

const StarfieldBackground = () => {
  const stars = Array.from({ length: 150 }, (_, i) => (
    <div key={i} className="star"></div>
  ))

  return (
    <div className="starfield-background">
      <div className="stars">
        {stars}
      </div>
    </div>
  )
}

export default StarfieldBackground