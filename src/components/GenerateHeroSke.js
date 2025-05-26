export default function SkeletonBlogCard() {
  return (
    <div className="max-w-3xl mx-auto border border-border rounded-2xl">
      <div className="rounded-2xl bg-card text-card-foreground p-8 overflow-hidden shadow-sm">
        <div className="space-y-4">
          {/* Category skeleton */}
          <div className="inline-block w-28 h-8 rounded-full bg-muted animate-pulse"></div>

          {/* Title skeleton */}
          <div className="space-y-2">
            <div className="h-8 bg-muted rounded-md w-full animate-pulse"></div>
            <div className="h-8 bg-muted rounded-md w-3/4 animate-pulse"></div>
          </div>

          {/* Content skeleton */}
          <div className="space-y-2">
            <div className="h-4 bg-muted rounded w-full animate-pulse"></div>
            <div className="h-4 bg-muted rounded w-full animate-pulse"></div>
            <div className="h-4 bg-muted rounded w-2/3 animate-pulse"></div>
          </div>

          {/* Author and read time skeleton */}
          <div className="flex items-center justify-between pt-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-muted animate-pulse"></div>
              <div className="w-20 h-4 bg-muted rounded animate-pulse"></div>
            </div>
            <div className="w-16 h-4 bg-muted rounded animate-pulse"></div>
          </div>

          {/* Read article link skeleton */}
          <div className="w-28 h-6 bg-muted rounded animate-pulse"></div>
        </div>

        {/* Pagination dots skeleton */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
            <div key={i} className="w-2 h-2 rounded-full bg-muted animate-pulse"></div>
          ))}
        </div>
      </div>
    </div>
  )
}
