import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import dayjsCustomParseFormat from 'dayjs/plugin/customParseFormat';
import dayjsRelativeTime from 'dayjs/plugin/relativeTime';
import { useMemo } from 'react';

dayjs.extend(dayjsRelativeTime);
dayjs.extend(dayjsCustomParseFormat);

type TimeElement = JSX.IntrinsicElements['time'];

type Props = {
  locale: 'ko';
} & TimeElement &
  Required<Pick<TimeElement, 'dateTime'>>;

export default function RelativeTime({ locale, ...timeProps }: Props) {
  const { dateTime } = timeProps;

  const relativeTime = useMemo(
    () => dayjs(dateTime, 'YYYY-MM-DD[T]HH:mm:ssZ').locale(locale).fromNow(),
    [locale, dateTime],
  );
  return <time {...timeProps}>{relativeTime}</time>;
}
