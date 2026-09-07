"use client";
import Link from "next/link";
import { forwardRef } from "react";

interface AnimatedLinkProps extends React.ComponentProps<typeof Link> {
  className?: string;
  children: React.ReactNode;
}

/**
 * A link with an underline that draws in from the left on hover/focus,
 * built with a single CSS transition (no JS) so it stays cheap wherever it's
 * used — social rows, footer links, inline nav.
 */
const AnimatedLink = forwardRef<HTMLAnchorElement, AnimatedLinkProps>(
  function AnimatedLink({ className = "", children, ...rest }, ref) {
    return (
      <Link
        ref={ref}
        className={`group relative inline-block w-fit ${className}`}
        {...rest}
      >
        <span>{children}</span>
        <span
          aria-hidden="true"
          className="absolute left-0 -bottom-0.5 h-px w-full origin-left scale-x-0 bg-current transition-transform duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:scale-x-100 group-focus-visible:scale-x-100"
        />
      </Link>
    );
  }
);

export default AnimatedLink;
