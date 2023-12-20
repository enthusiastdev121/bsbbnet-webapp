import React, { useEffect, useState } from "react";
import timeIcon from "../../assets/icons/time-icon.svg";
import phoneIcon from "../../assets/icons/phone-icon.svg";
import cityIcon from "../../assets/icons/city-icon.svg";
import calendaricon from "../../assets/icons/calendar-icon.svg";
import tableMenuIcon from "../../assets/icons/table-menu.svg";
import editIcon from "../../assets/icons/edit-icon.svg";
import deleteIcon from "../../assets/icons/delete-icon.svg";
import { ListItemIcon, ListItemText, IconButton } from "@material-ui/core";
import "../css/main.css";
import { Navbar, Nav, Dropdown, Container, NavDropdown } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import TimingMenue from "./TimingMenue";
import MUIDataTable, {
  TableHead,
  TableHeadCell,
  TableHeadRow,
} from "mui-datatables";
import { StyledMenu, StyledMenuItem } from "./layout/StyledMenu";
import { MDBBtn } from "mdb-react-ui-kit";
import { deleteSpa, getCity, getSpas, bulkDeletionSpa } from "../../axiosCalls";
import { toast } from "react-toastify";
// import customToolbar from "./customToolbar";

const SpaTable = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [city, setCity] = useState();
  const [deleteid, setdeleteid] = useState(0);

  const [Allspa, setAllspa] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      await getSpas().then((res) => {
        // console.log(res.data.data);

        setAllspa(res.data.data);
      });
    };

    fetchData()
      // make sure to catch any error
      .catch(console.error);
  }, []);

  console.log(Allspa);

  const handleClickMenu = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const columns_moblie = [
    {
      name: "name",
      label: "Business",
      options: {
        customHeadRender: ({ index, ...column }) => {
          return (
            <>
              <th
                className="MuiTableCell-root MuiTableCell-sizeMedium tss-10syd3x-MUIDataTableHeadCell-root tss-gm6zfk-MUIDataTableHeadCell-fixedHeader css-1ygcj2i-MuiTableCell-root">
                {column.label}
              </th>
            </>
          );
        },
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <div className="float-left">
              <span
                style={{
                  fontSize: "14px",
                  fontWeight: 600,
                  cursor: "pointer",

                }}
                onClick={() => {
                  navigate(`/account/spa/edit?id=${tableMeta.rowData[1]}`);
                }}
              >
                {console.log(tableMeta)}
                {/* {tableMeta.rowData[0]} */}
                {tableMeta.rowData[0]}
              </span>
            </div>
          );
        },
      },
    },
    {
      name: "actions",
      label: "Actions",
      options: {
        viewColumns: false,
        filter: false,
        customHeadRender: ({ index, ...column }) => {
          return (
            <>
              <th className="MuiTableCell-root MuiTableCell-head MuiTableCell-sizeMedium tss-10syd3x-MUIDataTableHeadCell-root tss-gm6zfk-MUIDataTableHeadCell-fixedHeader css-1ygcj2i-MuiTableCell-root">
                {column.label}
              </th>
            </>
          );
        },
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <div className="MuiTableCell-head space-x-3">
              <span
                style={{
                  fontSize: "14px",
                  fontWeight: 700,
                  cursor: "pointer",
                }}
                onClick={() => {
                  navigate(`/single-spa?id=${tableMeta.rowData[1]}`);
                }}
              >
                <i class="fas fa-eye"></i>
              </span>
              <span
                style={{
                  fontSize: "14px",
                  fontWeight: 700,
                  cursor: "pointer",
                }}
                onClick={async() => {
                  await deleteSpa(tableMeta.rowData[1]).then((res) => {
                  console.log(res);
                  if (res.data.success) {
                    toast(res.data.message, {
                      position: "top-right",
                      autoClose: 2000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                      theme: "colored",
                    });

                    getSpas().then((res) => {
                      setAllspa(res.data.data);
                    });
                  }
                  });
                }}  
              >
                <i class="fas fa-trash-alt"></i>
              </span>
            </div>
          );
        },
      },
    },
  ];

  const columns = [
    {
      name: "name",
      label: "Massage Business Name",
      options: {
        customHeadRender: ({ index, ...column }) => {
          return (
            <>
              <th
                className="MuiTableCell-root MuiTableCell-sizeMedium tss-10syd3x-MUIDataTableHeadCell-root tss-gm6zfk-MUIDataTableHeadCell-fixedHeader css-1ygcj2i-MuiTableCell-root">
                {column.label}
              </th>
            </>
          );
        },
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <div className="float-left">
              <span
                style={{
                  fontSize: "16px",
                  cursor: "pointer",

                }}
                onClick={() => {
                  navigate(`/account/spa/edit?id=${tableMeta.rowData[2]}`);
                }}
              >
                {console.log(tableMeta)}
                {tableMeta.rowData[0]}
              </span>
            </div>
          );
        },
      },
    },
    {
      name: "city",
      label: "City",
      options: {
        customHeadRender: ({ index, ...column }) => {
          return (
            <>
              <th className="MuiTableCell-root MuiTableCell-sizeMedium tss-10syd3x-MUIDataTableHeadCell-root tss-gm6zfk-MUIDataTableHeadCell-fixedHeader css-1ygcj2i-MuiTableCell-root">
                {column.label}
              </th>
            </>
          );
        },
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <div className="float-left">
              <span>
                {tableMeta.rowData[1]}
              </span>
            </div>
          );
        },
      },
    },
    {
      name: "actions",
      label: "Actions",
      options: {
        viewColumns: false,
        filter: false,
        customHeadRender: ({ index, ...column }) => {
          return (
            <>
              <th className="MuiTableCell-root MuiTableCell-head MuiTableCell-sizeMedium tss-10syd3x-MUIDataTableHeadCell-root tss-gm6zfk-MUIDataTableHeadCell-fixedHeader css-1ygcj2i-MuiTableCell-root">
                {column.label}
              </th>
            </>
          );
        },
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <div className="MuiTableCell-head space-x-3">
              <span
                style={{
                  fontSize: "16px",
                  fontWeight: 700,
                  cursor: "pointer",
                }}
                onClick={() => {
                  navigate(`/single-spa?id=${tableMeta.rowData[2]}`);
                }}
              >
                <i class="fas fa-eye"></i>
              </span>
              <span
                style={{
                  fontSize: "16px",
                  fontWeight: 700,
                  cursor: "pointer",
                }}
                onClick={async() => {
                  await deleteSpa(tableMeta.rowData[2]).then((res) => {
                  console.log(res);
                  if (res.data.success) {
                    toast(res.data.message, {
                      position: "top-right",
                      autoClose: 2000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                      theme: "colored",
                    });

                    getSpas().then((res) => {
                      setAllspa(res.data.data);
                    });
                  }
                  });
                }}  
              >
                <i class="fas fa-trash-alt"></i>
              </span>
            </div>
          );
        },
      },
    },

    // {
    //   name: "time",
    //   label: "TIME",
    //   options: {
    //     customHeadRender: ({ index, ...column }) => {
    //       return (
    //         <>
    //           <th className="MuiTableCell-root MuiTableCell-head MuiTableCell-sizeMedium tss-10syd3x-MUIDataTableHeadCell-root tss-gm6zfk-MUIDataTableHeadCell-fixedHeader css-1ygcj2i-MuiTableCell-root">
    //             <img src={timeIcon} className="table-headIcon" /> {column.label}
    //           </th>
    //         </>
    //       );
    //     },
    //   },
    // },
    // {
    //   name: "phno",
    //   label: "Phone Number",
    //   options: {
    //     customHeadRender: ({ index, ...column }) => {
    //       return (
    //         <>
    //           <th className="MuiTableCell-root MuiTableCell-head MuiTableCell-sizeMedium tss-10syd3x-MUIDataTableHeadCell-root tss-gm6zfk-MUIDataTableHeadCell-fixedHeader css-1ygcj2i-MuiTableCell-root">
    //             <img src={phoneIcon} className="table-headIcon" />{" "}
    //             {column.label}
    //           </th>
    //         </>
    //       );
    //     },
    //   },
    // },
    // {
    //   name: "city",
    //   label: "City",
    //   options: {
    //     customHeadRender: ({ index, ...column }) => {
    //       return (
    //         <>
    //           <th className="MuiTableCell-root MuiTableCell-head MuiTableCell-sizeMedium tss-10syd3x-MUIDataTableHeadCell-root tss-gm6zfk-MUIDataTableHeadCell-fixedHeader css-1ygcj2i-MuiTableCell-root">
    //             <img src={cityIcon} className="table-headIcon" /> {column.label}
    //           </th>
    //         </>
    //       );
    //     },
    //   },
    // },
    // {
    //   name: "actions",
    //   label: "Actions",
    //   options: {
    //     viewColumns: false,
    //     filter: false,
    //     customHeadRender: ({ index, ...column }) => {
    //       return (
    //         <>
    //           <th className="MuiTableCell-root MuiTableCell-head MuiTableCell-sizeMedium tss-10syd3x-MUIDataTableHeadCell-root tss-gm6zfk-MUIDataTableHeadCell-fixedHeader css-1ygcj2i-MuiTableCell-root">
    //             {/* {column.label} */}
    //           </th>
    //         </>
    //       );
    //     },
    //     customBodyRender: (value, tableMeta, updateValue) => {
    //       return (
    //         <div className="MuiTableCell-head"
    //           style={{ width: "28px" }}
    //         >
    //           <IconButton
    //             id={value}
    //             onClick={(e) => {
    //               handleClickMenu(e);
    //               setdeleteid(value);
    //             }}
    //           >
    //             <img src={tableMenuIcon} style={{ width: "5px" }} />
    //           </IconButton>
    //           <StyledMenu
    //             id={`customized-menu-${tableMeta.rowIndex}`}
    //             key={tableMeta.rowData[0]}
    //             anchorEl={anchorEl}
    //             keepMounted
    //             open={Boolean(anchorEl)}
    //             onClose={handleCloseMenu}
    //           >
    //             <StyledMenuItem
    //               onClick={async () => {
    //                 handleCloseMenu();
    //                 if (
    //                   window.confirm(
    //                     "Are you sure you want to delete this business spa page?"
    //                   )
    //                 ) {
    //                   console.log(deleteid);
    //                   await deleteSpa(deleteid).then((res) => {
    //                     console.log(res);
    //                     if (res.data.success) {
    //                       toast(res.data.message, {
    //                         position: "top-right",
    //                         autoClose: 2000,
    //                         hideProgressBar: false,
    //                         closeOnClick: true,
    //                         pauseOnHover: true,
    //                         draggable: true,
    //                         progress: undefined,
    //                         theme: "colored",
    //                       });

    //                       getSpas().then((res) => {
    //                         setAllspa(res.data.data);
    //                       });
    //                     }
    //                   });
    //                 } else {
    //                 }
    //               }}
    //               id={deleteid}
    //             >
    //               <ListItemIcon>
    //                 <img src={deleteIcon} />
    //               </ListItemIcon>
    //               <ListItemText primary="Delete" />
    //             </StyledMenuItem>
    //           </StyledMenu>
    //         </div>
    //       );
    //     },
    //   },
    // },
  ];

  const handlerRegister = () => {
    console.log("btn Register");
    navigate("/account/spa/add");
  };

  const HeaderElements = () => {
    return (
      <MDBBtn
        type="button"
        // className="btn-regtr extra-button"
        block
        onClick={handlerRegister}
      >
        + Add/Register Massage Business
      </MDBBtn>
    );
  };

  const newData = Allspa?.map((spa) => {
    return {
      actions: spa.id,
      name: spa.name,
      phno: "",
      city: spa.city,
      hourOfOpertaion: "",
      time: "",

      // phno: spa.phone,
      // city: spa?.city,
      // hourOfOpertaion: spa.hourOfOpertaion,
      // time: <TimingMenue Allspa={spa} />,
    };
  });
  const data = [
    ["Gabby George", "Business Analyst", "Minneapolis", 30, "$100,000", true],
    ["Aiden Lloyd", "Business Consultant", "Dallas", 55, "$200,000", false],
  ];

  const options = {
    filterType: "checkbox",
    selectableRows: "none",
    rowsPerPage: 10,
    rowsPerPageOptions: [10, 25, 50],
    dropdown: "vertical",
    // onRowsDelete: async (rowsDeleted, newData) => {
    //   let selectedrow = [];
    //   rowsDeleted.data?.map((spa) => {
    //     selectedrow.push(Allspa[spa.index].id.toString());
    //   });

    //   const res = await bulkDeletionSpa(selectedrow);
    //   console.log(res);
    // },
    download: false,
    print: false,
    viewColumns: false,
    responsive: "horizontal",
    filter: false,
    // customToolbar: HeaderElements,
  };
  return (
    <div className="mt-[64px] md:mt-[86px] p-[8px] sm:p-[12px]">
      <div className="flex justify-end mb-[8px] sm:mb-[12px]">
        <MDBBtn
          type="button"
          // className="btn-regtr extra-button"
          onClick={handlerRegister}
        >
          + Add/Register Massage Business
        </MDBBtn>
      </div>
      <MUIDataTable
        className="m-0 hidden md:block !whitespace-normal"
        data={newData}
        columns={columns}
        options={options}
      />
      <MUIDataTable
        className="m-0 block md:hidden"
        data={newData}
        columns={columns_moblie}
        options={options}
      />
    </div>
  );
};

export default SpaTable;
