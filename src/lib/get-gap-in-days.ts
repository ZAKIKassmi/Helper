

export function getGapInDay(interval: number){
  switch(interval){
    case 1:
      return 90;
    case 2:
      return 122;
    case 3:
      return 153;
    case 4:
      return 183;
    case 5: 
      return 213;
    case 6:
      return 244;
    case 7:
      return 273;
    case 8:
      return 305;
    case 9:
      return 305;
    case 10:
      return 365;
    default:
      return 90;
  }
} 