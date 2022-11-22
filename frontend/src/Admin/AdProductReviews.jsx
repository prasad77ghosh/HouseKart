import React, { useEffect, useState } from "react";
import {
  Box,
  Text,
  useToast,
  Spinner,
  FormControl,
  Input,
  Button,
} from "@chakra-ui/react";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { allReviewsOfProductAdmin, deleteReviewAdmin } from "../Actions/Order";
import "./AdReviews.css";
import { DataGrid } from "@material-ui/data-grid";
import { MdDeleteOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const AdProductReviews = () => {
  const dispatch = useDispatch();
  const [productId, setProductId] = useState("");
  const navigate = useNavigate();
  const toast = useToast();
  const { loading, reviews, error } = useSelector(
    (state) => state.AdReviewsReducer
  );

  const { success, error: deleteError } = useSelector(
    (state) => state.AdDeleteReviewReducer
  );

  // useEffect(() => {
  //   dispatch(allReviewsOfProductAdmin());
  // }, [dispatch]);

  const deleteReviewHandler = (reviewId) => {
    dispatch(deleteReviewAdmin(reviewId, productId));
  };

  const productReviewsSubmitHandler = () => {
    dispatch(allReviewsOfProductAdmin(productId));
  };

  useEffect(() => {
    if (success) {
      toast({
        title: "Review Deleted Successfully",
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "bottom",
      });

      navigate("/admin/reviews");
      dispatch({
        type: "deleteReviewReset",
      });
    }
  }, [success, dispatch, toast, navigate]);

  useEffect(() => {
    if (error) {
      toast({
        title: error,
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "bottom",
      });
      dispatch({
        type: "clearError",
      });
    }

    if (deleteError) {
      toast({
        title: deleteError,
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "bottom",
      });
      dispatch({
        type: "clearError",
      });
    }
  }, [dispatch, error, toast, deleteError]);

  const columns = [
    { field: "id", headerName: "Review ID", minWidth: 200, flex: 0.5 },

    {
      field: "user",
      headerName: "User",
      minWidth: 200,
      flex: 0.5,
    },

    {
      field: "comment",
      headerName: "Comment",
      minWidth: 350,
      flex: 0.8,
    },

    {
      field: "rating",
      headerName: "Rating",
      type: "number",
      minWidth: 180,
      flex: 0.4,

      cellClassName: (params) => {
        return params.getValue(params.id, "rating") >= 3
          ? "greenColor"
          : "redColor";
      },
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Box
              p={1}
              cursor="pointer"
              _hover={{
                color: "#E53E3E",
              }}
              onClick={() =>
                deleteReviewHandler(params.getValue(params.id, "id"))
              }
            >
              <MdDeleteOutline size={20} />
            </Box>
          </>
        );
      },
    },
  ];

  const rows = [];

  reviews &&
    reviews.forEach((item) => {
      rows.push({
        id: item._id,
        rating: item.rating,
        comment: item.comment,
        user: item.name,
      });
    });

  return (
    <>
      <Box display="flex" bg="gray.50" height="100vh" maxH="100%" p={1} gap={2}>
        <Box flexBasis="15%" position="relative">
          <Sidebar />
        </Box>
        <Box flexBasis="85%" bg="purple.900" p={3} borderRadius="10px">
          <Text
            textAlign="center"
            fontSize="xl"
            fontWeight="medium"
            color="gray.50"
            mb={3}
          >
            ALL REVIEWS
          </Text>

          {loading ? (
            <>
              <Box
                width="100%"
                height="100%"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Spinner size="xl" color="white" />
              </Box>
            </>
          ) : (
            <>
              <Box
                display="flex"
                alignItems="center"
                width="40%"
                margin="auto"
                gap={3}
                mb={5}
              >
                <FormControl isRequired mt={2}>
                  <Input
                    type="email"
                    placeholder="Enter Your Product Id"
                    fontSize="16px"
                    color="white"
                    borderColor="gray.50"
                    focusBorderColor="#68D391"
                    value={productId}
                    onChange={(e) => setProductId(e.target.value)}
                  />
                </FormControl>
                <Button mt={2} onClick={productReviewsSubmitHandler}>
                  Submit
                </Button>
              </Box>
              <DataGrid
                rows={rows}
                columns={columns}
                pageSize={10}
                disableSelectionOnClick
                className="productListTable"
                autoHeight
              />
            </>
          )}
        </Box>
      </Box>
    </>
  );
};

export default AdProductReviews;
