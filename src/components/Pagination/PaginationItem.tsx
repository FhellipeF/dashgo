import { Button } from "@chakra-ui/react";

interface PaginationItemProps {
    number: number;
    isCurrent?: boolean;
    onPageChange: (page: number) => void;
}

export function PaginationItem({
    number,
    isCurrent = false,
    onPageChange
    } : PaginationItemProps){
    if(isCurrent){
        return(
            <Button
                size="sm"
                fontSize="xs"
                width="4"
                colorScheme="pink"
                disabled
                _disabled = {{
                    background: 'pink.500',
                    cursor: 'default',
                }}
            >
                {number}
            </Button>
        );
    }
    return(
        <Button
            size="sm"
            fontSize="xs"
            width="4"
            background="4"
            _hover={{
                background: 'gray.500'
            }}
            onClick={() => onPageChange(number)}
        >
            {number}
        </Button>
    )
}