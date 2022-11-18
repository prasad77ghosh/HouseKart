import React, { useEffect } from "react";
import { Box, Text, useToast, Spinner } from "@chakra-ui/react";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersOfAdmin, deleteOrderOfAdmin } from "../Actions/Order";
import "./AdOrders.css";
import { DataGrid } from "@material-ui/data-grid";
import { MdEdit } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const AdOrders = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();
  const { loading, data, error } = useSelector((state) => state.AdOrderReducer);

  const { success, error: deleteError } = useSelector(
    (state) => state.AdOrderDeleteReducer
  );
  const { orders } = data;

  useEffect(() => {
    dispatch(getAllOrdersOfAdmin());
  }, [dispatch]);

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
  }, [error, dispatch, toast]);

  const deleteOrderHandler = (id) => {
    dispatch(deleteOrderOfAdmin(id));
  };

  useEffect(() => {
    if (success) {
      toast({
        title: "Order Deleted Successfully",
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "bottom",
      });
      navigate("/admin/dashboard");
      dispatch({
        type: "deleteOrderReset",
      });
    }
  }, [success, dispatch, toast, navigate]);

  useEffect(() => {
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
  }, [dispatch, toast, deleteError]);

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 300, flex: 0.7 },
    {
      field: "status",
      headerName: "Status",
      minWidth: 150,
      flex: 0.5,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Delivered"
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 150,
      flex: 0.3,
    },

    {
      field: "amount",
      headerName: "Amount",
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
            <Link to={`/admin/order/${params.getValue(params.id, "id")}`}>
              <Box
                p={1}
                _hover={{
                  color: "#48BB78",
                }}
              >
                <MdEdit size={20} />
              </Box>
            </Link>

            <Box
              p={1}
              cursor="pointer"
              _hover={{
                color: "#E53E3E",
              }}
              onClick={() =>
                deleteOrderHandler(params.getValue(params.id, "id"))
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
  orders &&
    orders.forEach((item) => {
      rows.push({
        id: item._id,
        itemsQty: item.orderItems.length,
        amount: item.totalPrice,
        status: item.orderStatus,
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
            ALL ORDERS
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

export default AdOrders;
