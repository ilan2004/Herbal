'use client'
import React, { useRef } from 'react';
import Object from './Object/Object';
import './three.css'

const Three = () => {
    
  return (

    <div className="three">
      <div className='box'>
        <Object />
        </div>
        <div className='details'>
        <h1>Basil</h1>
        <p>Basil (Ocimum basilicum) is a fragrant herb widely known for its medicinal and culinary uses. Often called the "king of herbs," basil is celebrated for its antibacterial, anti-inflammatory, and antioxidant properties. In traditional medicine, it is used to boost immunity, aid digestion, reduce stress, and improve respiratory health. With its rich aroma and diverse health benefits, basil is a staple in natural healing and daily wellness routines.</p>
        </div>
    </div>


  )
}

export default Three;
