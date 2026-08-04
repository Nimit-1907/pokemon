import { Container } from "@/components/layout/Container";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <section>
      <Container className="py-10 sm:py-14">
        <Skeleton className="h-4 w-32" />
        <div className="mt-6 grid gap-8 lg:grid-cols-[1.5fr_1fr]">
          <div className="space-y-4">
            <Skeleton className="aspect-video w-full rounded-2xl" />
            <Skeleton className="h-6 w-32 rounded-full" />
            <Skeleton className="h-9 w-2/3" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-4/5" />
          </div>
          <Skeleton className="h-80 w-full rounded-2xl" />
        </div>
      </Container>
    </section>
  );
}
