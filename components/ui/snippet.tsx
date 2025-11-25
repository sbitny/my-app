import * as React from "react"
import type { ComponentType, ReactNode } from "react"
import { ArrowDownRight, ArrowUpRight, Heart } from "lucide-react"
import type { LucideProps } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

type SnippetPrice = {
  current: string
  previous?: string
  discount?: string
  trend?: "up" | "down" | null
}

export type SnippetMetaItem = {
  id?: string
  icon: ComponentType<LucideProps>
  content: ReactNode
}

export interface SnippetProps extends React.HTMLAttributes<HTMLElement> {
  title: string
  image: {
    src: string
    alt?: string
  }
  price: SnippetPrice
  meta?: SnippetMetaItem[]
  isFavorite?: boolean
  onFavoriteToggle?: (next: boolean) => void
  favoriteLabel?: string
}

const trendIconMap = {
  down: ArrowDownRight,
  up: ArrowUpRight,
}

export function Snippet({
  title,
  price,
  image,
  meta = [],
  isFavorite = false,
  onFavoriteToggle,
  favoriteLabel = isFavorite ? "Убрать из избранного" : "Добавить в избранное",
  className,
  ...props
}: SnippetProps) {
  const TrendIcon = price.trend ? trendIconMap[price.trend] : null

  const handleFavoriteToggle = React.useCallback(() => {
    onFavoriteToggle?.(!isFavorite)
  }, [isFavorite, onFavoriteToggle])

  return (
    <article
      className={cn(
        "flex gap-4 rounded-[20px] border bg-card p-4 text-sm leading-normal shadow-sm",
        className
      )}
      {...props}
    >
      <div className="relative w-28 shrink-0 overflow-hidden rounded-[16px] bg-muted">
        <img
          src={image.src}
          alt={image.alt ?? title}
          className="size-full object-cover"
          loading="lazy"
        />
      </div>
      <div className="flex flex-1 flex-col gap-3">
        <div className="flex items-start gap-3">
          <h3 className="flex-1 text-base font-medium leading-snug">{title}</h3>
          <Button
            type="button"
            size="icon"
            variant="ghost"
            className="size-8 rounded-full"
            aria-label={favoriteLabel}
            aria-pressed={isFavorite}
            onClick={handleFavoriteToggle}
          >
            <Heart
              className="size-5 transition-colors"
              strokeWidth={isFavorite ? 1 : 2}
              fill={isFavorite ? "currentColor" : "none"}
            />
          </Button>
        </div>

        <div className="space-y-1">
          <div className="flex items-center gap-2 text-sm font-bold leading-normal">
            <span>{price.current}</span>
            {TrendIcon && (
              <TrendIcon
                className={cn(
                  "size-4",
                  price.trend === "down" ? "text-emerald-600" : "text-red-500"
                )}
                strokeWidth={1.5}
                aria-label={price.trend === "down" ? "Цена снизилась" : "Цена выросла"}
              />
            )}
          </div>
          {(price.previous || price.discount) && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              {price.previous && <span className="line-through">{price.previous}</span>}
              {price.discount && <span className="text-destructive font-medium">{price.discount}</span>}
            </div>
          )}
        </div>

        {meta.length > 0 && (
          <ul className="flex flex-col gap-1.5">
            {meta.map((item, index) => {
              const Icon = item.icon
              return (
                <li key={item.id ?? index} className="flex items-start gap-2">
                  <Icon className="mt-0.5 size-4 shrink-0 text-muted-foreground" strokeWidth={1.33} />
                  <div className="text-sm leading-normal text-foreground">{item.content}</div>
                </li>
              )
            })}
          </ul>
        )}
      </div>
    </article>
  )
}
