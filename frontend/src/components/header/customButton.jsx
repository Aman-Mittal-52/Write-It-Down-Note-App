import { Button } from '@chakra-ui/react'
import React from 'react'

function CustomButton({ text, func, border }) {
    return (
        <Button
            onClick={func}
            bg="black"
            border={border}
            position="relative"
            borderRadius="full"
            fontSize="16px"
            color="white"
            padding="0.8em 1.8em"
            cursor="pointer"
            userSelect="none"
            textAlign="center"
            textDecoration="none"
            transition="all 0.4s"
            _hover={{
                transitionDuration: "0.1s",
                bg: "#3A3A3A",
            }}
            _after={{
                content: '""',
                display: "block",
                position: "absolute",
                borderRadius: "full",
                left: "0",
                top: "0",
                width: "100%",
                height: "100%",
                opacity: 0,
                transition: "all 0.5s",
                boxShadow: "0 0 10px 40px white",
            }}
            _active={{
                top: "1px",
                _after: {
                    boxShadow: "0 0 0 0 white",
                    opacity: 1,
                    transition: "0s",
                },
            }}
        >{text}</Button>
    )
}

export default CustomButton