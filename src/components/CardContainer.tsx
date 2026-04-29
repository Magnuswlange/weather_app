import type { ReactNode } from "react";

type Props = {
  children?: ReactNode; // work with children or no children
};

export default function CardContainer({ children }: Props) {
  return (
    <div className="w-full grid place-items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3 bg-surface px-4 py-2 gap-8">
      {children}
    </div>
  );
}
