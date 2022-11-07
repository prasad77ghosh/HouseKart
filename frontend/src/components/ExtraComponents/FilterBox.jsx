import React, { useState } from "react";
import { BsFilter } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Text,
  Button,
  Tooltip,
  FormControl,
  Input,
  FormLabel,
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  List,
  ListItem,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
} from "@chakra-ui/react";

const categories = [
  "mobile",
  "laptop",
  "computer",
  "tablet",
  "ear phone",
  "camera",
  "tech gadget",
  "men's ware",
  "female's ware",
  "kid's ware",
  "men's footware",
  "female's footware",
  "kid's footware",
];
const FilterBox = ({
  price,
  setPrice,
  category,
  setCategory,
  ratings,
  setRatings,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [showTooltip, setShowTooltip] = React.useState(false);

  return (
    <>
      <Box>
        <Tooltip label="Filter Products" aria-label="A tooltip">
          <Box onClick={onOpen} p="3px" mb="3px">
            <BsFilter size={25} />
          </Box>
        </Tooltip>
        <Box>
          <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
            <DrawerOverlay />
            <DrawerContent>
              <DrawerCloseButton />
              <DrawerHeader>Filter Products</DrawerHeader>
              <DrawerBody>
                <div className="price-box">
                  <Text
                    fontSize="20px"
                    textAlign="center"
                    fontWeight="medium"
                    borderBottom="2px solid white"
                    p={1}
                  >
                    Filter By Price
                  </Text>
                  <Box display="flex" gap={5} mt={4}>
                    <FormControl>
                      <FormLabel>Min Range</FormLabel>
                      <Input type="number" value={price[0]} readOnly/>
                    </FormControl>
                    <FormControl>
                      <FormLabel>Max Range</FormLabel>
                      <Input type="number" value={price[1]} readOnly/>
                    </FormControl>
                  </Box>
                  <Box mt={5} p={2}>
                    <RangeSlider
                      id="slider"
                      defaultValue={price}
                      min={0}
                      max={200000}
                      colorScheme="teal"
                      onChangeEnd={(newPrice) => setPrice(newPrice)}
                      onMouseEnter={() => setShowTooltip(true)}
                      onMouseLeave={() => setShowTooltip(false)}
                    >
                      <RangeSliderTrack>
                        <RangeSliderFilledTrack />
                      </RangeSliderTrack>
                      <Tooltip
                        hasArrow
                        bg="teal.500"
                        color="white"
                        placement="top"
                        isOpen={showTooltip}
                        label={`₹${price[0]}`}
                      >
                        <RangeSliderThumb index={0} />
                      </Tooltip>
                      <Tooltip
                        hasArrow
                        bg="teal.500"
                        color="white"
                        placement="top"
                        isOpen={showTooltip}
                        label={`₹${price[1]}`}
                      >
                        <RangeSliderThumb index={1} />
                      </Tooltip>
                    </RangeSlider>
                  </Box>
                </div>

                <div className="category-box">
                  <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    gap={2}
                  >
                    <Text
                      fontSize="20px"
                      fontWeight="medium"
                      borderBottom="2px solid white"
                      p={1}
                      position="sticky"
                      bg="#553c9a"
                      top="0"
                      left="0"
                      right="0"
                    >
                      Filter By Category
                    </Text>
                    <List
                      mt={4}
                      fontSize="17px"
                      height="200px"
                      overflow="auto"
                      width="100%"
                    >
                      {categories.map((cat) => (
                        <ListItem
                          key={cat}
                          onClick={() => setCategory(cat)}
                          px={4}
                          py={1}
                          cursor="pointer"
                          width="fit-content"
                          _hover={{
                            bg: "#805AD5",
                            borderRadius: "5px",
                          }}
                        >
                          {cat}
                        </ListItem>
                      ))}
                    </List>
                  </Box>
                </div>

                <div className="rating-box">
                  <Box>
                    <Text
                      fontSize="20px"
                      fontWeight="medium"
                      borderBottom="2px solid white"
                      p={1}
                      textAlign="center"
                    >
                      Filter By Rating
                    </Text>
                    <Box
                      mt={4}
                      p={2}
                      display="flex"
                      flexDirection="column"
                      gap={2}
                      alignItems="center"
                    >
                      <Box px={3} py = {1} borderWidth="1px" borderRadius="10px">
                        <Text
                          fontSize="18px"
                          fontWeight="medium"
                        >{`${ratings} Stars`}</Text>
                      </Box>
                      <Slider
                        id="slider"
                        defaultValue={0}
                        min={0}
                        max={5}
                        colorScheme="teal"
                        onChange={(v) => setRatings(v)}
                        onMouseEnter={() => setShowTooltip(true)}
                        onMouseLeave={() => setShowTooltip(false)}
                      >
                        <SliderTrack>
                          <SliderFilledTrack />
                        </SliderTrack>
                        <Tooltip
                          hasArrow
                          bg="teal.500"
                          color="white"
                          placement="top"
                          isOpen={showTooltip}
                          label={`${ratings}`}
                        >
                          <SliderThumb />
                        </Tooltip>
                      </Slider>
                    </Box>
                  </Box>
                </div>
              </DrawerBody>
            </DrawerContent>
          </Drawer>
        </Box>
      </Box>
    </>
  );
};

export default FilterBox;
