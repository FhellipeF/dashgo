import { Flex, SimpleGrid, Box, Text, theme } from '@chakra-ui/react';
import dynamic from 'next/dynamic'
import { Header } from '../components/Header';
import { Sidebar } from '../components/Sidebar';


const Chart = dynamic(() => import('react-apexcharts'),{
    ssr: false,
})

const options = {
    chart: {
        toolbar: {
            show: false,
        },
        zoom: {
            enabled: false,
        },
        fontColor: theme.colors.gray[500],  
    },
    grid: {
        show: false,
    },
    dataLabels: {
        enabled: false,
    },
    tooltip: {
        enabled: false,
    },
    xaxis: {
        type: 'datetime',
        axisBorder: {
            color: theme.colors.gray[600]
        },
        axisTicks: {
            color: theme.colors.gray[600]
        },
        categories: [
            '2022-01-20T00:00:00.000Z',
            '2022-01-21T00:00:00.000Z',
            '2022-01-22T00:00:00.000Z',
            '2022-01-23T00:00:00.000Z',
            '2022-01-24T00:00:00.000Z',
            '2022-01-25T00:00:00.000Z',
            '2022-01-26T00:00:00.000Z',
        ],
    },
    fill: {
        opacity: 0.3,
        type: 'gradient',
        gradient: {
            shade: 'dark',
            opacityFrom: 0.7,
            opacityTo: 0.3,
        },
    }

} as const;

const series = [
    {
        name: 'seriesOne', data: [45, 98, 34, 23, 85, 45, 67]
    }
];

export default function dashboard(){
    return(
        <Flex direction="column" height="100vh">
            <Header />
            <Flex 
                width="100%"
                marginY="6"
                marginX="auto"
                maxWidth={1480}
                paddingX="6"
            >
                <Sidebar />
                <SimpleGrid
                    flex="1"
                    gap="4"
                    minChildWidth="320px"
                    align="flex-start"
                >
                    <Box
                        padding={["6","8"]}
                        background="gray.800"
                        borderRadius={8}
                        paddingBottom="4"
                    >
                        <Text
                            fontSize="large"
                            marginBottom="4"
                        >
                            Inscritos da semana
                        </Text>
                        <Chart
                            options={options}
                            series={series}
                            type="area"
                            height={160}
                        />
                    </Box>
                    <Box
                        padding={["6","8"]}
                        background="gray.800"
                        borderRadius={8}
                    >
                        <Text
                            fontSize="large"
                            marginBottom="4"
                        >
                            Taxa de abertura
                        </Text>
                        <Chart
                            options={options}
                            series={series}
                            type="area"
                            height={160}
                        />
                    </Box>

                </SimpleGrid>
            </Flex>
        </Flex>
    );
}