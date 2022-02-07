import { useState } from 'react';
import NextLink from 'next/link';
import { Box, Button, Checkbox, Flex, Heading, Icon, Table, Tbody, Td, Th, Thead, Tr, Text, useBreakpointValue, Spinner, Link } from '@chakra-ui/react';
import { RiAddLine, RiPencilLine } from 'react-icons/ri';
import { Header } from '../../components/Header';
import { Sidebar } from '../../components/Sidebar';
import { Pagination } from '../../components/Pagination';
import { useUser } from '../../services/hooks/useUsers';
import { queryClient } from '../../services/queryClient';
import { api } from '../../services/api';
export default function UserList(){

    const [page, setPage] = useState(1);
    console.log(page)
    const { data, isLoading,isFetching, error } = useUser(page)

    const isWideVersion = useBreakpointValue({
        base: false,
        lg: true
    });

    async function handlePrefetchUser(userId: string){
        await queryClient.prefetchQuery(['user', userId], async () => {
            const response = await api.get(`users/{userId}`)

            return response.data;
        }, {
            staleTime: 1000 * 60 * 10,
        })
    }

    return(
        <Box>
            <Header />
            <Flex
                width="100%" 
                marginY="6"
                maxWidth={1480}
                marginX="auto"
                paddingX="6"
            >
                <Sidebar />
                <Box
                    flex="1"
                    borderRadius={8}
                    background="gray.800"
                    padding="8"
                >
                    <Flex
                        marginBottom="8"
                        justify="space-between"
                        aling="center"
                    >
                        <Heading
                            size="large"
                            fontWeight="normal"
                        >
                            Usuários
                            {!isLoading && isFetching && <Spinner size="sm" color="gray.500" marginLeft="4" />}
                        </Heading>
                        <NextLink href="/users/create" passHref>
                            <Button
                                as="a"
                                size="sm"
                                fontSize="sm"
                                colorScheme="pink"
                                leftIcon={<Icon as={RiAddLine} fontSize="20" />}
                            >
                                Criar novo
                            </Button>
                        </NextLink>
                    </Flex>
                    { isLoading ? (
                        <Flex 
                            justify="center"
                        >
                            <Spinner />
                        </Flex>
                    ) : error ? (
                        <Flex
                            justifyContent="center"
                        >
                            <Text>
                                Falha ao obter dados dos usuários
                            </Text>
                        </Flex>
                    ) : (
                        <>
                            <Table  
                            colorScheme="whiteAlpha"
                            >
                                <Thead>
                                    <Tr>
                                        <Th paddingX={["4", "4", "6"]} color="gray.300" width="8">
                                            <Checkbox colorScheme="pink" />
                                        </Th>
                                        <Th>Usuários</Th>
                                        {isWideVersion && <Th>Data de cadastro</Th>}
                                        <Th width="8"></Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    { data.users.map( user => {
                                        return(
                                            <Tr>
                                                <Td paddingX={["4", "4", "6"]}>
                                                    <Checkbox colorScheme="pink" />
                                                </Td>
                                                <Td>
                                                    <Box>
                                                        <Link color="purple.400" onMouseEnter={() => handlePrefetchUser(user.id)}>
                                                            <Text fontWeight="bold">{user.name}</Text>
                                                        </Link>
                                                        <Text fontSize="small" color="gray.300">{user.email}</Text>
                                                    </Box>
                                                </Td>
                                                { isWideVersion && <Td>
                                                    {user.createdAt}
                                                </Td>}
                                                <Td>
                                                    <Button
                                                        as="a"
                                                        size="sm"
                                                        fontSize="sm"
                                                        colorScheme="purple"
                                                        leftIcon={<Icon as={RiPencilLine} fontSize="16" />}
                                                    >
                                                        Editar
                                                    </Button>
                                                </Td>
                                            </Tr>
                                        )
                                    })}                                    
                                </Tbody>
                            </Table>
                            <Pagination 
                                totalCountOfRegisters={data.totalCount}
                                currentPage={page}
                                onPageChange={setPage}
                            />
                        </>
                    )}
                </Box>
            </Flex>

        </Box>
    );
}