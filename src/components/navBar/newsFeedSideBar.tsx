"use client";

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

import { getNewsFeed, NewsFeedItem } from "../actions/GetNewsFeed";
import { useEffect, useState } from "react";
import { Badge } from "../ui/badge";
import { formatTimeAgo } from "@/lib/dateFormatter";

export function GetGameStats() {
  const [newsFeedItems, setNewsFeedItems] = useState<NewsFeedItem[]>([]);

  useEffect(() => {
    getNewsFeed().then((newsFeed) => {
      setNewsFeedItems(newsFeed);
    });
  }, []);

  if (!newsFeedItems.length) {
    return;
  }
  return (
    <Sidebar collapsible="none" className={`hidden flex-1 md:flex `}>
      <SidebarContent>
        <SidebarGroup className="px-0">
          <SidebarGroupContent>
            {newsFeedItems.map((item) => (
              <a
                href="#"
                key={item.date.toISOString()}
                className="flex flex-col items-start gap-2 whitespace-nowrap border-b p-4 text-sm leading-tight last:border-b-0 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              >
                <div className="flex justify-between w-full mb-1">
                  <Badge
                    className={
                      item.type == "Highscore"
                        ? "bg-amber-400 text-amber-950"
                        : ""
                    }
                  >
                    {item.type}
                  </Badge>
                  <Badge variant="outline">{item.gameName}</Badge>
                </div>
                <div className="flex w-full items-center gap-2">
                  <span>{item.playerName}</span>{" "}
                  <span className="ml-auto text-xs">
                    {formatTimeAgo(item.date)}
                  </span>
                </div>
                <span className="font-medium">{item.title}</span>
                <span className="line-clamp-2 w-[260px] whitespace-break-spaces text-xs">
                  {item.description}
                </span>
              </a>
            ))}
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
