import React, { useEffect } from "react";
import { Box, Text, useToast, Spinner } from "@chakra-ui/react";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";
import "./AdUserList.css";
import { DataGrid } from "@material-ui/data-grid";
import { MdEdit } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { allUserOfAdmin } from "../Actions/AdUser";
import { userDeleteOfAdmin } from "../Actions/AdUser";

const AdUserList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();

  const { loading, users, error } = useSelector((state) => state.AdUserReducer);
  const { success, error: deleteUserError } = useSelector(
    (state) => state.AdDeleteUserReducer
  );

  useEffect(() => {
    dispatch(allUserOfAdmin());
  }, [dispatch]);

  const deleteUserHandler = (id) => {
    dispatch(userDeleteOfAdmin(id));
  };

  useEffect(() => {
    if (success) {
      toast({
        title: "User Deleted Successfully",
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "bottom",
      });

      navigate("/admin/dashboard");
      dispatch({
        type: "deleteUserReset",
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

    if (deleteUserError) {
      toast({
        title: deleteUserError,
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "bottom",
      });
      dispatch({
        type: "clearError",
      });
    }
  }, [dispatch, error, toast, deleteUserError]);

  const columns = [
    { field: "id", headerName: "User ID", minWidth: 180, flex: 0.6 },

    {
      field: "email",
      headerName: "Email",
      minWidth: 200,
      flex: 0.7,
    },
    {
      field: "name",
      headerName: "Name",
      minWidth: 150,
      flex: 0.5,
    },

    {
      field: "role",
      headerName: "Role",
      type: "number",
      minWidth: 150,
      flex: 0.3,
      cellClassName: (params) => {
        return params.getValue(params.id, "role") === "admin"
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
            <Link to={`/admin/user/${params.getValue(params.id, "id")}`}>
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
                deleteUserHandler(params.getValue(params.id, "id"))
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
  users &&
    users.forEach((user) => {
      rows.push({
        id: user._id,
        role: user.role,
        email: user.email,
        name: user.name,
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
            ALL USERS
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

export default AdUserList;
