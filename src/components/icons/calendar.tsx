type Props = {
  color?: string;
}

export default function CalenderIconSVG({color}: Props) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M15 2.5V6.5M9 2.5V6.5M20.4826 11.5H3.51733M20.4826 11.5C20.2743 5.79277 18.154 4 12 4C5.84596 4 3.7256 5.79277 3.51733 11.5M20.4826 11.5C20.4943 11.8208 20.5 12.154 20.5 12.5C20.5 19 18.5 21 12 21C5.5 21 3.5 19 3.5 12.5C3.5 12.154 3.50563 11.8208 3.51733 11.5" stroke={color || '#ACACAD'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
</svg>

  )
}