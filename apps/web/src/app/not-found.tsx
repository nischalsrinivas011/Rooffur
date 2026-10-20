import { ErrorState } from "@/components/layout/ErrorState";
import { PublicLayout } from "@/components/layout/PublicLayout";

export default function NotFound() {
  return (
    <PublicLayout>
      <ErrorState
        title="Page not found"
        message="We couldn't find the page you were looking for."
      />
    </PublicLayout>
  );
}
