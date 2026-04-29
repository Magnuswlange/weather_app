import type { MouseEventHandler, ReactNode } from "react";

const sizes = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
  xl: "px-10 py-5 text-xl",
};

type Size = keyof typeof sizes;

type Props = {
  className: string;
  size: Size;
  children: ReactNode;
  onClick: MouseEventHandler;
  disabled: boolean;
};

const baseClasses =
  "relative overflow-hidden rounded-full font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-highlight-hover bg-highlight text-foreground hover:bg-highlight-hover shadow-lg shadow-black/25 transition hover:scale-110 hover:cursor-pointer hover:text-black";

export const Button = ({
  className = "",
  size = "md",
  children,
  onClick,
  disabled,
}: Props) => {
  const classes = `${baseClasses} ${sizes[size]} ${className}`;

  return (
    <button onClick={onClick} className={classes} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;
