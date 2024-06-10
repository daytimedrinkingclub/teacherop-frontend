// components/ui/Collapsible.js
import * as React from "react"
import { ChevronsUpDown } from "lucide-react"

export function Collapsible({ children, ...props }) {
  return <div {...props}>{children}</div>
}

export function CollapsibleContent({ children, ...props }) {
  return <div {...props}>{children}</div>
}

export function CollapsibleTrigger({ children, asChild, ...props }) {
  return asChild ? (
    React.cloneElement(children, props)
  ) : (
    <button {...props}>
      {children}
      <ChevronsUpDown className="h-4 w-4" />
      <span className="sr-only">Toggle</span>
    </button>
  )
}