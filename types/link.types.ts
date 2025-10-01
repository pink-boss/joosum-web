import { UseQueryResult } from '@tanstack/react-query';

export interface Link {
  index?: number;
  createdAt: string;
  lastReadAt: string;
  linkBookId: string;
  linkBookName: string;
  linkId: string;
  readCount: number;
  tags: string[];
  thumbnailURL: string;
  title: string;
  updatedAt: string;
  url: string;
  userId: string;
}

export type TLinkQueryResult = Omit<UseQueryResult<Link[], Error>, 'data'> & {
  data: Link[];
};

export type MutateLink = Pick<
  Link,
  'linkBookId' | 'linkBookName' | 'linkId' | 'tags' | 'thumbnailURL' | 'title' | 'url'
>;

export type CreateFormState = Partial<Omit<MutateLink, 'tags'>> & Pick<MutateLink, 'tags'>;

export type UpdateFormState = MutateLink;

export type SaveLink = Pick<Link, 'linkBookId' | 'tags' | 'thumbnailURL' | 'title' | 'url'>;

export type SaveFormState = Partial<Omit<SaveLink, 'tags'>> & Pick<SaveLink, 'tags'>;

export type TQueryThumbnailArgs = Pick<Link, 'url'>;
export type TQueryThumbnail = Pick<Link, 'thumbnailURL' | 'title' | 'url'>;
