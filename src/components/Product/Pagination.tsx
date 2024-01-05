import React from "react";
import { Button, IconButton } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useProductContext } from "./context/ProductContext";

export function Pagination() {
    const { state, updateProductPageList } = useProductContext();
    const { total, take, skip } = state;
    const [active, setActive] = React.useState(1);

    const totalPageNumber = Math.round(total / take)

    const handleClickPageNavigation = (pageNum: number) => {
        const paramSkip = (pageNum - 1) * take;
        updateProductPageList(paramSkip, take);
    }

    const getItemProps = (index: number) =>
    ({
        variant: active === index ? "filled" : "text",
        color: "gray",
        onClick: () => {
            handleClickPageNavigation(index);
            setActive(index)
        },
    } as any);

    const next = () => {
        if (active === totalPageNumber) return;
        const nextPage = active + 1;
        handleClickPageNavigation(nextPage);
        setActive(nextPage);
    };

    const prev = () => {
        if (active === 1) return;
        const prevPage = active - 1;
        handleClickPageNavigation(prevPage);
        setActive(prevPage);
    };


    const renderPageNumber = () => {
        return [...Array(totalPageNumber)].map((_, index) => {
            const pageNum = index + 1;
            return <IconButton key={pageNum} {...getItemProps(pageNum)}>{pageNum}</IconButton>
        })
    }

    return (
        <div className="flex items-center gap-4 justify-end">
            <Button
                placeholder=''
                variant="text"
                className="flex items-center gap-2"
                onClick={prev}
                disabled={active === 1}
            >
                <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" /> Previous
            </Button>
            <div className="flex items-center gap-2">
                {renderPageNumber()}
            </div>
            <Button
                placeholder=''
                variant="text"
                className="flex items-center gap-2"
                onClick={next}
                disabled={active === 5}
            >
                Next
                <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
            </Button>
        </div>
    );
}