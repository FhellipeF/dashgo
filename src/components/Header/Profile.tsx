import { Flex, Box, Text, Avatar } from "@chakra-ui/react";

interface ProfileProps {
    showProfileData?: boolean;
}

export function Profile({showProfileData = true} : ProfileProps){
    return(
        <Flex
            aling="center"
        >
            {showProfileData && (
                <Box
                    marginRight="4" 
                    textAlign="right"
                    >
                    <Text>
                        Carlos Fhellipe
                    </Text>
                    <Text
                        color="gray.300"
                        fontSize="small"
                    >
                        carlosfhellipefhll@gmail.com
                    </Text>
                </Box>
            )}
            <Avatar
                size="md"
                name="Carlos Fhellipe"
                src="https://github.com/fhellipeF.png"
            />
        </Flex>
    );
}