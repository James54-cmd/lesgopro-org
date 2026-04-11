"use client"

import * as React from "react"
import { Input } from "@/components/ui/input"
import {
  formatPhilippineMobileNumber,
  normalizePhilippineMobileNumber,
} from "@/lib/phone-number"

export interface PhoneInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "value" | "type"> {
  value?: string
  onValueChange?: (value: string) => void
}

const PhoneInput = React.forwardRef<HTMLInputElement, PhoneInputProps>(
  ({ value = "", onValueChange, ...props }, ref) => {
    const displayValue = formatPhilippineMobileNumber(value)

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
      const normalizedValue = normalizePhilippineMobileNumber(event.target.value)
      onValueChange?.(normalizedValue)
    }

    return (
      <Input
        {...props}
        ref={ref}
        type="tel"
        inputMode="numeric"
        autoComplete="tel"
        value={displayValue}
        onChange={handleChange}
      />
    )
  }
)

PhoneInput.displayName = "PhoneInput"

export { PhoneInput }
