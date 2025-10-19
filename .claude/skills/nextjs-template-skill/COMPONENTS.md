# Component Reference

## UI Components Library

Complete listing of all 30+ shadcn/ui components with usage examples.

### Forms & Inputs

**Form**
```tsx
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const formSchema = z.object({
  username: z.string().min(2).max(50),
})

function MyForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { username: "" },
  })

  return (
    <Form {...form}>
      <FormField
        control={form.control}
        name="username"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Username</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </Form>
  )
}
```

**Select**
```tsx
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

<Select>
  <SelectTrigger>
    <SelectValue placeholder="Select option" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="option1">Option 1</SelectItem>
    <SelectItem value="option2">Option 2</SelectItem>
  </SelectContent>
</Select>
```

### Data Display

**DataTable with TanStack**
```tsx
import { DataTable } from "@/components/data-table"
import { ColumnDef } from "@tanstack/react-table"

const columns: ColumnDef<User>[] = [
  { accessorKey: "name", header: "Name" },
  { accessorKey: "email", header: "Email" },
]

<DataTable columns={columns} data={users} />
```

**Charts with Recharts**
```tsx
import { ChartContainer, ChartTooltip } from "@/components/ui/chart"
import { AreaChart, Area, XAxis, YAxis } from "recharts"

<ChartContainer config={chartConfig}>
  <AreaChart data={data}>
    <XAxis dataKey="month" />
    <YAxis />
    <ChartTooltip />
    <Area type="monotone" dataKey="value" />
  </AreaChart>
</ChartContainer>
```

### Dialogs & Overlays

**Dialog**
```tsx
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

<Dialog>
  <DialogTrigger asChild>
    <Button>Open Dialog</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Title</DialogTitle>
      <DialogDescription>Description</DialogDescription>
    </DialogHeader>
    {/* Content */}
  </DialogContent>
</Dialog>
```

**Sheet (Drawer)**
```tsx
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

<Sheet>
  <SheetTrigger asChild>
    <Button>Open</Button>
  </SheetTrigger>
  <SheetContent>
    <SheetHeader>
      <SheetTitle>Title</SheetTitle>
      <SheetDescription>Description</SheetDescription>
    </SheetHeader>
  </SheetContent>
</Sheet>
```

### Navigation

**Dropdown Menu**
```tsx
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="ghost">Menu</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>Actions</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem>Profile</DropdownMenuItem>
    <DropdownMenuItem>Settings</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
```

### Layout Components

**Card**
```tsx
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card description</CardDescription>
  </CardHeader>
  <CardContent>Content</CardContent>
  <CardFooter>Footer</CardFooter>
</Card>
```

**Tabs**
```tsx
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

<Tabs defaultValue="tab1">
  <TabsList>
    <TabsTrigger value="tab1">Tab 1</TabsTrigger>
    <TabsTrigger value="tab2">Tab 2</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">Content 1</TabsContent>
  <TabsContent value="tab2">Content 2</TabsContent>
</Tabs>
```

### Feedback

**Toast Notifications**
```tsx
import { toast } from "sonner"

// Success
toast.success("Operation successful")

// Error
toast.error("Something went wrong")

// With action
toast("Message", {
  action: {
    label: "Undo",
    onClick: () => console.log("Undo")
  },
})
```

**Alert Dialog**
```tsx
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"

<AlertDialog>
  <AlertDialogTrigger asChild>
    <Button variant="destructive">Delete</Button>
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
      <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction>Continue</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
```

## Complete Component List

### Forms
- `form` - Form wrapper with React Hook Form integration
- `input` - Text input field
- `textarea` - Multi-line text input
- `select` - Dropdown selection
- `checkbox` - Checkbox input
- `radio-group` - Radio button group
- `switch` - Toggle switch
- `slider` - Range slider
- `input-otp` - One-time password input
- `date-picker` - Date selection with calendar

### Display
- `avatar` - User avatar with fallback
- `badge` - Status indicators and labels
- `card` - Content container
- `skeleton` - Loading placeholder
- `separator` - Visual divider
- `aspect-ratio` - Maintain aspect ratio container

### Navigation
- `breadcrumb` - Page hierarchy navigation
- `dropdown-menu` - Actions dropdown
- `menubar` - Application menu bar
- `navigation-menu` - Complex navigation
- `pagination` - Page navigation
- `tabs` - Tabbed interface

### Overlays
- `dialog` - Modal dialog
- `sheet` - Drawer/slide-over panel
- `alert-dialog` - Confirmation dialog
- `hover-card` - Hover information card
- `popover` - Floating panel
- `tooltip` - Hover tooltips
- `context-menu` - Right-click menu

### Data
- `table` - Data table with TanStack
- `chart` - Recharts wrapper components
- `calendar` - Date picker calendar
- `carousel` - Image/content slider

### Layout
- `accordion` - Expandable sections
- `collapsible` - Collapsible content
- `resizable` - Resizable panels
- `scroll-area` - Custom scrollbar area
- `sidebar` - Application sidebar system