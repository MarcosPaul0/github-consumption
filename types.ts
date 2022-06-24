export interface User {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
}

export interface Orgs {
  login: string;
  id: number;
  node_id: string;
  url: string;
  repos_url: string;
  events_url: string;
  hooks_url: string;
  issues_url: string;
  members_url: string;
  public_members_url: string;
  avatar_url: string;
  description: string;
}

export interface Repository {
  id: number;
  node_id: string;
  name: string;
  full_name: string;
  private: boolean;
  owner: {
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    gravatar_id: string;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: string;
    site_admin: boolean;
  };
  html_url: string;
  description: string;
  fork: boolean;
  url: string
  forks_url: string;
  keys_url: string;
  collaborators_url: string;
  teams_url: string;
  hooks_url: string;
  issue_events_url: string;
  events_url: string;
  assignees_url: string;
  branches_url: string;
  tags_url: string;
  blobs_url: string;
  git_tags_url: string;
  git_refs_url: string;
  trees_url: string;
  statuses_url: string;
  languages_url: string;
  stargazers_url: string;
  contributors_url: string;
  subscribers_url: string;
  subscription_url: string;
  commits_url: string;
  git_commits_url: string;
  comments_url: string;
  issue_comment_url: string;
  contents_url: string;
  compare_url: string;
  merges_url: string;
  archive_url: string;
  downloads_url: string;
  issues_url: string;
  pulls_url: string;
  milestones_url: string;
  notifications_url: string;
  labels_url: string;
  releases_url: string;
  deployments_url: string;
  created_at: Date;
  updated_at: Date;
  pushed_at: Date;
  git_url: string;
  ssh_url: string;
  clone_url: string;
  svn_url: string;
  homepage: string;
  size: number;
  stargazers_count: number;
  watchers_count: number;
  language: string;
  has_issues: boolean;
  has_projects: boolean;
  has_downloads: boolean;
  has_wiki: boolean;
  has_pages: boolean;
  forks_count: number;
  mirror_url: null;
  archived: boolean;
  disabled: boolean;
  open_issues_count: number;
  license: {
    key: string;
    name: string;
    spdx_id: string;
    url: string;
    node_id: string;
  };
  allow_forking: boolean;
  is_template: boolean;
  topics: [];
  visibility: string;
  forks: number;
  open_issues: number;
  watchers: number;
  default_branch: string;
}

// export interface Commit {
//   sha: '550b5e3655285cda26a6a61f05e623294616f89c',
//     node_id: 'C_kwDOHRb6e9oAKDU1MGI1ZTM2NTUyODVjZGEyNmE2YTYxZjA1ZTYyMzI5NDYxNmY4OWM',
//     commit: {
//       author: [Object],
//       committer: [Object],
//       message: 'Initial commit',
//       tree: [Object],
//       url: 'https://api.github.com/repos/MarcosPaul0/socket/git/commits/550b5e3655285cda26a6a61f05e623294616f89c',
//       comment_count: 0,
//       verification: [Object]
//     },
//     url: 'https://api.github.com/repos/MarcosPaul0/socket/commits/550b5e3655285cda26a6a61f05e623294616f89c',
//     html_url: 'https://github.com/MarcosPaul0/socket/commit/550b5e3655285cda26a6a61f05e623294616f89c',
//     comments_url: 'https://api.github.com/repos/MarcosPaul0/socket/commits/550b5e3655285cda26a6a61f05e623294616f89c/comments',
//     author: {
//       login: 'MarcosPaul0',
//       id: 64232527,
//       node_id: 'MDQ6VXNlcjY0MjMyNTI3',
//       avatar_url: 'https://avatars.githubusercontent.com/u/64232527?v=4',
//       gravatar_id: '',
//       url: 'https://api.github.com/users/MarcosPaul0',
//       html_url: 'https://github.com/MarcosPaul0',
//       followers_url: 'https://api.github.com/users/MarcosPaul0/followers',
//       following_url: 'https://api.github.com/users/MarcosPaul0/following{/other_user}',
//       gists_url: 'https://api.github.com/users/MarcosPaul0/gists{/gist_id}',
//       starred_url: 'https://api.github.com/users/MarcosPaul0/starred{/owner}{/repo}',
//       subscriptions_url: 'https://api.github.com/users/MarcosPaul0/subscriptions',
//       organizations_url: 'https://api.github.com/users/MarcosPaul0/orgs',
//       repos_url: 'https://api.github.com/users/MarcosPaul0/repos',
//       events_url: 'https://api.github.com/users/MarcosPaul0/events{/privacy}',
//       received_events_url: 'https://api.github.com/users/MarcosPaul0/received_events',
//       type: 'User',
//       site_admin: false
//     },
//     committer: {
//       login: 'web-flow',
//       id: 19864447,
//       node_id: 'MDQ6VXNlcjE5ODY0NDQ3',
//       avatar_url: 'https://avatars.githubusercontent.com/u/19864447?v=4',
//       gravatar_id: '',
//       url: 'https://api.github.com/users/web-flow',
//       html_url: 'https://github.com/web-flow',
//       followers_url: 'https://api.github.com/users/web-flow/followers',
//       following_url: 'https://api.github.com/users/web-flow/following{/other_user}',
//       gists_url: 'https://api.github.com/users/web-flow/gists{/gist_id}',
//       starred_url: 'https://api.github.com/users/web-flow/starred{/owner}{/repo}',
//       subscriptions_url: 'https://api.github.com/users/web-flow/subscriptions',
//       organizations_url: 'https://api.github.com/users/web-flow/orgs',
//       repos_url: 'https://api.github.com/users/web-flow/repos',
//       events_url: 'https://api.github.com/users/web-flow/events{/privacy}',
//       received_events_url: 'https://api.github.com/users/web-flow/received_events',
//       type: 'User',
//       site_admin: false
//     },
//     parents: []
// }
// 367 +
//         401 +
//         24 +
//         23 +
//         114 +
//         326 +
//         172 +
//         302 +
//         205 +
//         111 +
//         9 +
//         104 +
//         33 +
//         203 +
//         41 +
//         132 +
//         96