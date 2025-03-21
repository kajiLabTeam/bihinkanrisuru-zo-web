export interface Tag {
  id: string;
  name: string;
}

export interface GetTagsResponse {
  tags: Tag[];
}
