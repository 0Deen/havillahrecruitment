import { SkeletonCardGrid, SkeletonPageHeader } from "@/components/Skeleton";

export default function Loading() {
  return (
    <div className="bg-sand-50">
      <SkeletonPageHeader />
      <div className="container-page pb-16">
        <SkeletonCardGrid count={6} />
      </div>
    </div>
  );
}
