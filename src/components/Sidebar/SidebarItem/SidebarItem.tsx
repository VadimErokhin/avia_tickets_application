import { ReactNode } from "react";
import style from "./SidebarItem.module.css";

interface SidebarItemProps {
  title: string;
  children: ReactNode;
}

export default function SidebarItem(props: SidebarItemProps) {
  return (
    <div className={style.wrapper}>
      <h2>{props.title}</h2>
      {props.children}
    </div>
  );
}
