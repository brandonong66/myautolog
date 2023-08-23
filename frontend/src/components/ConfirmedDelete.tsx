import { useState } from "react"
// icons
import { Check, X, Trash2 } from "lucide-react"

// components
import { Button } from "./ui/button"

import { cn } from "../lib/utils"

function ConfirmedDelete({
  onConfirm,
  className,
}: {
  onConfirm: () => void
  className?: string
}) {
  const [confirmDelete, setConfirmDelete] = useState(false)
  return (
    <>
      {confirmDelete ? (
        <div className={cn("", className)}>
          <Button className="mr-2" onClick={() => setConfirmDelete(false)} variant="outline">
            <X />
          </Button>
          <Button  onClick={onConfirm} variant="destructive">
            <Check />
          </Button>
        </div>
      ) : (
        <Button
          className={cn("", className)}
          variant="destructive"
          onClick={() => setConfirmDelete(true)}
        >
          <Trash2 />
        </Button>
      )}
    </>
  )
}

export default ConfirmedDelete
