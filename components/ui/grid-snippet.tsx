import * as React from "react"
import type { ComponentType, ReactNode } from "react"
import { ArrowDownCircle, Heart } from "lucide-react"
import type { LucideProps } from "lucide-react"

import { cn } from "@/lib/utils"

type GridSnippetPrice = {
  current: string
  previous?: string
  discount?: string
  showDropIcon?: boolean
}

export type GridSnippetMetaItem = {
  id?: string
  icon?: ComponentType<LucideProps>
  content: ReactNode
  muted?: boolean
}

export interface GridSnippetProps extends React.HTMLAttributes<HTMLElement> {
  title: string
  image: {
    src: string
    alt?: string
  }
  price: GridSnippetPrice
  meta?: GridSnippetMetaItem[]
  isFavorite?: boolean
  onFavoriteToggle?: (next: boolean) => void
  favoriteLabel?: string
}

export function GridSnippet({
  title,
  price,
  image,
  meta = [],
  isFavorite = false,
  onFavoriteToggle,
  favoriteLabel = isFavorite ? "Убрать из избранного" : "Добавить в избранное",
  className,
  ...props
}: GridSnippetProps) {
  const handleFavoriteToggle = React.useCallback(() => {
    onFavoriteToggle?.(!isFavorite)
  }, [isFavorite, onFavoriteToggle])

  return (
    <article
      className={cn("flex flex-col text-sm leading-[20px] text-foreground", className)}
      {...props}
    >
      <div className="overflow-hidden rounded-[16px] bg-muted">
        <img
          src={image.src}
          alt={image.alt ?? title}
          className="block h-full w-full object-cover"
          loading="lazy"
        />
      </div>

      <div className="relative mt-[10px] w-full">
        <button
          type="button"
          aria-pressed={isFavorite}
          aria-label={favoriteLabel}
          onClick={handleFavoriteToggle}
          className={cn(
            "absolute right-0 top-[4px] grid h-8 w-8 place-items-center rounded-full text-foreground transition-colors",
            isFavorite && "text-destructive"
          )}
        >
          <Heart
            className="size-5 transition-colors"
            strokeWidth={2}
            fill={isFavorite ? "currentColor" : "none"}
          />
        </button>

        <div className="space-y-0 pr-[36px]">
          <p className="text-sm font-normal leading-[20px]">{title}</p>
          <div className="flex items-center gap-1 text-sm font-bold leading-[20px] text-foreground">
            <span>{price.current}</span>
            {price.showDropIcon && (
              <ArrowDownCircle className="size-4 text-foreground" strokeWidth={2} />
            )}
          </div>
        </div>

        {(price.previous || price.discount) && (
          <div className="flex items-center gap-1 text-sm leading-[20px] text-muted-foreground">
            {price.previous && <span className="line-through">{price.previous}</span>}
            {price.discount && <span className="text-destructive font-normal">{price.discount}</span>}
          </div>
        )}

        {meta.length > 0 && (
          <ul className="mt-0 flex flex-col list-none p-0 text-sm leading-[20px]">
            {meta.map((item, index) => {
              const Icon = item.icon
              return (
                <li
                  key={item.id ?? index}
                  className={cn(
                    "flex min-h-[20px] w-full items-center leading-[20px]",
                    Icon ? "gap-1" : "gap-0"
                  )}
                >
                  {Icon ? (
                    <Icon
                      className="size-4 shrink-0 text-muted-foreground"
                      strokeWidth={2}
                    />
                  ) : null}
                  <span
                    className={cn(
                      "flex-1 text-sm leading-[20px]",
                      item.muted && "text-muted-foreground"
                    )}
                  >
                    {item.content}
                  </span>
                </li>
              )
            })}
          </ul>
        )}
      </div>
    </article>
  )
}
