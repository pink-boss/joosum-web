import { Logo } from "@/shared/ui/logo";
import cn from "classnames";
import { PropsWithChildren, useEffect } from "react";
import styles from "./header.module.css";
import { useDisclosure } from "@/shared/hook/useDisclosure";
import { NavMenu } from "./nav-menu";
import { createPortal } from "react-dom";
import { Breakpoint, useBreakpoint } from "@/shared/hook/useBreakpoint";

export const Header = () => {
  const { isOpen, toggle, close } = useDisclosure();
  const breakpoint = useBreakpoint();

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);

  useEffect(() => {
    if (breakpoint !== Breakpoint.BASE) {
      close();
    }
  }, [breakpoint, close]);

  return (
    <div>
      <header className="flex w-full flex-row items-center px-5 py-2 sm:py-3 fixed bg-white z-10">
        <Logo />
        <h1 className="text-[24px] font-['PT_Sans_Caption'] font-bold text-primary-500 ml-[8px] leading-[31px]">
          Joosum
        </h1>
        <button
          className={cn(
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
      {createPortal(
        <div
          className={cn(
            "fixed left-0 bg-white w-full h-[100vh] transition-all ease-in delay-150 sm:hidden top-[47px]",
            isOpen ? "visible" : "invisible",
            isOpen ? "opacity-100" : "opacity-0",
          )}
        >
          <NavMenu />
        </div>,
        document.body,
      )}
    </div>
  );
};

interface NavLinkProps extends PropsWithChildren {
  className?: string;
  href?: string;
}

const NavLink = ({ className, children, href }: NavLinkProps) => {
  return (
    <a
      className={cn(
        "rounded-[8px] p-[12px]  leading-[18px] sm:p-2 sm:text-[16px]",
        className,
      )}
      href={href}
    >
      {children}
    </a>
  );
};
