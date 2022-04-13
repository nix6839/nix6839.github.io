import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useMemo } from 'react';

dayjs.extend(relativeTime);

type Props = {
  locale: 'ko';
} & JSX.IntrinsicElements['time'];

export default function RelativeTime({ locale, ...timeProps }: Props) {
  const relativeTime = useMemo(
    () => dayjs(timeProps.dateTime).locale(locale).fromNow(),
    [locale, timeProps.dateTime],
  );
  return <time {...timeProps}>{relativeTime}</time>;
}
