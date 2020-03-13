import {
  REPOSITORIES_ADD,
  REPOSITORIES_DELETE,
  REPOSITORIES_EDIT
} from '../actiontypes/repositories';

export const repositoriesAdd = repository => ({
  type: REPOSITORIES_ADD,
  repository
});

export const repositoriesDelete = repositories => ({
  type: REPOSITORIES_DELETE,
  repositories
});

export const repositoriesEdit = repository => ({
  type: REPOSITORIES_EDIT,
  repository
});
