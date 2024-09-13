import EventForm from "@/components/dashboard/event-form"

type Props = {}

export default function CreateEvent({}: Props) {
  return (
    <div className="w-full flex items-center min-h-[100vh]">
      <EventForm/>
    </div>
  )
}