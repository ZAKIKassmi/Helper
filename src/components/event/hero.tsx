import Balancer from "react-wrap-balancer"

type Props = {}

export default function Hero({}: Props) {
 
  return (
    <div className="min-h-[20vh] md:min-h-[50vh] flex items-center">
      <div className="text-h6-d csxxs:text-p-n font-semibold csz:text-h6-d sm:text-h4-d md:text-h3-d lg:text-display-small animate-bottom-top  mx-auto text-center max-w-[90rem]">
        <Balancer>
          Join events and gain valuable insights about blood donation from <span className="text-c-red-500"> leading  experts. </span>
        </Balancer>
      </div>
    </div>
  )
}