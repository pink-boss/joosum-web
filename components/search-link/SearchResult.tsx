// 폴더 별 검색
// 정렬은 search 관련도 순
//

import { useParams } from "next/navigation";

type InputProps = {
  keyword?: string;
};

export default function SearchResult({ keyword }: InputProps) {
  const { title = "전체" } = useParams<{ title: string }>();

  return (
    <div className="absolute top-[104px] z-30 h-screen w-full bg-white pt-8">
      <div className="text-gray-ink px-10 font-extrabold">
        {title} 내 &apos;{keyword}&apos; 검색 결과
      </div>
      <div></div>
    </div>
  );
}
