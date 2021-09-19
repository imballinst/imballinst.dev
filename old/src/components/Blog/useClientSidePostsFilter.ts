import { useState, ChangeEvent, useEffect, useMemo } from 'react';

import { FormState } from './Filter';
import { useLocation, useNavigate } from '@reach/router';
import { parseQueryParams, stringify } from '../../helpers/utils';

export function useClientSidePostsFilter(posts: any[]) {
  const navigate = useNavigate();
  const location = useLocation();

  const [form, setForm] = useState<FormState>(parse(location.search));
  const [renderedPosts, setRenderedPosts] = useState(() =>
    filterPosts(posts, form)
  );
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

  return {
    numberOfPosts,
    onChangeForm,
    onFilterSubmit,
    renderedPosts
  };
}

function parse(search: string): FormState {
  let filterText = '';
  let filterTags: string[] = [];

  if (search.length > 0) {
    const parsed = parseQueryParams(search);

    filterText = (parsed.filterText || '') as string;
    filterTags = (parsed.filterTags || []) as string[];
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
