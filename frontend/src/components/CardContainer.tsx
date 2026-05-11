import type { ReactNode } from "react";

type Props = {
  children?: ReactNode; // work with children or no children
};

export default function CardContainer({ children }: Props) {
  return (
    <div className="grid w-full grid-cols-1 gap-4 bg-surface px-4 py-2 auto-rows-[350px] md:grid-cols-2 lg:grid-cols-3">
      {children}
    </div>
  );
}
