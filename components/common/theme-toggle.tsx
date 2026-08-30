"use client";

import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { useMounted } from "@/hooks/use-mounted";
import { Button } from "@/components/ui/button";

const themes = [
  { value: "system", label: "System", icon: Monitor },
  { value: "light", label: "Light", icon: Sun },
  { value: "dark", label: "Dark", icon: Moon },
] as const;

export function ThemeToggle() {
  const mounted = useMounted();
  const { theme, setTheme } = useTheme();

  return (
    <div
      aria-label="Theme"
      className="flex items-center gap-1 rounded-md border bg-background p-1"
      role="group"
    >
      {themes.map(({ value, label, icon: Icon }) => (
        <Button
          aria-label={`${label} theme`}
          aria-pressed={mounted && theme === value}
          key={value}
          onClick={() => setTheme(value)}
          size="icon"
          variant={mounted && theme === value ? "default" : "ghost"}
        >
          <Icon data-icon="inline-start" />
          <span className="sr-only">{label}</span>
        </Button>
      ))}
    </div>
  );
}

export { themes };

// next-themes persists the selected theme in localStorage and applies the
// matching class to <html>, including the "dark" class for dark mode.
