export type FolderIdParam = {
  linkBookId: string;
};

export interface Folder extends FolderIdParam {
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

export interface TQueryFolders {
  linkBooks?: Folder[];
  totalLinkCount: number;
}

export type CreateFolder = Pick<Folder, 'backgroundColor' | 'illustration' | 'title' | 'titleColor'>;

export type CreateFormState = Partial<CreateFolder>;

// 전체 폴더에 필요한 속성
export type RequiredFolderProps = Pick<Folder, 'backgroundColor' | 'linkCount' | 'title' | 'titleColor'>;

// 전체 폴더에 필요 없는 속성
export type OptionalFolderProps = Partial<Omit<Folder, keyof RequiredFolderProps>>;

export type DefaultFolderProps = RequiredFolderProps & Required<OptionalFolderProps>;

export type EntireFolderProps = RequiredFolderProps & OptionalFolderProps;
