import { Smile } from "lucide-react"

import { Alert, AlertDescription, AlertTitle } from "./alert"

interface AlertSuccessProps {
  description: string
}

export function AlertSuccess({ description }: AlertSuccessProps) {
  return (
    <Alert variant="success">
      <Smile className="h-4 w-4" />
      <AlertTitle>Success!</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
    </Alert>
  )
}
