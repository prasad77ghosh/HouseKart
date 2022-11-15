import React, { useEffect } from "react";
import "./myOrders.css";
import { DataGrid } from "@material-ui/data-grid";
import { Box, Spinner, useToast } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { myOrders } from "../../Actions/Order";
import { MdLaunch } from "react-icons/md";
import { Link } from "react-router-dom";

const MyOrder = () => {
  const dispatch = useDispatch();
  const toast = useToast();
  const { loading, orders, error } = useSelector(
    (state) => state.MyOrderReducer
  );
  const { user } = useSelector((state) => state.AuthReducer);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    dispatch(myOrders());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast({
        title: error,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      dispatch({
        type: "clearError",
      });

      return;
    }
  }, [dispatch, toast, error]);

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 300, flex: 1 },

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
          <Link to={`/order/${params.getValue(params.id, "id")}`}>
            <MdLaunch size={20} />
          </Link>
        );
      },
    },
  ];
  const rows = [];

  orders &&
    orders.forEach((item, index) => {
      rows.push({
        itemsQty: item.orderItems.length,
        id: item._id,
        status: item.orderStatus,
        amount: item.totalPrice,
      });
    });

  return (
    <>
      {loading ? (
        <>
          <Box margin="50% auto">
            <Spinner size="xl" color="#322659" />
          </Box>
        </>
      ) : (
        <>
          <div className="myOrdersPage">
            <div id="myOrdersHeading">
              <p>{user.name}'s Orders</p>
            </div>
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={10}
              disableSelectionOnClick
              className="myOrdersTable"
              autoHeight
            />
          </div>
        </>
      )}
    </>
  );
};

export default MyOrder;
