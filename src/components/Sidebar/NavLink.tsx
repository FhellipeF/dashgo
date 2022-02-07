import { ElementType } from 'react';
import { Link as ChakraLink, Icon, Text, LinkProps as ChakraLinkProps } from '@chakra-ui/react';

import { ActiveLink } from '../ActiveLink';
interface NavLinksProps extends ChakraLinkProps {
    icon: ElementType;
    children: string;
    href: string;
}

export function NavLink({ icon, children, href, ...rest} : NavLinksProps ){
    return(
        <ActiveLink href={href} passHref>
            <ChakraLink
                display="flex"
                aling="center"
                {...rest}
            >
                <Icon 
                    as={icon}
                    fontSize="20"
                />
                <Text
                    marginLeft="4"
                    fontWeight="medium"
                >
                    {children}
                </Text>
            </ChakraLink>
        </ActiveLink>
);
}