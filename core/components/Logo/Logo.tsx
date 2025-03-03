import { css } from 'lib/stitches.config';
import { LogoProps } from './types';

const transitionLogo = css({
  transition: '0.5s',
  willChange: 'stroke, fill',
});

const Logo = ({ alt, size }: LogoProps) => (
  <svg
    aria-label={alt}
    className={transitionLogo()}
    width={size || 45}
    height={size || 45}
    viewBox="0 0 595 503"
    xmlns="http://www.w3.org/2000/svg"
    fill="var(--maximeheckel-colors-body)"
    stroke="var(--maximeheckel-colors-typeface-primary)"
  >
    <rect
      x="375.955"
      y="44.1826"
      width="170"
      height="420.461"
      rx="85"
      strokeWidth="30"
    />
    <path
      d="M532.053 150.507L382.796 412.659C360.385 452.022 307.914 470.831 265.599 454.671C223.284 438.51 207.149 393.499 229.561 354.136L378.817 91.9835C401.228 52.6204 453.699 33.8111 496.014 49.9718C538.329 66.1325 554.464 111.143 532.053 150.507Z"
      strokeWidth="30"
    />
    <rect
      x="208.566"
      y="42.0908"
      width="170"
      height="420.461"
      rx="85"
      strokeWidth="30"
    />
    <path
      d="M364.791 148.503L215.535 410.655C193.123 450.018 140.652 468.827 98.3375 452.667C56.0226 436.506 39.8875 391.495 62.2988 352.132L211.555 89.9796C233.966 50.6165 286.437 31.8072 328.752 47.9679C371.067 64.1286 387.202 109.14 364.791 148.503Z"
      strokeWidth="30"
    />
  </svg>
);

export default Logo;
