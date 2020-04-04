import React from 'react';
import { IndexPageTemplate } from '../../templates/IndexPage';
import { GetInType } from '../../common-types';

type IndexPagePreviewProps = {
  entry: {
    getIn: GetInType;
  };
};

const IndexPagePreview = ({ entry }: IndexPagePreviewProps) => {
  const data = entry.getIn(['data']).toJS();

  if (data) {
    return (
      <IndexPageTemplate
        image={data.image}
        title={data.title}
        heading={data.heading}
        subheading={data.subheading}
        description={data.description}
        intro={data.intro || { blurbs: [] }}
        mainpitch={data.mainpitch || {}}
      />
    );
  } else {
    return <div>Loading...</div>;
  }
};

export default IndexPagePreview;
