import { Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"

export function ButtonLoading({ value }) {
  return (
    <Button disabled>
      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      {value || "Please wait"}
    </Button>
  )
}
