import React from 'react';
import { AboutPageTemplate } from '../../templates/AboutPage';
import { GetInType } from '../../common-types';

type AboutPagePreviewProps = {
  entry: {
    getIn: GetInType;
  };
  widgetFor: (param: string) => string;
};

const AboutPagePreview = ({ entry, widgetFor }: AboutPagePreviewProps) => (
  <AboutPageTemplate
    title={entry.getIn(['data', 'title'])}
    content={widgetFor('body')}
  />
);

export default AboutPagePreview;
