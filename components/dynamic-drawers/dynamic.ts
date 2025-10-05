import dynamic from 'next/dynamic';

const LinkSaveDrawer = dynamic(() => import('../link-drawer/link-save-drawer'), {
  loading: () => null,
  ssr: false,
});

const LinkMutateDrawer = dynamic(() => import('../link-drawer/link-mutate-drawer'), {
  loading: () => null,
  ssr: false,
});

const UserDrawer = dynamic(() => import('../user-drawer/user-drawer'), {
  loading: () => null,
  ssr: false,
});

export { LinkMutateDrawer, LinkSaveDrawer, UserDrawer };
