import React from 'react';
import PreviewCompatibleImage, { Fluid } from './PreviewCompatibleImage';

type Feature = {
  image: string | { childImageSharp: Fluid };
  text: string;
};

type Props = {
  gridItems: Feature[];
};

const FeatureGrid = ({ gridItems }: Props) => (
  <div className="columns is-multiline">
    {gridItems.map(item => (
      <div key={item.text} className="column is-6">
        <section className="section">
          <div className="has-text-centered">
            <div
              style={{
                width: '240px',
                display: 'inline-block'
              }}
            >
              <PreviewCompatibleImage imageInfo={item} />
            </div>
          </div>
          <p>{item.text}</p>
        </section>
      </div>
    ))}
  </div>
);

export default FeatureGrid;
