import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";


export default function DashboardAvatar() {
  return (
    <div className="flex gap-2 items-center">
      
      <Avatar>
        <AvatarImage src="" alt="user avatar"/>
        <AvatarFallback>E</AvatarFallback>
      </Avatar>

      <div className="flex flex-col gap-[.1rem]">
        <p className="text-label-s text-n-900">
          Emma D&apos;arcy
        </p>
        <p className="text-label-x-small text-n-200">
          Administrator
        </p>
      </div>
    </div>
  )
}