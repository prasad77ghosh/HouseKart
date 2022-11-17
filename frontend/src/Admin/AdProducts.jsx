import React, { useEffect } from "react";
import { Box, Text, useToast, Spinner } from "@chakra-ui/react";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { allRawProducts } from "../Actions/Products";
import { deleteProduct } from "../Actions/Products";
import "./AdProducts.css";
import { DataGrid } from "@material-ui/data-grid";
import { MdEdit } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const AdProducts = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();
  const { loading, data, error } = useSelector(
    (state) => state.RawProductsReducer
  );

  const { success, error: deleteError } = useSelector(
    (state) => state.DeleteProductReducer
  );
  
  const { products } = data;

  useEffect(() => {
    dispatch(allRawProducts());
  }, [dispatch]);

  const deleteProductHandler = (id) => {
    dispatch(deleteProduct(id));
  };

  useEffect(() => {
    if (success) {
      toast({
        title: "Product Deleted Successfully",
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "bottom",
      });

      navigate("/admin/dashboard");
      dispatch({
        type: "deleteProductReset",
      });
    }
  }, [success, dispatch, toast]);

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
    { field: "id", headerName: "Product ID", minWidth: 200, flex: 0.5 },

    {
      field: "name",
      headerName: "Name",
      minWidth: 350,
      flex: 0.7,
    },
    {
      field: "stock",
      headerName: "Stock",
      type: "number",
      minWidth: 150,
      flex: 0.3,
    },

    {
      field: "price",
      headerName: "Price",
      type: "number",
      minWidth: 270,
      flex: 0.5,
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
            <Link to={`/admin/product/${params.getValue(params.id, "id")}`}>
              <Box
                p={1}
                _hover={{
                  color: "#48BB78",
                }}
              >
                <MdEdit size={20} />
              </Box>
            </Link>

            {/* // onClick={() =>
            //   deleteProductHandler(params.getValue(params.id, "id"))
            // } */}

            <Box
              p={1}
              cursor="pointer"
              _hover={{
                color: "#E53E3E",
              }}
              onClick={() => {
                deleteProductHandler(params.getValue(params.id, "id"));
              }}
            >
              <MdDeleteOutline size={20} />
            </Box>
          </>
        );
      },
    },
  ];

  const rows = [];
  products &&
    products.forEach((item) => {
      rows.push({
        id: item._id,
        stock: item.Stock,
        price: item.price,
        name: item.name,
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
            ALL PRODUCTS
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
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={10}
              disableSelectionOnClick
              className="productListTable"
              autoHeight
            />
          )}
        </Box>
      </Box>
    </>
  );
};

export default AdProducts;
