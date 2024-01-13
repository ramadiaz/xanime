"use client";

import { Menu, Transition } from "@headlessui/react";
import { UserCircle } from "@phosphor-icons/react";
import Link from "next/link";
import { authUserSession } from "@/app/libs/auth-libs";
import { Fragment, useEffect, useState } from "react";
import SmallLoading from "../SmallLoading";
import Image from "next/image";

const UserMenu = () => {
  const [user, setUser] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    try {
      const userData = await authUserSession();
      setUser(userData);
      console.log(userData);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="userMenu">
      {isLoading ? (
        <div className="scale-50 text-center p-2">
          <SmallLoading />
        </div>
      ) : (
        <Menu>
          <Menu.Button className="p-5 hover:bg-zinc-900 transition-all">
            {user ? (
              <Image
                src={user.image}
                height={24}
                width={24}
                alt="avatar"
                className="rounded-full scale-125"
              />
            ) : (
              <UserCircle size={24} color="#fdfcfc" />
            )}
          </Menu.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95 -translate-y-6 translate-x-10"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95 -translate-y-6 translate-x-10"
          >
            <Menu.Items className="absolute top-full right-0 flex flex-col bg-zinc-800 text-slate-200 rounded-bl-xl p-2 w-1/4">
              <Menu.Item disabled>
                {user ? (
                  <span className="text-xs opacity-70 px-4 pb-2">
                    Hi! {user.name}
                  </span>
                ) : (
                  <span className="text-xs opacity-70 px-4 pb-2">
                    Hi! Guest User
                  </span>
                )}
              </Menu.Item>

              <Link href="/watchlist">
                <Menu.Item
                  as="div"
                  className="hover:bg-zinc-700 px-4 py-2 rounded-md"
                >
                  Watchlist
                </Menu.Item>
              </Link>
              <Link href="/bookmark">
                <Menu.Item
                  as="div"
                  className="hover:bg-zinc-700 px-4 py-2 rounded-md"
                >
                  Bookmark
                </Menu.Item>
              </Link>
              <Link href="/favorite">
                <Menu.Item
                  as="div"
                  className="hover:bg-zinc-700 px-4 py-2 rounded-md"
                >
                  Favorite
                </Menu.Item>
              </Link>

              {user ? (
                <Link href={`/api/auth/signout`}>
                  <Menu.Item
                    as="div"
                    className="hover:bg-zinc-700 px-4 py-2 rounded-md"
                  >
                    Sign out
                  </Menu.Item>
                </Link>
              ) : (
                <Link href={`/api/auth/signin`}>
                  <Menu.Item
                    as="div"
                    className="hover:bg-zinc-700 px-4 py-2 rounded-md"
                  >
                    Github Sign in
                  </Menu.Item>
                </Link>
              )}
            </Menu.Items>
          </Transition>
        </Menu>
      )}
    </div>
  );
};

export default UserMenu;
