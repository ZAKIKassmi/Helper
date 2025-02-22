import React from 'react'

type Props = {
  direction: 'right' | 'left';
  width?: string;
  height?: string;
  stroke?: string;
}

export default function Arrow({direction, width, height, stroke}: Props) {
  if(direction == 'left'){

    return (
      <svg width={width || "15"} height={height || "18"} viewBox="0 0 15 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3.28939 7.29289C2.89886 7.68342 2.89886 8.31658 3.28939 8.70711L9.65335 15.0711C10.0439 15.4616 10.677 15.4616 11.0676 15.0711C11.4581 14.6805 11.4581 14.0474 11.0676 13.6569L5.41071 8L11.0676 2.34315C11.4581 1.95262 11.4581 1.31946 11.0676 0.928933C10.677 0.538408 10.0439 0.538408 9.65335 0.928933L3.28939 7.29289ZM5 7H3.99649V9H5V7Z" fill="#18181B"/>
    </svg>

    )
  }
    return(
      <svg width={width || "7"} height={height || "12" } viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1 11L6 6L1 1" stroke="#313134" strokeWidth={stroke || "1.5"} strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
   )
  
  
}