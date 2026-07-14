import React from 'react';
import clsx from 'clsx';
import {ThemeClassNames} from '@docusaurus/theme-common';
import {useDoc} from '@docusaurus/plugin-content-docs/client';
import Heading from '@theme/Heading';
import MDXContent from '@theme/MDXContent';
import PatchBanner from '@site/src/components/PatchBanner';
import {
  getPatchFromDocId,
  shouldShowPatchBanner,
} from '@site/src/utils/docPatch';

function useSyntheticTitle() {
  const {metadata, frontMatter, contentTitle} = useDoc();
  const shouldRender =
    !frontMatter.hide_title && typeof contentTitle === 'undefined';
  if (!shouldRender) {
    return null;
  }
  return metadata.title;
}

export default function DocItemContent({children}) {
  const {metadata, frontMatter} = useDoc();
  const syntheticTitle = useSyntheticTitle();
  const patch =
    frontMatter.patch != null
      ? String(frontMatter.patch)
      : getPatchFromDocId(metadata.id);
  const showBanner = shouldShowPatchBanner(frontMatter, patch);

  return (
    <div className={clsx(ThemeClassNames.docs.docMarkdown, 'markdown')}>
      {syntheticTitle && (
        <header>
          <Heading as="h1">{syntheticTitle}</Heading>
        </header>
      )}
      {showBanner && (
        <PatchBanner patch={patch} expansion={frontMatter.expansion} />
      )}
      <MDXContent>{children}</MDXContent>
    </div>
  );
}
