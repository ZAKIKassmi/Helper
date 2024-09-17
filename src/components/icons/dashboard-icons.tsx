
type Props = {
  type:string;
  width?: string;
  height?: string;
}

export default function DashboardIcons({type, width, height}: Props) {
  if(type === "cardiology"){
    return(
      <svg  width={width || "24"} height={height || "24"}  viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path  d="M20.4037 12.5C20.778 11.6322 21 10.7013 21 9.71405C21 6 18.9648 4 16.4543 4C15.2487 4 14.0925 4.49666 13.24 5.38071L12.7198 5.92016C12.3266 6.32798 11.6734 6.32798 11.2802 5.92016L10.76 5.38071C9.90749 4.49666 8.75128 4 7.54569 4C5 4 3 6 3 9.71405C3 10.7013 3.222 11.6322 3.59627 12.5M20.4037 12.5C18.395 17.1578 12 20 12 20C12 20 5.60502 17.1578 3.59627 12.5M20.4037 12.5L16.3249 12.5C16.1273 12.5 15.9483 12.3837 15.868 12.2031L14.4483 9.00872C14.2737 8.61588 13.7176 8.61194 13.5374 9.00226L11.436 13.5555C11.2603 13.9361 10.7223 13.9445 10.5348 13.5695L9.44721 11.3944C9.26295 11.0259 8.73705 11.0259 8.55279 11.3944L8.1382 12.2236C8.0535 12.393 7.88037 12.5 7.69098 12.5L3.59627 12.5"  strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
    )
  }
  
  if(type === 'plus'){
    return(
      <svg  width={width || "24"} height={height || "24"}  viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 12H20M12 4V20"   strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
    )
  }

  if(type === 'donors'){
    return(
      <svg width={width || "24"} height={height || "24"} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M19 14C21.2091 14 23 16 23 17.5C23 18.3284 22.3284 19 21.5 19H21M17 11C18.6569 11 20 9.65685 20 8C20 6.34315 18.6569 5 17 5M5 14C2.79086 14 1 16 1 17.5C1 18.3284 1.67157 19 2.5 19H3M7 11C5.34315 11 4 9.65685 4 8C4 6.34315 5.34315 5 7 5M16.5 19H7.5C6.67157 19 6 18.3284 6 17.5C6 15 9 14 12 14C15 14 18 15 18 17.5C18 18.3284 17.3284 19 16.5 19ZM15 8C15 9.65685 13.6569 11 12 11C10.3431 11 9 9.65685 9 8C9 6.34315 10.3431 5 12 5C13.6569 5 15 6.34315 15 8Z"  strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  }

  if(type === 'settings'){
    return(
      <svg width={width || "24"} height={height || "25"} viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M11 3.29996H13C13.5523 3.29996 14 3.74767 14 4.29996V4.86874C14 5.29654 14.2871 5.66821 14.6822 5.83224C15.0775 5.99634 15.5377 5.9338 15.8403 5.63119L16.2426 5.22887C16.6331 4.83834 17.2663 4.83834 17.6568 5.22887L19.071 6.64308C19.4616 7.0336 19.4615 7.66677 19.071 8.05729L18.6688 8.45956C18.3661 8.76219 18.3036 9.22243 18.4677 9.6177C18.6317 10.0128 19.0034 10.3 19.4313 10.3L20 10.3C20.5523 10.3 21 10.7477 21 11.3V13.3C21 13.8522 20.5523 14.3 20 14.3H19.4312C19.0034 14.3 18.6318 14.5871 18.4677 14.9822C18.3036 15.3775 18.3661 15.8377 18.6688 16.1403L19.071 16.5426C19.4616 16.9331 19.4616 17.5663 19.071 17.9568L17.6568 19.371C17.2663 19.7615 16.6331 19.7615 16.2426 19.371L15.8403 18.9687C15.5377 18.6661 15.0775 18.6036 14.6822 18.7677C14.2871 18.9317 14 19.3034 14 19.7312V20.3C14 20.8522 13.5523 21.3 13 21.3H11C10.4477 21.3 10 20.8522 10 20.3V19.7312C10 19.3034 9.71287 18.9317 9.31774 18.7677C8.92247 18.6035 8.46223 18.6661 8.1596 18.9687L7.75732 19.371C7.36679 19.7615 6.73363 19.7615 6.34311 19.371L4.92889 17.9568C4.53837 17.5663 4.53837 16.9331 4.92889 16.5426L5.33123 16.1402C5.63384 15.8376 5.69638 15.3774 5.53228 14.9822C5.36825 14.5871 4.99659 14.3 4.56879 14.3H4C3.44772 14.3 3 13.8522 3 13.3V11.3C3 10.7477 3.44772 10.3 4 10.3L4.56877 10.3C4.99658 10.3 5.36825 10.0128 5.53229 9.61772C5.6964 9.22246 5.63386 8.76224 5.33123 8.45962L4.92891 8.0573C4.53838 7.66677 4.53838 7.03361 4.92891 6.64308L6.34312 5.22887C6.73365 4.83834 7.36681 4.83834 7.75734 5.22887L8.15966 5.63119C8.46228 5.93381 8.9225 5.99636 9.31776 5.83225C9.71288 5.66821 10 5.29653 10 4.86872V4.29996C10 3.74767 10.4477 3.29996 11 3.29996Z"  />
    <path d="M14 12.3C14 13.4045 13.1046 14.3 12 14.3C10.8954 14.3 10 13.4045 10 12.3C10 11.1954 10.8954 10.3 12 10.3C13.1046 10.3 14 11.1954 14 12.3Z"  />
    </svg>
    )
  }

  if(type === 'home-hospital'){
    return(
      <svg width={width || "24"} height={height || "24"} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M11.9995 10V16M8.99951 13H14.9995M10.6971 3.74084C9.59314 4.41896 7.96095 5.53862 6.4996 6.99997C3.3312 10.1684 3.4996 12 3.4996 15C3.4996 16.4098 3.61002 17.5988 3.72708 18.4631C3.85025 19.3725 4.64342 20 5.56115 20H18.438C19.3558 20 20.149 19.3726 20.2721 18.4631C20.3892 17.5988 20.4996 16.4098 20.4996 15C20.4996 12 20.668 10.1683 17.4996 6.99997C16.0382 5.53862 14.4061 4.41896 13.3021 3.74085C12.4975 3.24662 11.5017 3.24662 10.6971 3.74084Z"   strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
    )
  }

  if(type === 'logout'){
    return(
      <svg width={width || "24"} height={height || "24"} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14 4L17.5 4C20.5577 4 20.5 8 20.5 12C20.5 16 20.5577 20 17.5 20H14M3 12L15 12M3 12L7 8M3 12L7 16"  strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  }

  if(type === 'email'){
    return(
      <svg width={width || "24"} height={height || "24"} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M19.7055 6.29452C18.2618 4.99044 15.8298 4.5 12 4.5C8.1702 4.5 5.73816 4.99044 4.29452 6.29452M19.7055 6.29452C21.0003 7.46413 21.5 9.28823 21.5 12C21.5 17.7353 19.2647 19.5 12 19.5C4.73529 19.5 2.5 17.7353 2.5 12C2.5 9.28823 2.99972 7.46413 4.29452 6.29452M19.7055 6.29452L13.4142 12.5858C12.6331 13.3668 11.3668 13.3668 10.5858 12.5858L4.29452 6.29452" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>

    )
  }

  if(type === 'phone'){
    return(<svg width={width || "24"} height={height || "24"} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M8.20049 15.799C1.3025 8.90022 2.28338 5.74115 3.01055 4.72316C3.10396 4.55862 5.40647 1.11188 7.87459 3.13407C14.0008 8.17945 6.5 8 11.3894 12.6113C16.2788 17.2226 15.8214 9.99995 20.8659 16.1249C22.8882 18.594 19.4413 20.8964 19.2778 20.9888C18.2598 21.717 15.0995 22.6978 8.20049 15.799Z"  strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
      )
  }

  if(type === 'location-med'){
    return(
      <svg width={width || "24"} height={height || "24"} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8.5 11H15.5M12 7.5V14.5M20 11C20 15.1429 16.8509 18.5502 12.8159 20.6077C12.3032 20.8691 11.6968 20.8691 11.1841 20.6077C7.14909 18.5502 4 15.1429 4 11C4 6.58172 7.58172 3 12 3C16.4183 3 20 6.58172 20 11Z" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>

    )
  }

  if(type === 'map'){
    return(
      <svg width={width || "24"} height={height || "24"} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9 5L5.63246 3.87749C4.33739 3.4458 3 4.40974 3 5.77485V17.5585C3 18.4193 3.55086 19.1836 4.36754 19.4558L9 21M9 5L15 3M9 5V21M15 3L19.6325 4.54415C20.4491 4.81638 21 5.58066 21 6.44152V18.2251C21 19.5903 19.6626 20.5542 18.3675 20.1225L15 19M15 3V19M15 19L9 21" strokeLinecap="round" strokeLinejoin="round"/>
</svg>

    )
  }

  if(type === 'beds'){
    return(
      <svg width={width || "24"} height={height || "24"} viewBox="0 0 1024 1024"  version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M789.3 513.2c31.1 0 56.5 3.6 75.5 10.7 14.5 5.4 25.2 12.8 32.7 22.6 13.9 18 19.8 46.3 19.8 94.7v213.3h-42.7v-21.3c0-35.3-28.7-64-64-64H213.3c-35.3 0-64 28.7-64 64v21.3h-42.7V641.2c0-48.3 5.9-76.6 19.8-94.7 7.6-9.8 18.3-17.2 32.7-22.6 19-7.1 44.4-10.7 75.5-10.7h554.7m0-42.7H234.7C83.5 470.5 64 546.9 64 641.2v213.3c0 23.6 19.1 42.7 42.7 42.7h42.7c23.6 0 42.7-19.1 42.7-42.7v-21.3c0-11.8 9.6-21.3 21.3-21.3h597.3c11.8 0 21.3 9.6 21.3 21.3v21.3c0 23.6 19.1 42.7 42.7 42.7h42.7c23.6 0 42.7-19.1 42.7-42.7V641.2c-0.1-94.3-19.6-170.7-170.8-170.7z"  /><path d="M512 169.5c44.3 0 87 7.4 123.5 21.5 32.6 12.6 59.1 30.2 74.6 49.7l10 12.5 15.7 2.9c8.8 1.6 18.3 3.3 28.3 5.1 13.4 2.4 27.3 4.8 41.2 7.4 40.2 7.5 69.3 42.8 69.3 83.8v131.3c-29.2-8.7-60.2-13.2-85.3-13.2H234.7c-25.2 0-56.1 4.5-85.3 13.2V352.4c0-41 29.2-76.3 69.3-83.8 13.9-2.6 27.8-5.1 41.2-7.4 10.1-1.8 19.5-3.4 28.3-5.1l15.7-2.9 10-12.5c15.5-19.5 41.9-37.1 74.6-49.7 36.5-14.1 79.2-21.5 123.5-21.5m0-42.7c-102.5 0-190.6 35.8-231.5 87.3-20.3 3.7-45 7.9-69.7 12.5-60.4 11.3-104.1 64.3-104.1 125.8v198.3c29.2-23.5 87.6-37.6 128-37.6h554.7c40.4 0 98.8 14.1 128 37.6V352.4c0-61.5-43.7-114.4-104.1-125.8-24.6-4.6-49.4-8.8-69.7-12.5-41-51.5-129.1-87.3-231.6-87.3z"  /><path d="M177.1 516.3l7.8-28.9c7.9-29.4 29.4-55.9 60.5-74.5 30-17.9 67.8-27.7 106.6-27.7 39 0 75.6 9.5 105.9 27.4 31 18.3 52.6 44.4 60.9 73.4l7.7 27.2H234.7c-8.9 0-18 0.3-27.7 1l-29.9 2.1z m64.5-45.8h220.8c-6.9-7.9-15.8-15.1-26.2-21.2-23.4-13.8-53.3-21.5-84.2-21.5-31.2 0-61.3 7.7-84.7 21.7-10.3 6.2-18.9 13.3-25.7 21z"  /><path d="M846.9 516.3l-29.8-2.1c-9.8-0.7-18.8-1-27.7-1h-292l7.7-27.2c8.3-29 29.9-55.1 60.9-73.4 30.3-17.9 67-27.4 105.9-27.4 38.8 0 76.7 9.9 106.6 27.7 31.1 18.6 52.7 45 60.5 74.5l7.9 28.9z m-285.3-45.8h220.8c-6.8-7.8-15.5-14.9-25.7-21-23.4-14-53.5-21.7-84.7-21.7-30.9 0-60.8 7.6-84.2 21.5-10.5 6.2-19.3 13.3-26.2 21.2z"  strokeLinecap="round" strokeLinejoin="round"/></svg>
    )
  }

  if(type === 'edit'){
    return(
      <svg width={width || "24"} height={height || "24"} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M18.9445 9.1875L14.9445 5.1875M18.9445 9.1875L13.946 14.1859C13.2873 14.8446 12.4878 15.3646 11.5699 15.5229C10.6431 15.6828 9.49294 15.736 8.94444 15.1875C8.39595 14.639 8.44915 13.4888 8.609 12.562C8.76731 11.6441 9.28735 10.8446 9.946 10.1859L14.9445 5.1875M18.9445 9.1875C18.9445 9.1875 21.9444 6.1875 19.9444 4.1875C17.9444 2.1875 14.9445 5.1875 14.9445 5.1875M20.5 12C20.5 18.5 18.5 20.5 12 20.5C5.5 20.5 3.5 18.5 3.5 12C3.5 5.5 5.5 3.5 12 3.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>

    )
  }
}