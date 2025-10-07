import { Card, CardContent } from "./ui/card";

export const GameSkeleton = () => {
  return (
    <Card className="overflow-hidden border-border bg-card">
      <div className="aspect-[16/9] skeleton-card" />
      <CardContent className="p-4 space-y-3">
        <div className="h-6 skeleton-card w-3/4" />
        <div className="flex gap-2">
          <div className="h-5 skeleton-card w-16" />
          <div className="h-5 skeleton-card w-16" />
        </div>
        <div className="flex justify-between">
          <div className="h-4 skeleton-card w-12" />
          <div className="h-4 skeleton-card w-12" />
        </div>
      </CardContent>
    </Card>
  );
};
