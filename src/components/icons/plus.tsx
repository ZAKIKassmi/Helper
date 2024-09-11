type Props = {
  width?: string;
  height?: string;
}

export default function PlusIcon({width, height}: Props) {
  return (
    <svg width={width || "24"} height={height || "24"}  viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 12H20M12 4V20" stroke="#747476" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  )
}