import {
  LayoutGrid,
  LucideIcon
} from "lucide-react";



type Menu = {
  href: string;
  label: string;
  active: boolean;
  type: string;
};



export function getMenuList(pathname: string): Menu[] {
  return(
      [
        {
          href: "/create-event",
          label: "Create Event",
          active: pathname.includes("/create-event"),
          type: 'plus'
        },
        {
          href: "/dashboard",
          label: "Overview",
          active: pathname.includes("/dashboard"),
          type: 'home-hospital'
        },
        {
          href: "/donors",
          label: "Donors",
          active: pathname.includes("/donors"),
          type: 'donors'
        },
        {
          href: "/blood-levels",
          label: "Blood Levels",
          active: pathname.includes("/blood-levels"),
          type: 'cardiology'
        },
        {
          href: "/settings",
          label: "Settings",
          active: pathname.includes("/settings"),
          type: 'settings'
        },
      ]
    )
}