type Props = {
  width?: string;
  height?: string;
}


export default function HomeHospitalIcon({width, height}: Props) {
  return (
    <svg width={width || "24"} height={height || "24"} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M11.9995 10V16M8.99951 13H14.9995M10.6971 3.74084C9.59314 4.41896 7.96095 5.53862 6.4996 6.99997C3.3312 10.1684 3.4996 12 3.4996 15C3.4996 16.4098 3.61002 17.5988 3.72708 18.4631C3.85025 19.3725 4.64342 20 5.56115 20H18.438C19.3558 20 20.149 19.3726 20.2721 18.4631C20.3892 17.5988 20.4996 16.4098 20.4996 15C20.4996 12 20.668 10.1683 17.4996 6.99997C16.0382 5.53862 14.4061 4.41896 13.3021 3.74085C12.4975 3.24662 11.5017 3.24662 10.6971 3.74084Z" stroke="#747476" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  )
}