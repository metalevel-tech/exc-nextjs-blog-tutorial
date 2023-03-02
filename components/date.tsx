/**
 * References:
 * > https://nextjs.org/learn/basics/dynamic-routes/polishing-post-page
 * > https://date-fns.org/v2.16.1/docs/format
 */
import { parseISO, format } from "date-fns";

interface Props {
  dateString: string;
}

export default function Date({ dateString }: Props) {
  const date = parseISO(dateString);
  return <time dateTime={dateString}>{format(date, "LLLL d, yyyy")}</time>;
}
