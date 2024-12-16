import dayjs from 'dayjs';

// Constants
import { BRAND } from '@/constants';

// Components
import { Text } from '@/components';

// Icons
import { PhoneCircleIcon, PhoneIcon } from '@/icons';

// Utils
import { cn } from '@/utils';

export const Footer = () => {
  const currentYear = dayjs().year();

  return (
    <footer
      className={cn(
        'w-full h-25',
        'py-16 md:px-21',
        'border-t-1 border-secondary-200 bg-background-100',
      )}
    >
      <div
        className={cn('container mx-auto', 'flex justify-between items-center')}
      >
        <Text size="xs" color="holder">
          &#169; EmScripts {currentYear}. All Right Reserved.
        </Text>

        <div className="flex gap-12">
          <a href={`tel:${BRAND.PHONE}`}>
            <PhoneIcon />
          </a>

          <a href={`tel:${BRAND.PHONE}`}>
            <PhoneCircleIcon />
          </a>
        </div>
      </div>
    </footer>
  );
};
