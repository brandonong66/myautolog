import { AlertCircle, FileWarning, Terminal } from "lucide-react"

import { Alert, AlertDescription, AlertTitle } from "./alert"

interface AlertDestructiveProps {
  description: string
}

export function AlertDestructive({ description }: AlertDestructiveProps) {
  return (
    <Alert variant="destructive">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
    </Alert>
  )
}
