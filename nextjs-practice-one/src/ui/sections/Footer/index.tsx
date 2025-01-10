// Constants
import { BRAND, STYLE_FOOTER_HEIGHT } from '@/constants';

// Components
import { Text } from '@/ui/components';

// Icons
import { PhoneCircleIcon, PhoneIcon } from '@/ui/icons';

// Utils
import { cn, today } from '@/utils';

export const Footer = () => {
  const currentYear = today.year();

  return (
    <footer
      className={cn(
        `w-full ${STYLE_FOOTER_HEIGHT}`,
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
          <a href={`tel:${BRAND.PHONE}`} aria-label="call us">
            <PhoneIcon />
          </a>

          <a href={`tel:${BRAND.PHONE}`} aria-label="call us">
            <PhoneCircleIcon />
          </a>
        </div>
      </div>
    </footer>
  );
};
