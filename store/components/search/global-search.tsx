// components/global-search.tsx
'use client';

import React from 'react';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { Loader2, Search, X } from 'lucide-react';

import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Product } from '@/types';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

import { getProducts } from '@/actions/get-products';
import { useTranslations } from 'next-intl';

const GlobalSearch = ({ onResultSelect }: { onResultSelect?: () => void }) => {
  const t = useTranslations('Search');
  const router = useRouter();
  const searchParams = useSearchParams();

  const [query, setQuery] = React.useState(searchParams.get('q') || '');
  const [results, setResults] = React.useState<Product[]>([]);
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  // Keep query in sync with ?q= on /search page
  React.useEffect(() => {
    setQuery(searchParams.get('q') || '');
  }, [searchParams]);

  // Debounced search using the shared action
  React.useEffect(() => {
    const trimmed = query.trim();

    if (!trimmed) {
      setResults([]);
      setLoading(false);
      setOpen(false);
      return;
    }

    // As soon as we have a non-empty query, show the popover and "Searching…"
    setOpen(true);
    setLoading(true);

    const timeoutId = setTimeout(async () => {
      try {
        const data = await getProducts({
          searchTerm: trimmed
        });

        setResults(data.slice(0, 5));
      } catch (error) {
        console.debug('GlobalSearch error', error);
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 250);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [query]);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = query.trim();
    const url = trimmed ? `/search?q=${encodeURIComponent(trimmed)}` : '/search';
    router.push(url);
    setOpen(false);
    onResultSelect?.();
  };

  const onSelect = (productId: string) => {
    router.push(`/product/${productId}`);
    setOpen(false);
    onResultSelect?.();
  };

  const onClear = () => {
    setQuery('');
    setResults([]);
    setOpen(false);
  };

  const showContent =
    open && (loading || results.length > 0 || Boolean(query.trim()));

  return (
    <Popover
      open={open}
      onOpenChange={(nextOpen) => {
        // Do not allow Radix to close while there is an active query
        if (!nextOpen && query.trim()) return;
        setOpen(nextOpen);
      }}
    >
      <PopoverTrigger asChild>
        <div className="relative w-full">
          <form onSubmit={onSubmit} className="relative w-full">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
            <Input
              value={query}
              onChange={(event) => {
                const value = event.target.value;
                setQuery(value);

                if (value.trim()) {
                  setOpen(true);
                } else {
                  setOpen(false);
                }
              }}
              placeholder={t('placeholder')}
              className="pl-9 pr-10"
              onFocus={() => {
                if (query.trim() || results.length) {
                  setOpen(true);
                }
              }}
            />
            {query ? (
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                onClick={onClear}
                aria-label="Clear search"
              >
                <X className="h-4 w-4" />
              </button>
            ) : null}
          </form>
        </div>
      </PopoverTrigger>

      {showContent ? (
        <PopoverContent
          align="start"
          className="w-[min(420px,90vw)] p-0 shadow-xl"
          sideOffset={8}
          forceMount
          // Critical: keep focus on the input, do not auto-focus the content
          onOpenAutoFocus={(event) => {
            event.preventDefault();
          }}
          onInteractOutside={(event) => {
            // Keep it open while typing; only close if the query is empty
            if (query.trim()) {
              event.preventDefault();
            } else {
              setOpen(false);
            }
          }}
        >
          <div className="flex items-center justify-between px-3 py-2 text-xs uppercase tracking-wide text-gray-500">
            <span>Results</span>
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
          </div>

          {loading ? (
            <div className="px-3 py-4 text-sm text-gray-600">Searching…</div>
          ) : results.length === 0 ? (
            <div className="px-3 py-4 text-sm text-gray-600">
              No matches yet
            </div>
          ) : (
            <ul className="max-h-72 divide-y overflow-y-auto">
              {results.map((item) => (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => onSelect(item.id)}
                    className="flex w-full items-center gap-3 px-3 py-2 text-left hover:bg-gray-50"
                  >
                    <div className="relative h-12 w-12 overflow-hidden rounded-md bg-gray-100">
                      {item.images?.[0]?.url ? (
                        <Image
                          src={item.images[0].url}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      ) : null}
                    </div>
                    <div className="flex-1 overflow-hidden">
                      <p className="truncate text-sm font-semibold text-gray-900">
                        {item.name}
                      </p>
                      <p className="truncate text-xs text-gray-500">
                        {item.brand}
                      </p>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          )}

          <button
            type="button"
            onClick={() => {
              const trimmed = query.trim();
              const url = trimmed
                ? `/search?q=${encodeURIComponent(trimmed)}`
                : '/search';
              router.push(url);
              setOpen(false);
              onResultSelect?.();
            }}
            className={cn(
              'flex w-full items-center justify-center gap-2 bg-gray-50 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100',
            )}
          >
            View all results
          </button>
        </PopoverContent>
      ) : null}
    </Popover>
  );
};

export default GlobalSearch;
