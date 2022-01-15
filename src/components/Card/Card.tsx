import { formatDistanceToNowStrict } from 'date-fns';
import { JSX } from 'preact';

import { ExternalLinkIcon } from '../Links';
import { getImageProps } from '../../helpers/image';

import { Text, TextProps } from '../Typography';

import styles from './Card.module.css';

export interface CardProps {
  href?: string;
  img?: string;
  imgAlt?: string;
  title: string;
  // ISO8601 date string.
  date: string;
  text: string;
  className?: string;
  titleHeadingElement: TextProps['as'];
}

export function Card(props: CardProps) {
  const className = props.className || '';
  const cardImage =
    props.img !== undefined && props.imgAlt !== undefined ? (
      <img
        {...getImageProps({ src: props.img, alt: props.imgAlt })}
        className="object-cover rounded-t-lg lg:pl-[40%] w-full h-full"
        loading="lazy"
      />
    ) : null;
  const anchorProps: JSX.HTMLAttributes<HTMLAnchorElement> = {};
  let titleChildren: JSX.Element | undefined = undefined;
  let cardContent: JSX.Element | undefined = undefined;

  if (
    props.href !== undefined &&
    (props.href.includes('http://') || props.href.includes('https://'))
  ) {
    anchorProps.target = '_blank';
    anchorProps.rel = 'noopener';

    titleChildren = <ExternalLinkIcon />;
  }

  if (cardImage) {
    cardContent = (
      <>
        <div className="lg:mr-[-10%] h-[300px] lg:h-[200px]">{cardImage}</div>

        <div
          className={`absolute bottom-0 p-4 pt-12 lg:pr-16 lg:pt-4 w-full lg:w-1/2 lg:h-full ${styles['card-detail']} flex flex-col justify-end md:justify-center`}
        >
          <CardDetail
            title={props.title}
            text={props.text}
            date={props.date}
            titleChildren={titleChildren}
            titleHeadingElement={props.titleHeadingElement}
          />
        </div>
      </>
    );
  } else {
    cardContent = (
      <div className="p-4 bg-white dark:bg-transparent h-full">
        <CardDetail
          title={props.title}
          text={props.text}
          date={props.date}
          titleChildren={titleChildren}
          titleHeadingElement={props.titleHeadingElement}
        />
      </div>
    );
  }

  return (
    <a href={props.href!} {...anchorProps}>
      <div
        className={`border rounded-lg border-gray-200 hover:border-teal-500 dark:border-gray-600 dark:hover:border-teal-200 transition-colors relative overflow-hidden ${className}`}
      >
        {cardContent}
      </div>
    </a>
  );
}

function CardDetail({
  title,
  titleChildren,
  titleHeadingElement,
  date,
  text
}: {
  title: string;
  titleChildren?: JSX.Element;
  titleHeadingElement: CardProps['titleHeadingElement'];
  date: string;
  text: string;
}) {
  return (
    <>
      <Text
        className="font-semibold leading-tight truncate text-lg my-0"
        as={titleHeadingElement}
        colorScheme="teal"
      >
        {title}
        {titleChildren}
      </Text>

      <div className="flex flex-row items-center mb-1 text-sm text-gray-600 dark:text-gray-400">
        {formatDistanceToNowStrict(new Date(date), {
          addSuffix: true
        })}
      </div>

      <div className={`flex mt-2 items-center flex-col ${styles['card-text']}`}>
        <Text className="text-base">{text}</Text>
      </div>
    </>
  );
}
