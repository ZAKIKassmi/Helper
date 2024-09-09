import React from 'react'

type Props = {}

export default function LocationIcon({width, height, color}: {width?: string, height?:string,color?: string}) {
  return (
    <svg width={width || "24"} height={height || "24"} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 12H21M12 3V21M19 12C19 15.866 15.866 19 12 19C8.13401 19 5 15.866 5 12C5 8.13401 8.13401 5 12 5C15.866 5 19 8.13401 19 12Z" stroke={color || "white" } strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>

  )
}