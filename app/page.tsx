"use client"

import { Fragment, useState } from "react"
import type { ComponentType } from "react"
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
import { ButtonGroup } from "@/components/ui/button-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Combobox } from "@/components/ui/combobox"
import { DataTable } from "@/components/ui/data-table"
import { DatePicker } from "@/components/ui/date-picker"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "@/components/ui/field"
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
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group"
import { Label } from "@/components/ui/label"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
  ItemSeparator,
} from "@/components/ui/item"
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
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
import { Separator } from "@/components/ui/separator"
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
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip"
import * as LucideIcons from "lucide-react"
import {
  ArchiveIcon,
  ArrowLeftIcon,
  ArrowUpIcon,
  CalendarPlusIcon,
  ClockIcon,
  ExternalLinkIcon,
  ListPlusIcon,
  MailCheckIcon,
  MoreHorizontalIcon,
  PlusIcon,
  Search,
  TagIcon,
  Trash2Icon,
  BadgeCheckIcon,
  ChevronRightIcon,
} from "lucide-react"
import type { LucideProps } from "lucide-react"
import { IconCheck, IconInfoCircle, IconPlus } from "@tabler/icons-react"

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

const groupedPeople = [
  {
    username: "shadcn",
    avatar: "https://github.com/shadcn.png",
    email: "shadcn@vercel.com",
  },
  {
    username: "maxleiter",
    avatar: "https://github.com/maxleiter.png",
    email: "maxleiter@vercel.com",
  },
  {
    username: "evilrabbit",
    avatar: "https://github.com/evilrabbit.png",
    email: "evilrabbit@vercel.com",
  },
]

const itemLinks = [
  {
    title: "Visit our documentation",
    description: "Learn how to get started with our components.",
    href: "#",
    external: false,
  },
  {
    title: "Release notes",
    description: "Catch up on the latest updates and improvements.",
    href: "#",
    external: false,
  },
  {
    title: "External resource",
    description: "Opens in a new tab with security attributes.",
    href: "https://ui.shadcn.com/",
    external: true,
  },
]

const lucideIconNames = Object.entries(LucideIcons)
  .filter(([name, component]) => {
    if (!/^[A-Z]/.test(name)) return false
    if (["createLucideIcon", "LucideIcon", "default"].includes(name)) return false
    if (name.endsWith("Icon")) return false

    const isComponent =
      typeof component === "function" ||
      (typeof component === "object" && component !== null && "$$typeof" in component)

    return isComponent
  })
  .map(([name]) => name)
  .sort()

const paginationPages = [1, 2, 3, 4, 5]

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email." }),
})

export default function Home() {
  const [framework, setFramework] = useState(frameworks[0]?.value ?? "")
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [sliderValue, setSliderValue] = useState<number[]>([42])
  const [buttonGroupLabel, setButtonGroupLabel] = useState("personal")

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "" },
  })

  return (
    <main className="flex min-h-screen items-center justify-center px-10 py-16">
      <div className="w-full max-w-[768px] space-y-10">
        <div className="flex flex-wrap items-start gap-4">
          <div className="flex gap-4">
            <Button>Default</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
          </div>
          <ButtonGroup>
            <ButtonGroup className="hidden sm:flex">
              <Button variant="outline" size="icon" aria-label="Go Back">
                <ArrowLeftIcon />
              </Button>
            </ButtonGroup>
            <ButtonGroup>
              <Button variant="outline">Archive</Button>
              <Button variant="outline">Report</Button>
            </ButtonGroup>
            <ButtonGroup>
              <Button variant="outline">Snooze</Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon" aria-label="More Options">
                    <MoreHorizontalIcon />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-52">
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <MailCheckIcon />
                      Mark as Read
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <ArchiveIcon />
                      Archive
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <ClockIcon />
                      Snooze
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <CalendarPlusIcon />
                      Add to Calendar
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <ListPlusIcon />
                      Add to List
                    </DropdownMenuItem>
                    <DropdownMenuSub>
                      <DropdownMenuSubTrigger>
                        <TagIcon />
                        Label As...
                      </DropdownMenuSubTrigger>
                      <DropdownMenuSubContent>
                        <DropdownMenuRadioGroup
                          value={buttonGroupLabel}
                          onValueChange={setButtonGroupLabel}
                        >
                          <DropdownMenuRadioItem value="personal">
                            Personal
                          </DropdownMenuRadioItem>
                          <DropdownMenuRadioItem value="work">
                            Work
                          </DropdownMenuRadioItem>
                          <DropdownMenuRadioItem value="other">
                            Other
                          </DropdownMenuRadioItem>
                        </DropdownMenuRadioGroup>
                      </DropdownMenuSubContent>
                    </DropdownMenuSub>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem className="text-destructive focus:bg-destructive/10 focus:text-destructive">
                      <Trash2Icon />
                      Trash
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </ButtonGroup>
          </ButtonGroup>
        </div>

        <Input placeholder="Default input" />

        <div className="w-full max-w-3xl">
          <form>
            <FieldGroup>
              <FieldSet>
                <FieldLegend>Payment Method</FieldLegend>
                <FieldDescription>
                  All transactions are secure and encrypted
                </FieldDescription>
                <FieldGroup>
                  <Field>
                    <FieldLabel htmlFor="checkout-7j9-card-name-43j">
                      Name on Card
                    </FieldLabel>
                    <Input
                      id="checkout-7j9-card-name-43j"
                      placeholder="Evil Rabbit"
                      required
                    />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="checkout-7j9-card-number-uw1">
                      Card Number
                    </FieldLabel>
                    <Input
                      id="checkout-7j9-card-number-uw1"
                      placeholder="1234 5678 9012 3456"
                      required
                    />
                    <FieldDescription>
                      Enter your 16-digit card number
                    </FieldDescription>
                  </Field>
                  <div className="grid grid-cols-3 gap-4">
                    <Field>
                      <FieldLabel htmlFor="checkout-exp-month-ts6">
                        Month
                      </FieldLabel>
                      <Select defaultValue="">
                        <SelectTrigger id="checkout-exp-month-ts6">
                          <SelectValue placeholder="MM" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="01">01</SelectItem>
                          <SelectItem value="02">02</SelectItem>
                          <SelectItem value="03">03</SelectItem>
                          <SelectItem value="04">04</SelectItem>
                          <SelectItem value="05">05</SelectItem>
                          <SelectItem value="06">06</SelectItem>
                          <SelectItem value="07">07</SelectItem>
                          <SelectItem value="08">08</SelectItem>
                          <SelectItem value="09">09</SelectItem>
                          <SelectItem value="10">10</SelectItem>
                          <SelectItem value="11">11</SelectItem>
                          <SelectItem value="12">12</SelectItem>
                        </SelectContent>
                      </Select>
                    </Field>
                    <Field>
                      <FieldLabel htmlFor="checkout-7j9-exp-year-f59">
                        Year
                      </FieldLabel>
                      <Select defaultValue="">
                        <SelectTrigger id="checkout-7j9-exp-year-f59">
                          <SelectValue placeholder="YYYY" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="2024">2024</SelectItem>
                          <SelectItem value="2025">2025</SelectItem>
                          <SelectItem value="2026">2026</SelectItem>
                          <SelectItem value="2027">2027</SelectItem>
                          <SelectItem value="2028">2028</SelectItem>
                          <SelectItem value="2029">2029</SelectItem>
                        </SelectContent>
                      </Select>
                    </Field>
                    <Field>
                      <FieldLabel htmlFor="checkout-7j9-cvv">CVV</FieldLabel>
                      <Input id="checkout-7j9-cvv" placeholder="123" required />
                    </Field>
                  </div>
                </FieldGroup>
              </FieldSet>
              <FieldSeparator />
              <FieldSet>
                <FieldLegend>Billing Address</FieldLegend>
                <FieldDescription>
                  The billing address associated with your payment method
                </FieldDescription>
                <FieldGroup>
                  <Field orientation="horizontal">
                    <Checkbox
                      id="checkout-7j9-same-as-shipping-wgm"
                      defaultChecked
                    />
                    <FieldLabel
                      htmlFor="checkout-7j9-same-as-shipping-wgm"
                      className="font-normal"
                    >
                      Same as shipping address
                    </FieldLabel>
                  </Field>
                </FieldGroup>
              </FieldSet>
              <FieldSet>
                <FieldGroup>
                  <Field>
                    <FieldLabel htmlFor="checkout-7j9-optional-comments">
                      Comments
                    </FieldLabel>
                    <Textarea
                      id="checkout-7j9-optional-comments"
                      placeholder="Add any additional comments"
                      className="resize-none"
                    />
                  </Field>
                </FieldGroup>
              </FieldSet>
              <Field orientation="horizontal">
                <Button type="submit">Submit</Button>
                <Button variant="outline" type="button">
                  Cancel
                </Button>
              </Field>
            </FieldGroup>
          </form>
        </div>

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

        <TooltipProvider>
          <div className="grid w-full gap-6">
            <InputGroup>
              <InputGroupInput placeholder="Search..." />
              <InputGroupAddon>
                <Search />
              </InputGroupAddon>
              <InputGroupAddon align="inline-end">12 results</InputGroupAddon>
            </InputGroup>
            <InputGroup>
              <InputGroupInput placeholder="example.com" className="!pl-1" />
              <InputGroupAddon>
                <InputGroupText>https://</InputGroupText>
              </InputGroupAddon>
              <InputGroupAddon align="inline-end">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <InputGroupButton className="rounded-full" size="icon-xs">
                      <IconInfoCircle />
                    </InputGroupButton>
                  </TooltipTrigger>
                  <TooltipContent>This is content in a tooltip.</TooltipContent>
                </Tooltip>
              </InputGroupAddon>
            </InputGroup>
            <InputGroup>
              <InputGroupTextarea placeholder="Ask, Search or Chat..." />
              <InputGroupAddon align="block-end">
                <InputGroupButton
                  variant="outline"
                  className="rounded-full"
                  size="icon-xs"
                >
                  <IconPlus />
                </InputGroupButton>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <InputGroupButton variant="ghost">Auto</InputGroupButton>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    side="top"
                    align="start"
                    className="[--radius:0.95rem]"
                  >
                    <DropdownMenuItem>Auto</DropdownMenuItem>
                    <DropdownMenuItem>Agent</DropdownMenuItem>
                    <DropdownMenuItem>Manual</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <InputGroupText className="ml-auto">52% used</InputGroupText>
                <Separator orientation="vertical" className="!h-4" />
                <InputGroupButton
                  variant="default"
                  className="rounded-full"
                  size="icon-xs"
                  disabled
                >
                  <ArrowUpIcon />
                  <span className="sr-only">Send</span>
                </InputGroupButton>
              </InputGroupAddon>
            </InputGroup>
            <InputGroup>
              <InputGroupInput placeholder="@shadcn" />
              <InputGroupAddon align="inline-end">
                <div className="bg-primary text-primary-foreground flex size-4 items-center justify-center rounded-full">
                  <IconCheck className="size-3" />
                </div>
              </InputGroupAddon>
            </InputGroup>
          </div>
        </TooltipProvider>

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

        <div className="flex items-center gap-3">
          <Combobox options={frameworks} value={framework} onChange={setFramework} />
        </div>

        <div className="flex items-center gap-3">
          <DatePicker value={selectedDate} onChange={setSelectedDate} />
        </div>

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

        <ItemGroup className="flex w-full max-w-md flex-col gap-4">
          <Item variant="outline">
            <ItemMedia>
              <Avatar className="size-10">
                <AvatarImage src="https://github.com/evilrabbit.png" alt="@evilrabbit" />
                <AvatarFallback>ER</AvatarFallback>
              </Avatar>
            </ItemMedia>
            <ItemContent>
              <ItemTitle>Evil Rabbit</ItemTitle>
              <ItemDescription>Last seen 5 months ago</ItemDescription>
            </ItemContent>
            <ItemActions>
              <Button
                size="icon"
                variant="outline"
                className="size-8 rounded-full"
                aria-label="Invite"
              >
                <PlusIcon className="size-4" />
              </Button>
            </ItemActions>
          </Item>
          <Item variant="outline">
            <ItemMedia>
              <div className="*:data-[slot=avatar]:ring-background flex -space-x-2 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:grayscale">
                <Avatar className="hidden sm:flex">
                  <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <Avatar className="hidden sm:flex">
                  <AvatarImage src="https://github.com/maxleiter.png" alt="@maxleiter" />
                  <AvatarFallback>LM</AvatarFallback>
                </Avatar>
                <Avatar>
                  <AvatarImage src="https://github.com/evilrabbit.png" alt="@evilrabbit" />
                  <AvatarFallback>ER</AvatarFallback>
                </Avatar>
              </div>
            </ItemMedia>
            <ItemContent>
              <ItemTitle>No Team Members</ItemTitle>
              <ItemDescription>Invite your team to collaborate on this project.</ItemDescription>
            </ItemContent>
            <ItemActions>
              <Button size="sm" variant="outline">
                Invite
              </Button>
            </ItemActions>
          </Item>
          <Item variant="outline">
            <ItemContent>
              <ItemTitle>Basic Item</ItemTitle>
              <ItemDescription>
                A simple item with title and description.
              </ItemDescription>
            </ItemContent>
            <ItemActions>
              <Button variant="outline" size="sm">
                Action
              </Button>
            </ItemActions>
          </Item>
          <Item variant="outline" size="sm" asChild>
            <a href="#">
              <ItemMedia>
                <BadgeCheckIcon className="size-5" />
              </ItemMedia>
              <ItemContent>
                <ItemTitle>Your profile has been verified.</ItemTitle>
              </ItemContent>
              <ItemActions>
                <ChevronRightIcon className="size-4" />
              </ItemActions>
            </a>
          </Item>
          <Item variant="muted">
            <ItemContent>
              <ItemTitle>Muted Variant</ItemTitle>
              <ItemDescription>
                Subdued appearance with muted colors for secondary content.
              </ItemDescription>
            </ItemContent>
            <ItemActions>
              <Button variant="outline" size="sm">
                Open
              </Button>
            </ItemActions>
          </Item>
        </ItemGroup>

        <ItemGroup className="w-full max-w-md rounded-md border">
          {groupedPeople.map((person, index) => (
            <Fragment key={person.username}>
              <Item>
                <ItemMedia>
                  <Avatar>
                    <AvatarImage src={person.avatar} className="grayscale" alt={person.username} />
                    <AvatarFallback>{person.username.charAt(0)}</AvatarFallback>
                  </Avatar>
                </ItemMedia>
                <ItemContent className="gap-1">
                  <ItemTitle>{person.username}</ItemTitle>
                  <ItemDescription>{person.email}</ItemDescription>
                </ItemContent>
                <ItemActions>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <PlusIcon className="size-4" />
                  </Button>
                </ItemActions>
              </Item>
              {index !== groupedPeople.length - 1 && <ItemSeparator />}
            </Fragment>
          ))}
        </ItemGroup>

        <div className="flex w-full max-w-md flex-col gap-3">
          {itemLinks.map((item) => (
            <Item key={item.title} asChild>
              <a
                href={item.href}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noopener noreferrer" : undefined}
              >
                <ItemContent>
                  <ItemTitle>{item.title}</ItemTitle>
                  <ItemDescription>{item.description}</ItemDescription>
                </ItemContent>
                <ItemActions>
                  {item.external ? (
                    <ExternalLinkIcon className="size-4" />
                  ) : (
                    <ChevronRightIcon className="size-4" />
                  )}
                </ItemActions>
              </a>
            </Item>
          ))}
        </div>

        <ToggleGroup type="multiple" className="flex gap-3 justify-start">
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
          <Progress value={64} className="w-full" />
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

        <TooltipProvider>
          <div className="mt-[120px] flex flex-wrap gap-3">
            {lucideIconNames.map((name) => {
              const IconComponent = LucideIcons[name as keyof typeof LucideIcons] as ComponentType<LucideProps>
              return (
                <Tooltip key={name}>
                  <TooltipTrigger asChild>
                    <div className="flex size-6 items-center justify-center">
                      <IconComponent className="size-6" aria-hidden />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>{name}</TooltipContent>
                </Tooltip>
              )
            })}
          </div>
        </TooltipProvider>
      </div>
    </main>
  )
}
