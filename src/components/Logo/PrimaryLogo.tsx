import React from 'react'
import nikeLogo from "../../utils/assets/nike-logo.png"

const PrimaryLogo: React.FC = () => {
  return (
    <div>
        <img src={nikeLogo} alt="OPEN EDU"
        className='h-14 w-auto pl-5' />
    </div>
  )
}

export default PrimaryLogo