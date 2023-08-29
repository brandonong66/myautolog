import { cn } from "../../lib/utils"
interface typographyProps {
  variant:
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "p"
    | "blockquote"
    | "large"
    | "small"
    | "muted"
  children: React.ReactNode
  className?: string
}

function Typography({ variant, children, className }: typographyProps) {
  return (
    <>
      {variant === "h1" && (
        <h1
          className={
            "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl " +
            className
          }
        >
          {children}
        </h1>
      )}
      {variant === "h2" && (
        <h2 className=" scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
          {children}
        </h2>
      )}
      {variant === "h3" && (
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          {children}
        </h3>
      )}
      {variant === "h4" && (
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
          {children}
        </h4>
      )}
      {variant === "p" && <p className={cn("", className)}>{children}</p>}
      {variant === "blockquote" && (
        <blockquote className="mt-6 border-l-2 pl-6 italic">
          {children}
        </blockquote>
      )}
      {variant === "large" && (
        <div className="text-lg font-semibold">{children}</div>
      )}
      {variant === "small" && (
        <small className="text-sm font-medium leading-none">{children}</small>
      )}
      {variant === "muted" && (
        <p className="text-sm text-muted-foreground">{children}</p>
      )}
    </>
  )
}

export default Typography
