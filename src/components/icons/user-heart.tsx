
type Props = {
  width?: string;
  height?: string;
}

export default function UserHeartIcon({width, height}:Props) {
  return (
    <svg width={width || "21"} height={height || "21"} viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M14.5 19.0001H3.5C2.11929 19.0001 1 17.8808 1 16.5001C1 12.4194 7 12.5001 9 12.5001C11 12.5001 17 12.4194 17 16.5001C17 17.8808 15.8807 19.0001 14.5 19.0001Z" stroke="#18181B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M9 9C11.2091 9 13 7.20914 13 5C13 2.79086 11.2091 1 9 1C6.79086 1 5 2.79086 5 5C5 7.20914 6.79086 9 9 9Z" stroke="#18181B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M17.3658 7.08576L17.2171 6.94126C16.9736 6.70446 16.6432 6.57143 16.2988 6.57143C15.5714 6.57143 15 7.10714 15 8.10198C15 9.78571 17.5714 10.8571 17.5714 10.8571C17.5714 10.8571 20.1429 9.78571 20.1429 8.10198C20.1429 7.10714 19.5614 6.57143 18.8441 6.57143C18.4996 6.57143 18.1693 6.70446 17.9257 6.94126L17.7771 7.08576C17.6647 7.19499 17.4781 7.19499 17.3658 7.08576Z" stroke="#18181b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
</svg>

  )
}