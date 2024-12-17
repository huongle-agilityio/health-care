'use client';

import { useCallback, useMemo } from 'react';
import {
  extendVariants,
  Pagination as PaginationNextUI,
} from '@nextui-org/react';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';

// Components
import { Button } from '../Button';

// Icons
import { ArrowLeftIcon, ArrowRightIcon } from '@/icons';

// Utils
import { cn } from '@/utils';

const PaginationBase = extendVariants(PaginationNextUI, {
  variants: {
    color: {
      default: {
        base: 'gap-4',
        item: cn(
          'h-17 w-17',
          'text-primary-400',
          'bg-transparent hover:bg-transparent',
          'shadow-none rounded-md active:border-1 border-primary-400 hover:border-primary-100',
          'justify-center items-center leading-none',
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
});

interface PaginationProps {
  page: number;
  total: number;
}

export const Pagination = ({ page = 1, total }: PaginationProps) => {
  const pathname = usePathname();
  const { replace } = useRouter();
  const searchParams = useSearchParams();

  const params = useMemo(
    () => new URLSearchParams(searchParams.toString()),
    [searchParams],
  );

  const handlePrevPage = useCallback(() => {
    params.set('page', (page - 1).toString());
    replace(`${pathname}?${params.toString()}`);
  }, [page, params, pathname, replace]);

  const handleNextPage = useCallback(() => {
    params.set('page', (page + 1).toString());
    replace(`${pathname}?${params.toString()}`);
  }, [page, params, pathname, replace]);

  const handleSetPage = useCallback(
    (value: number) => {
      params.set('page', value.toString());
      replace(`${pathname}?${params.toString()}`);
    },
    [pathname, params, replace],
  );

  return (
    <div className="flex items-center">
      <Button
        size="none"
        color="bordered"
        variant="bordered"
        className="group text-primary-400 hover:text-primary-100 border-0"
        onPress={handlePrevPage}
      >
        <ArrowLeftIcon className="group-hover:fill-primary-100" /> Previous
      </Button>
      <PaginationBase page={page} total={total} onChange={handleSetPage} />
      <Button
        size="none"
        variant="bordered"
        color="bordered"
        className="group text-primary-400 hover:text-primary-100 border-0"
        onPress={handleNextPage}
      >
        Next <ArrowRightIcon className="group-hover:fill-primary-100" />
      </Button>
    </div>
  );
};
