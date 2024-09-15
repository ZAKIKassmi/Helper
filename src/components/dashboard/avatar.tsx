import { getBloodBank } from "../../../general-actions/utils";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";


export default async function DashboardAvatar() {
  const user = await getBloodBank();
  return (
    <div className="flex gap-2 items-center">
      
      <Avatar>
        <AvatarImage src={""} alt={ "blood bank dashboard avatar"}/>
        <AvatarFallback>{user?.name.charAt(0).toUpperCase() || "U"}</AvatarFallback>
      </Avatar>

      <div className="flex flex-col gap-[.1rem]">
        <p className="text-label-s text-n-900">
          {user?.name || "Unknown"}
        </p>
        <p className="text-label-x-small text-n-200">
          Administrator
        </p>
      </div>
    </div>
  )
}