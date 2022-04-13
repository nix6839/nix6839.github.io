import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useMemo } from 'react';

dayjs.extend(relativeTime);
dayjs.extend(customParseFormat);

type TimeElement = JSX.IntrinsicElements['time'];

type Props = {
  locale: 'ko';
} & TimeElement &
  Required<Pick<TimeElement, 'dateTime'>>;

export default function RelativeTime({ locale, ...timeProps }: Props) {
  const relativeTime = useMemo(
    () =>
      dayjs(timeProps.dateTime, 'YYYY-MM-DD[T]HH:mm:ssZ')
        .locale(locale)
        .fromNow(),
    [locale, timeProps.dateTime],
  );
  return <time {...timeProps}>{relativeTime}</time>;
}
