import { ReactNode } from 'react';
import { formatDistanceToNowStrict } from 'date-fns';

import { Link } from '../Links';
import { Text } from '../Typography';

import styles from './Card.module.css';

export interface CardProps {
  href?: string;
  img?: string;
  title: string;
  // ISO8601 date string.
  date: string;
  text: string;
  className?: string;
}

export function Card(props: CardProps) {
  const className = props.className || '';

  return (
    <div
      className={`border rounded-lg border-gray-200 hover:border-teal-500 dark:hover:border-teal-200 p-4 transition-colors ${className}`}
    >
      {props.img && (
        <img
          src={props.img}
          alt={`Featured image for ${props.title}.`}
          className={`${styles['featured-image']} mb-4`}
        />
      )}

      <CardHeading href={props.href}>{props.title}</CardHeading>

      <div className="flex flex-row items-center mb-1 text-sm text-gray-600 dark:text-gray-400">
        {formatDistanceToNowStrict(new Date(props.date), {
          addSuffix: true
        })}
      </div>

      <div className={`flex mt-2 items-center flex-col ${styles['card-text']}`}>
        <Text>{props.text}</Text>
      </div>
    </div>
  );
}

function CardHeading({
  href,
  children
}: {
  href?: string;
  children: ReactNode;
}) {
  if (href) {
    return (
      <Link href={href}>
        <h4 className="font-semibold leading-tight truncate text-lg">
          {children}
        </h4>
      </Link>
    );
  }

  return (
    <Text className="font-semibold leading-tight truncate text-lg" as="h4">
      {children}
    </Text>
  );
}
