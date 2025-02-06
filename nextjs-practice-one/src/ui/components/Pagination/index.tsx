'use client';

import { memo, useCallback, useMemo } from 'react';
import { extendVariants, Pagination as PaginationNextUI } from '@heroui/react';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';

// Components
import { PaginationButton } from './PaginationButton';

// Utils
import { cn } from '@/utils';

const PaginationBase = memo(
  extendVariants(PaginationNextUI, {
    variants: {
      color: {
        default: {
          base: 'gap-4',
          item: cn(
            'h-17 w-17',
            'text-primary-400',
            'bg-transparent hover:bg-transparent',
            'shadow-none rounded-md active:border-1 border-primary-400 hover:border-primary-100',
            'justify-center items-center leading-none cursor-pointer',
            'pressed:bg-blue-600',
          ),
          cursor: cn(
            'h-17 w-17',
            'text-primary-100 bg-transparent shadow-none',
            'border-primary-100 rounded-md border-1',
          ),
        },
      },
    },
    defaultVariants: {
      color: 'default',
    },
  }),
);

interface PaginationProps {
  total: number;
  page?: number;
  scrollTo?: string;
}

export const Pagination = memo(
  ({ page = 1, total, scrollTo = '' }: PaginationProps) => {
    const pathname = usePathname();
    const { push } = useRouter();
    const searchParams = useSearchParams();

    const params = useMemo(
      () => new URLSearchParams(searchParams.toString()),
      [searchParams],
    );

    const shouldShowPrev = page > 1;
    const shouldShowNext = page < total;

    const handleSetPage = useCallback(
      (value: number) => {
        // Update URL
        params.set('page', value.toString());
        push(`${pathname}?${params.toString()}${scrollTo}`);
      },
      [params, push, pathname, scrollTo],
    );

    const handlePrevPage = useCallback(() => {
      if (page > 1) {
        handleSetPage(page - 1);
      }
    }, [handleSetPage, page]);

    const handleNextPage = useCallback(() => {
      if (page < total) {
        handleSetPage(page + 1);
      }
    }, [handleSetPage, page, total]);

    return (
      <div className="flex items-center">
        <PaginationButton onPress={handlePrevPage} isVisible={shouldShowPrev} />
        <PaginationBase page={page} total={total} onChange={handleSetPage} />
        <PaginationButton
          onPress={handleNextPage}
          isNextButton
          isVisible={shouldShowNext}
        />
      </div>
    );
  },
);

Pagination.displayName = 'Pagination';
