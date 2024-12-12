import { SvgFactory, SvgFactoryProps } from './SvgFactory';

// Utils
import { cn } from '@/utils';

export const LogoIcon = ({
  size = '17',
  className,
  ...props
}: SvgFactoryProps) => (
  <SvgFactory
    size={size}
    className={cn('fill-primary-100', className)}
    {...props}
  >
    <rect width={40} height={40} rx={20} />
    <path fill="url(#a)" d="M8.25 8.25h20v20h-20z" />
    <defs>
      <pattern
        id="a"
        width={1}
        height={1}
        patternContentUnits="objectBoundingBox"
      >
        <use xlinkHref="#b" transform="scale(.01)" />
      </pattern>
      <image
        xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEEElEQVR4nO3dS4iNYRzH8Ucad8UCZdxFLiW3hUK5bSxEhB0WoixcNqZYOC4LTJGN7FBsLGwsFE0uMUKxoMy4z4ZxmxnG5O6rp/OMdHA657zPO8/l/X/Kznne53l/877nfZ/bUUoIIYTIGKAbMAPYA1wCGoCPwCfgBXAZOAjM1v+3wvLnALWmrBembH2MB+aYu4HpKsvIn6hVQCOlewisAbqXUH53YB3wqIzydV1WVhJ80ICxwE0qVw+ML1L+BOBGgvL1Z8eoLCB/+3hFch+Axf8ofyHQZqH8d8ACFTNgPvAVez7rMv8ofxHwxWL5uqx5KuLb1FvsazNljwPep1D+G2C0ivAL/CbpuW7+paU+qi96YDXhW6EiujoaCd8DFQNgJvGYpkIH7CUeORU68l0TsahToSPf3RGLBhU6oJ14tKvQAa3Eo1WFDrhLPO6o0AEnicdxFTpgCfH4q3c5OECPlDoVu9proErFANhJ+LarWAB9LQ1KufIS6KNiAmwkXOtUbMj3+l4gPBejGgv5k544ENibux6NHKFiBiwDfuI/XcflKguAw/hvn8oKoMrcm311rpTJeFEB+nvaz3VbP6arLAKqgSb8oaedDlZZBowEnrpOAngGjHJ9PrwAjACeOAxDj2oOc30evIK7UHQY1a7b73MojyUM/0Jp6IJQ7gFDXbc3CMBA4EqKYdQBA1y3MyhAT+B0CmGcAXq5bl/IPcQ5i2EcibbntisBm4BvCYLQi4TWu25HVIC5QHOFC25+r7ISFumXN+BWGWHc0T0BNusgCugvZD0/qoQwTgG9Cz8vUmLWq3f8Iwi9KcCWtI4rigAmmRe8TvqFckqxz4iUAf3MdNUTmR3HEEIIIYQQwh5gInDM7EzRAtwHDgBDLB5GlALYWqTHWS/mmVVSQSK5EsdkdK/yIAuHE8WUOUBWq7qS2SRsG3DW9Bu5WIP+HXgOHAWGp9zenHc7PZhh1KXANfzzIa0t+CocOu5Ioy6FvalX8Vur7YluCcbxm2zWo7BSa/8z3uCjQxbbnfNuYwFgRyCrnKzu9pYwDD2RYrKNetisVLCbwpC83RvsJGC3Uq40Om73Vnsp2KuUS/sdtrvGbhLhh/Gq0qcsuTLs0xPn5kgY7jWZ3xSpaD2gXBnJX/yumYnSa5I+Wsp3RnlabJ58CcOjk19IrowUH1XLJWF4FIqE4VEoyEufP6EgYUSlxvYfSOjdIS5JGB6RMKIOw9yqaly3LEDphCGheBiGhOJhGBKKh2FIKB6GIaF4GIaE4mEYnTL89v4D2Kx8lMFQmvXPLimfZSCUZrNFoF711E+FIGEo54Gp0fwmU+Ch7JZt8lJUZt/XrjTrIsoLRcLwKBQJw6NQJAyPQpEwPHr6yrmuhxBCReoXkSVE7JLYhD8AAAAASUVORK5CYII="
        id="b"
        width={100}
        height={100}
      />
    </defs>
  </SvgFactory>
);
