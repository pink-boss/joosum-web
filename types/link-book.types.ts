export type LinkBookIdParam = {
  linkBookId: string;
};

export interface LinkBook extends LinkBookIdParam {
  backgroundColor: string;
  createdAt: string;
  illustration: null | string;
  isDefault: 'n' | 'y';
  lastSavedAt: string;
  linkCount: number;
  title: string;
  titleColor: string;
  userId: string;
}

export interface TQueryLinkBooks {
  linkBooks?: LinkBook[];
  totalLinkCount: number;
}

export type CreateLinkBook = Pick<LinkBook, 'backgroundColor' | 'illustration' | 'title' | 'titleColor'>;

export type CreateFormState = Partial<CreateLinkBook>;

// 전체 폴더북에 필요한 속성
export type RequiredFolderProps = Pick<LinkBook, 'backgroundColor' | 'linkCount' | 'title' | 'titleColor'>;

// 전체 폴더북에 필요 없는 속성
export type OptionalFolderProps = Partial<Omit<LinkBook, keyof RequiredFolderProps>>;

export type DefaultFolderProps = RequiredFolderProps & Required<OptionalFolderProps>;

export type EntireFolderProps = RequiredFolderProps & OptionalFolderProps;
