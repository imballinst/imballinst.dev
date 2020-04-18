// TODO: move this to under src/pages to take advantage of https://www.gatsbyjs.org/docs/graphql-api/#pagequery.
import React, { useState, ChangeEvent, useEffect, useMemo } from 'react';
import { graphql, StaticQuery } from 'gatsby';
import styled from '@emotion/styled';

import PreviewCompatibleImage, { Fluid } from '../PreviewCompatibleImage';
import { Paper } from '../Paper';
import { peepoTheme } from '../../theme';
import { cls } from '../../helpers/styles';
import { PeepoLink } from '../Links';
import { SectionWrapper } from '../Layout';
import { Filter, FormState } from './Filter';
import { useLocation, useNavigate } from '@reach/router';
import { parseQueryParams, stringify } from '../../helpers/utils';

export type TagCount = {
  fieldValue: string;
  totalCount: number;
};

type Props = {
  data: {
    allMarkdownRemark: {
      // TODO(aji): change this with the correct form of the post.
      edges: any[];
    };
    tagsRemark: {
      tags: TagCount[];
    };
  };
};

export type ListBlogItemType = {
  excerpt: string;
  id: string;
  fields: {
    slug: string;
  };
  frontmatter: {
    title: string;
    date: string;
    featuredpost?: boolean;
    featuredimage: { childImageSharp: Fluid };
  };
};

const StyledPaper = styled(Paper)`
  &:not(:first-of-type) {
    margin-top: ${peepoTheme.spacing(8)};
  }
`;

export function ListBlogItem({ post }: { post: ListBlogItemType }) {
  return (
    <StyledPaper>
      <article
        className={cls({
          featured: post.frontmatter.featuredpost
        })}
      >
        <header>
          {post.frontmatter.featuredimage ? (
            <div className="mb-2">
              <PreviewCompatibleImage
                imageInfo={{
                  image: post.frontmatter.featuredimage,
                  alt: `featured image thumbnail for post ${post.frontmatter.title}`
                }}
              />
            </div>
          ) : null}
          <div>
            <div className="block w-full">
              <PeepoLink
                className={`${peepoTheme.textSizes.large2} font-semibold`}
                to={post.fields.slug}
              >
                {post.frontmatter.title}
              </PeepoLink>
            </div>
            <div className="block w-full">
              <span className={`${peepoTheme.textSizes.small} italic`}>
                {post.frontmatter.date}
              </span>
            </div>
          </div>
        </header>
        <div className="mt-4">
          <p>{post.excerpt}</p>
          <div className="block w-full mt-8 text-right">
            <PeepoLink
              className={`${peepoTheme.textSizes.small}`}
              to={post.fields.slug}
            >
              Read more →
            </PeepoLink>
          </div>
        </div>
      </article>
    </StyledPaper>
  );
}

function parse(search: string): FormState {
  let filterText = '';
  let filterTags: string[] = [];

  if (search.length > 0) {
    const parsed = parseQueryParams<FormState>(search);

    filterText = parsed.filterText || '';
    filterTags = parsed.filterTags || [];
  }

  return {
    filterText,
    filterTags
  };
}

function filterPosts(posts: any[], form: FormState) {
  return posts
    ? posts.reduce((array, { node: post }) => {
        const { tags: postTagsRaw, title } = post.frontmatter;
        const postTags = postTagsRaw as string[];

        const includesText =
          form.filterText !== ''
            ? (title as string)
                .toLowerCase()
                .includes(form.filterText.toLowerCase())
            : true;
        const includesTags =
          form.filterTags.length > 0
            ? form.filterTags.every(tag => postTags.includes(tag))
            : true;
        let included;

        if (!includesText && !includesTags) {
          return array;
        }

        if (includesText) {
          included = includesTags;
        } else if (includesTags) {
          included = includesText;
        }

        if (included) {
          return array.concat(post);
        }

        return array;
      }, [])
    : null;
}

function isFiltering(form: FormState) {
  return form.filterTags.length > 0 || form.filterText !== '';
}

function Posts(props: Props) {
  const { allMarkdownRemark, tagsRemark } = props.data;
  const posts = allMarkdownRemark.edges;
  const tags = tagsRemark.tags;

  const navigate = useNavigate();
  const location = useLocation();

  const [form, setForm] = useState<FormState>(parse(location.search));
  const [renderedPosts, setRenderedPosts] = useState(filterPosts(posts, form));
  const numberOfPosts = useMemo(() => renderedPosts.length, [renderedPosts]);

  useEffect(() => {
    const parsed = parse(location.search);

    setForm(parsed);
    setRenderedPosts(filterPosts(posts, parsed));
  }, [posts, location.search]);

  function onChangeForm(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    if (name === 'filterText') {
      setForm(oldForm => ({ ...oldForm, filterText: value }));
    } else {
      setForm(oldForm => {
        const valueIndex = oldForm.filterTags.indexOf(value);
        let newFilterTags = oldForm.filterTags;

        if (valueIndex === -1) {
          newFilterTags = newFilterTags.concat(value);
        } else {
          newFilterTags = [...newFilterTags];
          newFilterTags.splice(valueIndex, 1);
        }

        return {
          ...oldForm,
          filterTags: newFilterTags
        };
      });
    }
  }

  function onFilterSubmit() {
    navigate(`${location.pathname}${stringify(form)}`);
  }

  return (
    <div className="flex flex-col relative">
      <div className="flex flex-row mb-4">
        <div className="flex flex-1 items-center">
          {isFiltering(form) ? `${numberOfPosts} results found` : null}
        </div>
        <div className="flex flex-1 justify-end">
          <Filter
            tags={tags}
            onFilterSubmit={onFilterSubmit}
            form={form}
            onChangeForm={onChangeForm}
          />
        </div>
      </div>
      <SectionWrapper>
        {renderedPosts.map((post: any) => (
          <ListBlogItem key={post.id} post={post} />
        ))}
      </SectionWrapper>
    </div>
  );
}

export default () => (
  <StaticQuery
    query={graphql`
      query PostsQuery {
        allMarkdownRemark(
          sort: { order: DESC, fields: [frontmatter___date] }
          filter: { frontmatter: { templateKey: { eq: "blog-post" } } }
        ) {
          edges {
            node {
              excerpt(pruneLength: 400)
              id
              fields {
                slug
              }
              frontmatter {
                title
                date(formatString: "MMMM DD, YYYY")
                featuredpost
                featuredimage {
                  childImageSharp {
                    fluid(maxWidth: 120, quality: 100) {
                      ...GatsbyImageSharpFluid
                    }
                  }
                }
                tags
              }
            }
          }
        }
        tagsRemark: allMarkdownRemark(limit: 1000) {
          tags: group(field: frontmatter___tags) {
            fieldValue
            totalCount
          }
        }
      }
    `}
    render={data => <Posts data={data} />}
  />
);
