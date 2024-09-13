import React from 'react'

type Props = {
  width?: string;
  height?: string;
}

export default function HumburgerIcon({width, height}: Props) {
  return (
    <svg width={width || "18" } height={height || "12"} viewBox="0 0 18 12" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1 11H17M1 6H17M1 1H17" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
</svg>

  )
}