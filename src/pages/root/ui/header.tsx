import { Logo } from "@/shared/ui/logo";
import classnames from "classnames";
import { PropsWithChildren } from "react";
import styles from "./header.module.css";
import { useDisclosure } from "@/shared/hook/useDisclosure";

export const Header = () => {
  const { isOpen, toggle } = useDisclosure();
  return (
    <header className="flex w-full flex-row items-center px-5 py-2 sm:py-3">
      <Logo />
      <h1 className="text-[24px] font-['PT_Sans_Caption'] font-bold text-primary-500 ml-[8px] leading-[31px]">
        Joosum
      </h1>
      <button
        className={classnames(
          `${styles.menu} flex flex-col h-[24px] gap-[3px] w-[24px] mr-0 ml-auto items-center justify-center sm:hidden`,
          isOpen && styles.open,
        )}
        onClick={toggle}
      >
        <div className="bg-gray-800 w-[18px] h-[2px]" />
        <div className="bg-gray-800 w-[18px] h-[2px]" />
        <div className="bg-gray-800 w-[18px] h-[2px]" />
      </button>
      <nav className="ml-auto hidden sm:flex">
        <ul className="flex h-full items-center gap-4 text-[18px]">
          <li>
            <NavLink className="font-normal text-[#5D5C5D]">문의하기</NavLink>
          </li>
          <li>
            <NavLink className="bg-primary-400 font-semibold text-white">
              앱 다운로드
            </NavLink>
          </li>
          <li>
            <NavLink className="bg-primary-500 font-semibold text-white">
              주섬 시작하기
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

interface NavLinkProps extends PropsWithChildren {
  className?: string;
  href?: string;
}

const NavLink = ({ className, children, href }: NavLinkProps) => {
  return (
    <a
      className={classnames(
        "rounded-[8px] p-[12px]  leading-[18px] sm:p-2 sm:text-[16px]",
        className,
      )}
      href={href}
    >
      {children}
    </a>
  );
};
