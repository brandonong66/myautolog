// icons
import { Check, X } from "lucide-react"

// components
import { Button } from "./ui/button"

import { cn } from "../lib/utils"

function ConfirmedDelete({
  onConfirm,
  onCancel,
  className,
}: {
  onConfirm: () => void
  onCancel: () => void
  className?: string
}) {
  return (
    <div className={cn("my-2", className)}>
      <Button className="mr-2" onClick={onCancel} variant="outline">
        <X />
      </Button>
      <Button className="text-white" onClick={onConfirm}>
        <Check />
      </Button>
    </div>
  )
}

export default ConfirmedDelete
