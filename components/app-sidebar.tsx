"use client"
import { ArrowLeftRightIcon, ChevronDown, LayoutDashboardIcon, SettingsIcon, User2 } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { useAuth } from "@/context/auth-context"

// need adjustment
// Menu items.
const menuItems = [
  {
    title: "Summary",
    url: "/",
    icon: LayoutDashboardIcon,
  },
  {
    title: "Transaction",
    url: "/transaction",
    icon: ArrowLeftRightIcon,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: SettingsIcon,
  },
]

export function AppSidebar() {

  const {
    state,
    // open,
    // setOpen,
  } = useSidebar()

  const {
    logout
  } = useAuth();

  const pathname = "/transaction";
  
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton style={{ border: "1px solid #E0E0E0", boxShadow: "0px 4px 8px 4px rgba(99, 99, 99, 0.05)", }}>
                  <User2 /> Username
                  <ChevronDown className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side={state === "expanded" ? "bottom" : "right"}
                className="w-[--radix-popper-anchor-width]"
              >
                <DropdownMenuItem className="hover:cursor-pointer">
                  <span>Account</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:cursor-pointer" onClick={logout}>
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <div style={{ height: "1px", backgroundColor: "#E0E0E0" }}/>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild style={{ backgroundColor: pathname == item.url ? "black" : "white" }}>
                    <a href={item.url} style={{ color: pathname == item.url ? "white" : "black" }}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarGroup>
          <SidebarGroupContent>
            {state === "expanded" && (
              <>
                <p className="text-lg text-neutral-800 font-bold">PERSONAL PLANNER</p>
                <p className="text-xs text-neutral-400">2025 - Faris.</p>
                <div style={{ height: "1px", backgroundColor: "#E0E0E0", margin: "12px 0px" }}/>
                <div>
                  <a href="/privacy-policy" className="text-xs text-neutral-400">Privacy Policy</a>
                </div>
              </>
            )}
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarFooter>
    </Sidebar>
  )
}
