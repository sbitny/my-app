"use client"

import { useState } from "react"
import { ColumnDef } from "@tanstack/react-table"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Combobox } from "@/components/ui/combobox"
import { DataTable } from "@/components/ui/data-table"
import { DatePicker } from "@/components/ui/date-picker"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

const frameworks = [
  { value: "next.js", label: "Next.js" },
  { value: "nuxt", label: "Nuxt" },
  { value: "remix", label: "Remix" },
  { value: "astro", label: "Astro" },
  { value: "sveltekit", label: "SvelteKit" },
]

const fruits = [
  { value: "apple", label: "Apple" },
  { value: "orange", label: "Orange" },
  { value: "banana", label: "Banana" },
]

type Invoice = {
  invoice: string
  status: string
  method: string
  amount: number
}

const invoices: Invoice[] = [
  { invoice: "INV001", status: "Paid", method: "Credit Card", amount: 250 },
  { invoice: "INV002", status: "Pending", method: "PayPal", amount: 180 },
  { invoice: "INV003", status: "Unpaid", method: "Bank Transfer", amount: 95 },
]

const invoiceColumns: ColumnDef<Invoice>[] = [
  {
    accessorKey: "invoice",
    header: "Invoice",
    cell: ({ row }) => <span className="font-medium">{row.getValue("invoice")}</span>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <span className="capitalize">{row.getValue("status")}</span>,
  },
  {
    accessorKey: "method",
    header: "Method",
  },
  {
    accessorKey: "amount",
    header: () => <span className="block text-right">Amount</span>,
    cell: ({ row }) => {
      const amount = row.original.amount
      return <span className="block text-right font-medium">${amount.toFixed(2)}</span>
    },
  },
]

const team = [
  { name: "Olivia Martin", email: "olivia.martin@example.com", role: "Editor" },
  { name: "Jackson Lee", email: "jackson.lee@example.com", role: "Developer" },
  { name: "Sofia Davis", email: "sofia.davis@example.com", role: "Designer" },
]

const paginationPages = [1, 2, 3, 4, 5]

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email." }),
})

export default function Home() {
  const [framework, setFramework] = useState(frameworks[0]?.value ?? "")
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [sliderValue, setSliderValue] = useState<number[]>([42])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "" },
  })

  return (
    <main className="flex min-h-screen items-center justify-center px-10 py-16">
      <div className="w-full max-w-4xl space-y-10">
        <div className="flex flex-wrap gap-4">
          <Button>Default</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
        </div>

        <Input placeholder="Default input" />

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((values) => console.log(values))}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="jane@example.com" {...field} />
                  </FormControl>
                  <FormDescription>We'll never share your email.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex gap-3">
              <Button type="submit" variant="secondary">
                Submit
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => form.reset({ email: "" })}
              >
                Reset
              </Button>
            </div>
          </form>
        </Form>

        <div className="space-y-4">
          <Label htmlFor="otp">OTP</Label>
          <InputOTP id="otp" maxLength={6} defaultValue="123456">
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
        </div>

        <Select defaultValue={fruits[0]?.value}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select a fruit" />
          </SelectTrigger>
          <SelectContent>
            {fruits.map((fruit) => (
              <SelectItem key={fruit.value} value={fruit.value}>
                {fruit.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Textarea placeholder="Write your message here" rows={4} />

        <Tabs defaultValue="account" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="password">Password</TabsTrigger>
          </TabsList>
          <TabsContent value="account" className="rounded border p-4">
            Make changes to your account here.
          </TabsContent>
          <TabsContent value="password" className="rounded border p-4">
            Change your password here.
          </TabsContent>
        </Tabs>

        <div className="flex items-center gap-3">
          <Checkbox id="terms" />
          <Label htmlFor="terms" className="font-normal">
            Accept terms and conditions
          </Label>
        </div>

        <RadioGroup defaultValue="comfortable" className="space-y-2">
          <div className="flex items-center gap-3">
            <RadioGroupItem value="default" id="r1" />
            <Label htmlFor="r1">Default</Label>
          </div>
          <div className="flex items-center gap-3">
            <RadioGroupItem value="comfortable" id="r2" />
            <Label htmlFor="r2">Comfortable</Label>
          </div>
          <div className="flex items-center gap-3">
            <RadioGroupItem value="compact" id="r3" />
            <Label htmlFor="r3">Compact</Label>
          </div>
        </RadioGroup>

        <div className="flex items-center gap-3">
          <Label htmlFor="airplane-mode">Airplane mode</Label>
          <Switch id="airplane-mode" />
        </div>

        <Combobox options={frameworks} value={framework} onChange={setFramework} />

        <DatePicker value={selectedDate} onChange={setSelectedDate} />

        <div className="space-y-4">
          <Label className="text-sm font-medium">Data table</Label>
          <DataTable columns={invoiceColumns} data={invoices} />
        </div>

        <Menubar>
          <MenubarMenu>
            <MenubarTrigger>File</MenubarTrigger>
            <MenubarContent>
              <MenubarItem>New Tab</MenubarItem>
              <MenubarItem>New Window</MenubarItem>
              <MenubarSeparator />
              <MenubarSub>
                <MenubarSubTrigger>Share</MenubarSubTrigger>
                <MenubarSubContent>
                  <MenubarItem>Email Link</MenubarItem>
                  <MenubarItem>Messages</MenubarItem>
                </MenubarSubContent>
              </MenubarSub>
              <MenubarSeparator />
              <MenubarItem>Print</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger>Edit</MenubarTrigger>
            <MenubarContent>
              <MenubarItem>Undo</MenubarItem>
              <MenubarItem>Redo</MenubarItem>
              <MenubarSeparator />
              <MenubarItem>Cut</MenubarItem>
              <MenubarItem>Copy</MenubarItem>
              <MenubarItem>Paste</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>

        <ToggleGroup type="multiple" className="flex gap-3">
          <ToggleGroupItem value="bold" aria-label="Toggle bold">
            B
          </ToggleGroupItem>
          <ToggleGroupItem value="italic" aria-label="Toggle italic">
            I
          </ToggleGroupItem>
          <ToggleGroupItem value="underline" aria-label="Toggle underline">
            U
          </ToggleGroupItem>
        </ToggleGroup>

        <div className="space-y-2">
          <Slider value={sliderValue} onValueChange={setSliderValue} max={100} step={1} />
          <div className="text-sm text-muted-foreground">Value: {sliderValue[0]}</div>
        </div>

        <div className="space-y-2">
          <Label>Progress</Label>
          <Progress value={64} className="w-[250px]" />
        </div>

        <div className="space-y-4">
          <Label className="text-sm font-medium">Team table</Label>
          <Table>
            <TableCaption>A list of the current team members.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {team.map((person) => (
                <TableRow key={person.email}>
                  <TableCell className="font-medium">{person.name}</TableCell>
                  <TableCell>{person.email}</TableCell>
                  <TableCell>{person.role}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>What is shadcn/ui?</AccordionTrigger>
            <AccordionContent>
              A collection of reusable components built using Radix UI and Tailwind CSS.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Is it customizable?</AccordionTrigger>
            <AccordionContent>
              Yes. Components are shipped as source so you can modify them to your needs.
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            {paginationPages.map((page) => (
              <PaginationItem key={page}>
                <PaginationLink href="#" isActive={page === 2}>
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </main>
  )
}
