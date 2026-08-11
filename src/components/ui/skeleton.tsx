import { cn } from "@/lib/utils"

/*
  A loading placeholder.

  The pulse it used to rely on says "something is here"; the sweep says
  "something is coming". On a card shop that reads as the light crossing a
  sleeve, which is the same gesture `.slab` makes on the tiles these stand in
  for — so the wait looks like part of the same site rather than like a generic
  shell. See `.skeleton-sweep` in `globals.css`.
*/
function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn("skeleton-sweep rounded-md bg-accent", className)}
      {...props}
    />
  )
}

export { Skeleton }
