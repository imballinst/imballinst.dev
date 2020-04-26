import React from 'react';

import Layout from '../../components/Layout';
import Posts from '../../components/Blog/Posts';

export default class BlogIndexPage extends React.Component {
  render() {
    return (
      <Layout seoTitle="blog">
        <Posts />
      </Layout>
    );
  }
}
