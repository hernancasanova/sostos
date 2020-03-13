import { TOPICS_ADD, TOPICS_DELETE, TOPICS_EDIT } from '../actiontypes/topics';

export const topicsAdd = topic => ({
  type: TOPICS_ADD,
  topic
});

export const topicsDelete = topics => ({
  type: TOPICS_DELETE,
  topics
});

export const topicsEdit = topic => ({
  type: TOPICS_EDIT,
  topic
});
