"use client";
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { EyeIcon, EyeOffIcon } from "lucide-react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  iconClassName?: string;
  placeholder?: string;
  type?: string;
}

const InputWithIcon = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, placeholder, iconClassName, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
      <div
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 relative",
          className
        )}
      >
        <input
          type={!showPassword ? type : "text"}
          placeholder={placeholder}
          className="w-full bg-transparent outline-none text-sm font-medium placeholder-text-muted-foreground"
          ref={ref}
          {...props}
        />
        {type === "password" && (
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
            {showPassword ? (
              <EyeIcon
                className={cn("w-5 h-5 text-muted-foreground", iconClassName)}
                onClick={() => setShowPassword(false)}
              />
            ) : (
              <EyeOffIcon
                className={cn("w-5 h-5 text-muted-foreground", iconClassName)}
                onClick={() => setShowPassword(true)}
              />
            )}
          </div>
        )}
      </div>
    );
  }
);
InputWithIcon.displayName = "InputWithIcon";

export { InputWithIcon };
