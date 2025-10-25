import { serverApi } from '@/utils/api';
import { logout } from '@/utils/auth';

export async function GET() {
  return serverApi({
    path: 'api/auth/me',
  });
}

export async function DELETE() {
  const response = await serverApi({
    path: 'api/auth/me',
    method: 'DELETE',
  });

  // 유저 삭제 성공시 access token 삭제
  if (response.ok) {
    await logout();
  }

  return response;
}
