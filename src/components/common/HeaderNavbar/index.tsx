
'use client'

import { useFetch } from "@/hooks/useFetch";
import { useLazyFetch } from "@/hooks/useLazyFetch";
import { ApiResponse, UserData } from "@/types";
import { Bars4Icon, BellIcon, Cog6ToothIcon } from "@heroicons/react/24/outline";
import { Button, IconButton, Input, Menu, MenuHandler, MenuItem, MenuList, Navbar, Typography } from "@material-tailwind/react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const HeaderNavbar = () => {
    const [searchText, setSearchText] = useState('');
    const router = useRouter();
    const pathname = usePathname();
    const { loading, data, error } = useFetch<ApiResponse>(`${process.env.API_URL}/isAuthenticatedUser`)
    const userData = data?.data as UserData || {};
    const { name } = userData;

    const [runFetch] = useLazyFetch<ApiResponse>(`${process.env.API_URL}/logout`)

    const handleSearch = () => {
        if (!searchText) return;
        if (pathname === '/product/search') {
            router.replace(`/product/search?text=${searchText}`)
            return
        }
        router.push(`/product/search?text=${searchText}`)
    }
    const handleLogout = async () => {
        await runFetch(
            {
                method: 'POST',
            })


        window.location.reload();
    }
    const renderSignInUp = () => {
        if (loading) return null;


        if (name) {
            return (
                <MenuItem placeholder='' >
                    <div className='text-lg '>Hi, <span className='font-bold text-black'>{name}</span></div>
                </MenuItem>
            )
        }
        return (
            <>
                <MenuItem onClick={() => router.push('/login')} placeholder=''  >
                    Login
                </MenuItem>
                <MenuItem onClick={() => router.push('/register')} placeholder=''>
                    Register
                </MenuItem>
            </>
        )
    }

    const renderLogout = () => {
        if (!name) return null;
        return (
            <MenuItem onClick={handleLogout} placeholder=''>
                <a
                    href='#'
                    className='font-medium text-blue-600 dark:text-blue-500 hover:underline' >
                    Logout
                </a>
            </MenuItem>
        )
    }

    const renderMenu = () => {

        return (
            <Menu>
                <MenuHandler>
                    <IconButton placeholder='' variant="text" color="black">
                        <Bars4Icon className="h-4 w-4 cursor-pointer" />
                    </IconButton>

                </MenuHandler>
                <MenuList placeholder=''>
                    {renderSignInUp()}
                    <MenuItem onClick={() => router.push('/product/create')} placeholder=''>Create Product</MenuItem>
                    <MenuItem onClick={() => router.push('/product/list')} placeholder=''>Product List</MenuItem>
                    {renderLogout()}
                </MenuList>
            </Menu>
        )
    }
    return (
        <div className='container'>
            <Navbar placeholder='' className="sticky top-0 z-10 h-max max-w-full rounded-none px-4 py-2 lg:px-8 lg:py-4">
                <div className="flex items-center justify-between gap-y-4 text-blue-gray-900">
                    <Typography
                        placeholder=''
                        as="a"
                        href="#"
                        variant="h6"
                        className="mr-4 ml-2 cursor-pointer py-1.5 collapse md:visible"
                    >
                        Klontong v1.0
                    </Typography>
                    <div className="relative flex flex-1 w-full gap-2 md:w-max">
                        <Input
                            value={searchText}
                            onChange={(e) => setSearchText(e.currentTarget.value)}
                            crossOrigin=""
                            type="search"
                            label="Type here..."
                            className="pr-20"
                            containerProps={{
                                className: "min-w-[288px]",
                            }}
                        />
                        <Button onClick={handleSearch} placeholder='' size="sm" className="!absolute right-1 top-1 rounded">
                            Search
                        </Button>
                    </div>
                    <div className="ml-auto flex gap-1 md:mr-4 collapse md:visible">
                        <IconButton placeholder='' variant="text" color="blue-gray">
                            <Cog6ToothIcon className="h-4 w-4" />
                        </IconButton>
                        <IconButton placeholder='' variant="text" color="blue-gray">
                            <BellIcon className="h-4 w-4" />
                        </IconButton>
                    </div>

                    <div className=" gap-2 flex ml-4 md:ml-0">

                        {renderMenu()}
                    </div>
                </div>

            </Navbar>
        </div>
    )
}

export default HeaderNavbar;