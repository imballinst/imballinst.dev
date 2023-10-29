import { useState, useEffect } from 'preact/hooks';
import { format } from 'date-fns';
import { Text } from '../Typography';

export function FormattedDate({ publishDate }: { publishDate: string }) {
  const [formatted, setFormatted] = useState(
    format(new Date(publishDate), 'MMMM dd, yyyy, HH:mm O')
  );

  useEffect(() => {
    // This is so that it adapts to the TZ of the user instead of the build time.
    setFormatted(format(new Date(publishDate), 'MMMM dd, yyyy, HH:mm O'));
  }, [publishDate]);

  return (
    <Text as="span" colorScheme="gray">
      Published at {formatted}
    </Text>
  );
}
