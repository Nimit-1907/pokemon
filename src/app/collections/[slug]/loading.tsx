import { Container } from "@/components/layout/Container";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <>
      <section className="border-b border-border">
        <Container className="py-10 sm:py-14">
          <Skeleton className="h-4 w-40" />
          <div className="mt-6 flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <div className="max-w-xl space-y-3">
              <Skeleton className="h-11 w-72" />
              <Skeleton className="h-4 w-full max-w-md" />
              <Skeleton className="h-4 w-64" />
            </div>
            <Skeleton className="h-40 w-full shrink-0 rounded-xl md:w-80" />
          </div>
        </Container>
      </section>

      <section className="py-12">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[220px_1fr]">
            <div className="hidden space-y-2 lg:block">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-9 w-full" />
              ))}
            </div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="overflow-hidden rounded-xl border border-border">
                  <Skeleton className="aspect-square w-full rounded-none" />
                  <div className="space-y-2 p-4">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-3 w-1/2" />
                    <Skeleton className="mt-3 h-9 w-full" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
