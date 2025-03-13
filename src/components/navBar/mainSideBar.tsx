"use client";

import * as React from "react";
import { Command, Crown, Gamepad2, Medal, Settings } from "lucide-react";

import { NavUser } from "@/components/navBar/sideBarUserMenu";
import { Label } from "@/components/ui/label";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarInput,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Switch } from "@/components/ui/switch";
import Image from "next/image";
import Link from "next/link";
import { GetGameStats } from "./newsFeedSideBar";

const links = [
  {
    title: "Spil",
    url: "",
    icon: Gamepad2,
    isActive: true,
  },
  {
    title: "Rangliste",
    url: "Rangliste",
    icon: Crown,
    isActive: false,
  },
  {
    title: "Præstationer",
    url: "Achievements",
    icon: Medal,
    isActive: false,
  },
  // {
  //   title: "Indstillinger",
  //   url: "Indstillinger",
  //   icon: Settings,
  //   isActive: false,
  // },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  // Note: I'm using state to show active item.
  // IRL you should use the url/router.
  const [activeItem, setActiveItem] = React.useState(links[0]);
  const { setOpenMobile } = useSidebar();

  // Function to handle link clicks - will close the sidebar
  const handleLinkClick = () => {
    setOpenMobile(false);
  };

  return (
    <Sidebar
      collapsible="icon"
      className="overflow-hidden [&>[data-sidebar=sidebar]]:flex-row"
      {...props}
    >
      {/* This is the first sidebar */}
      {/* We disable collapsible and adjust width to icon. */}
      {/* This will make the sidebar appear as icons. */}
      <Sidebar
        collapsible="none"
        className="!w-[calc(var(--sidebar-width-icon)_+_1px)] border-r"
      >
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" asChild className="md:h-8 md:p-0">
                <a href="/" onClick={handleLinkClick}>
                  <div className="flex aspect-square size-8 items-center justify-center rounded-lg">
                    <Image
                      src="/logo.png"
                      alt="avatar"
                      width={50}
                      height={50}
                      className="object-contain"
                    />
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold font-[--]">
                      Pilot Arcade
                    </span>
                    <span className="truncate text-xs">
                      Alle dine maritime spil, samlet et sted!
                    </span>
                  </div>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent className="px-1.5 md:px-0">
              <SidebarMenu>
                {links.map((link) => (
                  <SidebarMenuItem key={link.title}>
                    <Link href={`/${link.url}`} onClick={handleLinkClick}>
                      <SidebarMenuButton
                        tooltip={{
                          children: link.title,
                          hidden: false,
                        }}
                      >
                        <link.icon />

                        <span>{link.title}</span>
                      </SidebarMenuButton>
                    </Link>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <NavUser />
        </SidebarFooter>
      </Sidebar>
      <GetGameStats />
    </Sidebar>
  );
}
