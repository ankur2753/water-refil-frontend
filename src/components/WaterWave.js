import "./wave.css";
export default function WaterWave() {
  return (
    <svg
      width='100%'
      height='100%'
      id='svg'
      className='wave-pos'
      viewBox='0 0 1440 700'>
      <style></style>
      <defs>
        <linearGradient id='gradient' x1='0%' y1='50%' x2='100%' y2='50%'>
          <stop offset='5%' stopColor='#002bdc44'></stop>
          <stop offset='95%' stopColor='#32ded444'></stop>
        </linearGradient>
      </defs>
      <path
        d='M 0,700 C 0,700 0,140 0,140 C 160.53333333333336,156.39999999999998 321.0666666666667,172.79999999999998 476,166 C 630.9333333333333,159.20000000000002 780.2666666666667,129.2 940,121 C 1099.7333333333333,112.8 1269.8666666666668,126.4 1440,140 C 1440,140 1440,700 1440,700 Z'
        stroke='none'
        stroke-width='0'
        fill='url(#gradient)'
        class='transition-all duration-300 ease-in-out delay-150 path-0'></path>
      <style></style>
      <defs>
        <linearGradient id='gradient' x1='0%' y1='50%' x2='100%' y2='50%'>
          <stop offset='5%' stop-color='#002bdc66'></stop>
          <stop offset='95%' stop-color='#32ded466'></stop>
        </linearGradient>
      </defs>
      <path
        d='M 0,700 C 0,700 0,280 0,280 C 145.46666666666664,287.6 290.9333333333333,295.2 451,306 C 611.0666666666667,316.8 785.7333333333333,330.8 953,327 C 1120.2666666666667,323.2 1280.1333333333332,301.6 1440,280 C 1440,280 1440,700 1440,700 Z'
        stroke='none'
        stroke-width='0'
        fill='url(#gradient)'
        class='transition-all duration-300 ease-in-out delay-150 path-1'></path>
      <style></style>
      <defs>
        <linearGradient id='gradient' x1='0%' y1='50%' x2='100%' y2='50%'>
          <stop offset='5%' stop-color='#002bdc88'></stop>
          <stop offset='95%' stop-color='#32ded488'></stop>
        </linearGradient>
      </defs>
      <path
        d='M 0,700 C 0,700 0,420 0,420 C 159.59999999999997,440.5333333333333 319.19999999999993,461.06666666666666 462,450 C 604.8000000000001,438.93333333333334 730.8,396.26666666666665 891,386 C 1051.2,375.73333333333335 1245.6,397.8666666666667 1440,420 C 1440,420 1440,700 1440,700 Z'
        stroke='none'
        stroke-width='0'
        fill='url(#gradient)'
        class='transition-all duration-300 ease-in-out delay-150 path-2'></path>
      <style></style>
      <defs>
        <linearGradient id='gradient' x1='0%' y1='50%' x2='100%' y2='50%'>
          <stop offset='5%' stop-color='#002bdcff'></stop>
          <stop offset='95%' stop-color='#32ded4ff'></stop>
        </linearGradient>
      </defs>
      <path
        d='M 0,700 C 0,700 0,560 0,560 C 170.13333333333333,563.3333333333333 340.26666666666665,566.6666666666666 490,558 C 639.7333333333333,549.3333333333334 769.0666666666666,528.6666666666667 924,527 C 1078.9333333333334,525.3333333333333 1259.4666666666667,542.6666666666666 1440,560 C 1440,560 1440,700 1440,700 Z'
        stroke='none'
        stroke-width='0'
        fill='url(#gradient)'
        class='transition-all duration-300 ease-in-out delay-150 path-3'></path>
    </svg>
  );
}
