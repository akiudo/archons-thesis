const PATCH_SEGMENT = /^\d+\.\d+$/;

/**
 * Extract a patch id (e.g. "7.1") from a Journey doc id.
 */
export function getPatchFromDocId(docId) {
  if (!docId?.startsWith('The-Journey/')) {
    return null;
  }

  for (const segment of docId.split('/')) {
    if (PATCH_SEGMENT.test(segment)) {
      return segment;
    }
  }

  return null;
}

/**
 * Whether the patch banner should render for this doc.
 */
export function shouldShowPatchBanner(frontMatter, patch) {
  if (!patch) {
    return false;
  }

  if (frontMatter.hide_patch_banner) {
    return false;
  }

  if (frontMatter.patch_banner === true) {
    return true;
  }

  if (frontMatter.patch_banner === false) {
    return false;
  }

  return frontMatter.sidebar_position === 1;
}
