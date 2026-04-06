import { PenSquare, Mic, History, LogOut, Sparkles, Crown } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";

const navItems = [
  { title: "Criar Post", url: "/", icon: PenSquare },
  { title: "Minha Marca (Voz)", url: "/marca", icon: Mic },
  { title: "Histórico", url: "/historico", icon: History },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();

  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        {/* Logo */}
        <div className="flex items-center gap-3 px-4 py-5 border-b border-sidebar-border">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg gradient-primary">
            <Sparkles className="h-5 w-5 text-primary-foreground" />
          </div>
          {!collapsed && (
            <div className="flex flex-col">
              <span className="text-sm font-bold text-sidebar-accent-foreground">Assistente</span>
              <span className="text-xs text-sidebar-foreground">de Posts</span>
            </div>
          )}
        </div>

        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end
                      className="hover:bg-sidebar-accent/50 transition-colors"
                      activeClassName="bg-sidebar-accent text-sidebar-primary font-medium"
                    >
                      <item.icon className="mr-2 h-4 w-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border p-3 space-y-3">
        {/* Credits */}
        <div className="rounded-lg bg-sidebar-accent p-3">
          <div className="flex items-center gap-2">
            <span className="text-base">🪙</span>
            {!collapsed && (
              <span className="text-xs font-medium text-sidebar-foreground">
                15 Créditos restantes
              </span>
            )}
          </div>
          {!collapsed && (
            <button className="mt-2 w-full flex items-center justify-center gap-1.5 rounded-md gradient-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground transition-transform hover:scale-[1.02] active:scale-[0.98]">
              <Crown className="h-3.5 w-3.5" />
              Fazer Upgrade
            </button>
          )}
        </div>

        {/* User */}
        <div className="flex items-center gap-2.5">
          <div className="h-8 w-8 shrink-0 rounded-full bg-sidebar-accent flex items-center justify-center text-xs font-semibold text-sidebar-foreground">
            JP
          </div>
          {!collapsed && (
            <>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-sidebar-accent-foreground truncate">João Pedro</p>
                <p className="text-[10px] text-sidebar-foreground truncate">joao@email.com</p>
              </div>
              <button className="text-sidebar-foreground hover:text-sidebar-accent-foreground transition-colors">
                <LogOut className="h-4 w-4" />
              </button>
            </>
          )}
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
