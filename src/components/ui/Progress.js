// components/ui/Progress.js
import * as React from "react"

export default function Progress({ value, className }) {
  return <progress value={value} className={className} />
}