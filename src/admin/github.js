// Thin GitHub API client for the admin page. All writes go through a single
// commit on main (Git Data API), which triggers the normal Vercel deploy.
// The token is a fine-grained PAT scoped to this one repo (Contents: read/write);
// it lives only in the admin's browser localStorage, never in the repo.

const OWNER = 'larrythuku18-lab';
const REPO = 'De-Beka_Collections-';
const BRANCH = 'main';
const CATALOG_PATH = 'src/data/products.json';

const API = `https://api.github.com/repos/${OWNER}/${REPO}`;

async function gh(token, path, options = {}) {
  const res = await fetch(`${API}${path}`, {
    ...options,
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${token}`,
      'X-GitHub-Api-Version': '2022-11-28',
      ...(options.body ? { 'Content-Type': 'application/json' } : {}),
      ...options.headers,
    },
  });
  if (!res.ok) {
    let detail = '';
    try {
      detail = (await res.json()).message || '';
    } catch { /* non-JSON error body */ }
    const hint = res.status === 401 ? ' — the access token is wrong or expired'
      : res.status === 403 ? ' — the token does not have write access to the repo'
      : res.status === 404 ? ' — not found (check the token has access to this repo)'
      : '';
    throw new Error(`GitHub ${res.status}${hint}${detail ? `: ${detail}` : ''}`);
  }
  return res.json();
}

export async function validateToken(token) {
  const repo = await gh(token, '');
  // repo.permissions reflects the user's role, not the token's grants, so
  // actually exercise write access: create a tiny orphan blob (never
  // referenced by any commit — invisible and garbage-collected by GitHub).
  try {
    await gh(token, '/git/blobs', {
      method: 'POST',
      body: JSON.stringify({ content: 'debeka-admin-write-check', encoding: 'utf-8' }),
    });
  } catch {
    throw new Error('This access key can view the catalog but cannot publish changes. Recreate it on GitHub with Repository access "Only select repositories" → De-Beka_Collections-, and permission "Contents: Read and write".');
  }
  return repo;
}

function decodeBase64Utf8(b64) {
  const bytes = Uint8Array.from(atob(b64.replace(/\n/g, '')), (c) => c.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

// Always read the catalog fresh from GitHub — the JSON bundled into the
// deployed admin page may be one publish behind.
export async function fetchCatalog(token) {
  const file = await gh(token, `/contents/${CATALOG_PATH}?ref=${BRANCH}`);
  return JSON.parse(decodeBase64Utf8(file.content));
}

// images: [{ path: 'public/images/uploads/x.jpg', base64: '...' }]
export async function publishCatalog(token, { products, images, message }) {
  const ref = await gh(token, `/git/ref/heads/${BRANCH}`);
  const headSha = ref.object.sha;
  const headCommit = await gh(token, `/git/commits/${headSha}`);

  const tree = [];
  for (const img of images) {
    const blob = await gh(token, '/git/blobs', {
      method: 'POST',
      body: JSON.stringify({ content: img.base64, encoding: 'base64' }),
    });
    tree.push({ path: img.path, mode: '100644', type: 'blob', sha: blob.sha });
  }
  tree.push({
    path: CATALOG_PATH,
    mode: '100644',
    type: 'blob',
    content: JSON.stringify(products, null, 2) + '\n',
  });

  const newTree = await gh(token, '/git/trees', {
    method: 'POST',
    body: JSON.stringify({ base_tree: headCommit.tree.sha, tree }),
  });
  const commit = await gh(token, '/git/commits', {
    method: 'POST',
    body: JSON.stringify({ message, tree: newTree.sha, parents: [headSha] }),
  });
  await gh(token, `/git/refs/heads/${BRANCH}`, {
    method: 'PATCH',
    body: JSON.stringify({ sha: commit.sha }),
  });
  return commit.sha;
}
