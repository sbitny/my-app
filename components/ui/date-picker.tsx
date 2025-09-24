"use client"

import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

type DatePickerProps = {
  value?: Date
  onChange?: (date: Date | undefined) => void
  placeholder?: string
  className?: string
  formatString?: string
}

export function DatePicker({
  value,
  onChange,
  placeholder = "Pick a date",
  className,
  formatString = "PPP",
}: DatePickerProps) {
  const [open, setOpen] = React.useState(false)
  const [internalDate, setInternalDate] = React.useState<Date | undefined>(value)

  const date = value ?? internalDate

  const handleSelect = React.useCallback(
    (selectedDate: Date | undefined) => {
      if (onChange) {
        onChange(selectedDate)
      }

      if (value === undefined) {
        setInternalDate(selectedDate)
      }
    },
    [onChange, value]
  )

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-[250px] justify-start text-left font-normal",
            !date && "text-muted-foreground",
            className
          )}
          onClick={() => setOpen((prev) => !prev)}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, formatString) : placeholder}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar mode="single" selected={date} onSelect={handleSelect} initialFocus />
      </PopoverContent>
    </Popover>
  )
}
