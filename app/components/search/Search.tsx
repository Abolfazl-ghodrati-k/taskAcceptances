"use client";

import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { SearchProps } from "./types";
import { useRouter } from "next/navigation";
import useDebounce from "@/app/hooks/useDebounce";
import useMounted from "@/app/hooks/useMounted";
import IconContainer from "../Icon";

// icons
import { AiOutlineSearch } from "react-icons/ai";
import { IoIosArrowRoundForward } from "react-icons/io";
import { MdOutlineClear } from "react-icons/md";

const Search = ({ search, city }: SearchProps) => {
  const router = useRouter();
  const initialRender = useRef(true);
  const [text, setText] = useState(search || "");
  const [focused, setFocused] = useState(false);
  const [showText, setShowText] = useState(true);
  const query = useDebounce(text, 750);
  const mounted = useMounted();

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }

    if (!query) {
      router.push("/");
    } else {
      router.push(`/?search=${query}`);
    }
  }, [query, router]);

  const searchHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  }, []);

  const clearHandler = useCallback(() => {
    console.log("runnnn")
    setText("");
    setFocused(false);
  }, []);

  const backHandler = useCallback(() => {
    setShowText(false);
    setFocused(false);
  }, []);

  const focusHandler = useCallback(() => {
    setFocused(true);
    setShowText(true);

    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  if (!mounted) {
    return <div className="h-[50px] bg-slate-100 flex items-center mx-2 p-1 w-full">لطفا صبر کنید ...</div>;
  }

  return (
    <div
      className="relative w-full h-[50px] bg-white p-1"
    >
      <div className="flex items-center justify-center absolute top-1/2 -translate-y-1/2 right-4">
        {!focused ? (
          <IconContainer
            color="#2C2C2C"
            Icon={AiOutlineSearch}
            onClick={focusHandler}
          />
        ) : (
          <IconContainer
            size={25}
            onClick={backHandler}
            Icon={IoIosArrowRoundForward}
          />
        )}
      </div>
      <input
        ref={inputRef}
        type="text"
        value={text}
        onChange={searchHandler}
        onFocus={focusHandler}
        className={`w-full h-full rounded bg-[#F5F5F5] px-12 pb-1 shadow-lg ${
          showText ? "" : "text-[#F5F5F5]"
        }`}
      />
      {!text && (
        <div
          className="flex items-center justify-center absolute top-[45%] -translate-y-1/2 right-12 cursor-text"
          onClick={focusHandler}
        >
          {!focused ? (
            <p>
              جستجو در <span className="text-[#E05ED7] pr-1">شهر {city}</span>
            </p>
          ) : search ? null : (
            <p>جستجو</p>
          )}
        </div>
      )}
      {focused && text && (
        <div className="flex items-center justify-center absolute top-1/2 -translate-y-1/2 left-4">
          <IconContainer Icon={MdOutlineClear} onClick={clearHandler} />
        </div>
      )}
    </div>
  );
};

export default Search;
