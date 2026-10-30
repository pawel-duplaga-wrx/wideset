import { format, formatISO, parse } from 'date-fns';
import { DATE_FORMAT, DATE_ISO_FORMAT } from 'src/consts';

export const formatDateToISOString = (day: Date | undefined) =>
  day && formatISO(day, { representation: 'date' });

export const formatISODateToAnotherFormat = (
  day: string | undefined,
  dateFormat: string = DATE_FORMAT,
) => (day ? format(parseISODate(day)!, dateFormat) : undefined);

export const parseISODate = (day: string | undefined) =>
  day ? parse(day, DATE_ISO_FORMAT, new Date()) : undefined;
