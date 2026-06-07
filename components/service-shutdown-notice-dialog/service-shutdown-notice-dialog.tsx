'use client';

import { useCallback, useEffect, useState } from 'react';

import * as Dialog from '@radix-ui/react-dialog';

import { DefaultDialog } from '@/components/default-dialog';

import { isServiceShutdown } from '@/utils/service-shutdown';

const STORAGE_KEY = 'noticeShown';

export default function ServiceShutdownNoticeDialog() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (isServiceShutdown()) return;
    if (sessionStorage.getItem(STORAGE_KEY)) return;
    setOpen(true);
    sessionStorage.setItem(STORAGE_KEY, 'true');
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  if (!open) return null;

  return (
    <DefaultDialog
      className="flex max-h-[calc(100vh-80px)] w-132 flex-col p-0 px-0 py-10"
      open={open}
      onCloseCallback={handleClose}
    >
      <div className="flex min-h-0 flex-1 flex-col gap-5">
        <Dialog.Title className="shrink-0 text-center text-24-32 font-bold text-black">서비스 종료 안내</Dialog.Title>
        <div className="min-h-0 flex-1 overflow-y-auto break-keep px-8 py-4 text-16-24 font-normal tracking-[-0.2px] text-gray-800">
          <p>안녕하세요, 주섬 팀입니다.</p>
          <p className="mt-3">그동안 주섬 서비스를 이용해주신 모든 분들께 진심으로 감사드립니다.</p>
          <p className="mt-3">
            주섬은 서비스 운영 방향 및 내부 사정에 따라 아래 일정으로 서비스를 종료하게 되었습니다.
          </p>
          <p className="mt-3">서비스 이용에 불편을 드리게 되어 죄송하다는 말씀드립니다.</p>
          <section className="mt-5">
            <h3 className="text-16-24 font-bold text-gray-900">■ 서비스 종료 일정</h3>
            <p className="mt-2">종료 공지일 : 2026년 6월 8일</p>
            <p>서비스 종료일 : 2026년 7월 8일</p>
          </section>
          <section className="mt-5">
            <h3 className="text-16-24 font-bold text-gray-900">■ 종료 대상</h3>
            <ul className="mt-2 list-inside list-disc">
              <li>주섬 iOS 앱</li>
              <li>주섬 웹 서비스 전체</li>
            </ul>
          </section>
          <section className="mt-5">
            <h3 className="text-16-24 font-bold text-gray-900">■ 서비스 종료 이후 변경 사항</h3>
            <ul className="mt-2 list-inside list-disc">
              <li>앱 및 웹 서비스 접속 불가</li>
              <li>신규 회원가입 및 로그인 불가</li>
              <li>저장된 콘텐츠 및 사용자 데이터 접근 불가</li>
              <li>일부 기능은 종료 일정 이전에도 순차적으로 제한될 수 있음</li>
            </ul>
          </section>
          <section className="mt-5">
            <h3 className="text-16-24 font-bold text-gray-900">■ 데이터 및 개인정보 관련 안내</h3>
            <p className="mt-2">
              서비스 종료 이후 관련 법령 및 내부 정책에 따라 사용자 데이터 및 개인정보는 안전하게 파기될 예정입니다.
            </p>
          </section>
          <section className="mt-5">
            <h3 className="text-16-24 font-bold text-gray-900">■ 문의 안내</h3>
            <p className="mt-2">서비스 종료 관련 문의는 아래 메일로 전달 부탁드립니다.</p>
            <p className="mt-2">
              문의 이메일 :{' '}
              <a className="font-semibold text-primary-500 underline" href="mailto:pinkjoosum@gmail.com">
                pinkjoosum@gmail.com
              </a>
            </p>
          </section>
          <p className="mt-5">그동안 주섬을 이용해주셔서 감사합니다.</p>
        </div>
        <div className="shrink-0 px-8 pt-1">
          <button
            className="h-14 w-full rounded-lg bg-gray-500 transition-colors hover:bg-gray-600"
            type="button"
            onClick={handleClose}
          >
            <span className="text-16-24 font-bold tracking-[-0.2px] text-white">닫기</span>
          </button>
        </div>
      </div>
    </DefaultDialog>
  );
}
