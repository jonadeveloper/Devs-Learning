import React, { useState } from "react";
import { Typography, Box, CircularProgress } from "@mui/material";
import MUIDataTable, { MUIDataTableOptions, MUIDataTableColumn } from "mui-datatables";
import { useAppSelector } from "../../../hooks/hooksRedux";


interface RowData {
  fullname: string;
  rank: string;
  email: string;
  phoneNumber: string;
  courses: string[];
}

const SalesPanel: React.FC = () => {
  const { status, sales } = useAppSelector((state) => state.sales)
  const initialData: RowData[] = [
    {
      fullname: "Jonatan Villalva",
      rank: "student",
      email: "jvillalva.sistemas@gmail.com",
      phoneNumber: "1112223334",
      courses: ["javascript ", "html ", "react "],
    },
    {
      fullname: "Francisco Rivero",
      rank: "student",
      email: "fran.rivero99@gmail.com",
      phoneNumber: "1112223334",
      courses: ["javascript ", "html ", "react "],
    },
    {
      fullname: "Jonathan Mir Kim",
      rank: "student",
      email: "jonathan.kim75.sistemas@gmail.com",
      phoneNumber: "1112223334",
      courses: ["javascript ", "html ", "react "],
    },
    {
      fullname: "Federico Almada ",
      rank: "student",
      email: "fede.55almada.sistemas@gmail.com",
      phoneNumber: "1112223334",
      courses: ["javascript ", "html ", "react "],
    },
    {
      fullname: "Jonatan Villalva",
      rank: "student",
      email: "jvillalva.sistemas@gmail.com",
      phoneNumber: "1112223334",
      courses: ["javascript ", "html ", "react "],
    },
    {
      fullname: "Francisco Rivero",
      rank: "student",
      email: "fran.rivero99@gmail.com",
      phoneNumber: "1112223334",
      courses: ["javascript ", "html ", "react "],
    },
    {
      fullname: "Jonathan Mir Kim",
      rank: "student",
      email: "jonathan.kim75.sistemas@gmail.com",
      phoneNumber: "1112223334",
      courses: ["javascript ", "html ", "react "],
    },
    {
      fullname: "Federico Almada ",
      rank: "student",
      email: "fede.55almada.sistemas@gmail.com",
      phoneNumber: "1112223334",
      courses: ["javascript ", "html ", "react "],
    },
    {
      fullname: "Jonatan Villalva",
      rank: "student",
      email: "jvillalva.sistemas@gmail.com",
      phoneNumber: "1112223334",
      courses: ["javascript ", "html ", "react "],
    },
    {
      fullname: "Francisco Rivero",
      rank: "student",
      email: "fran.rivero99@gmail.com",
      phoneNumber: "1112223334",
      courses: ["javascript ", "html ", "react "],
    },
    {
      fullname: "Jonathan Mir Kim",
      rank: "student",
      email: "jonathan.kim75.sistemas@gmail.com",
      phoneNumber: "1112223334",
      courses: ["javascript ", "html ", "react "],
    },
    {
      fullname: "Federico Almada ",
      rank: "student",
      email: "fede.55almada.sistemas@gmail.com",
      phoneNumber: "1112223334",
      courses: ["javascript ", "html ", "react "],
    },
  ];

  const [data, setData] = useState(initialData);

  const columns: MUIDataTableColumn[] = [
    {
      name: "courseId",
      label: "Course Id",
    },
    {
      name: "user_name",
      label: "User",
    },
    {
      name: "email",
      label: "Email",
    },
    {
      name: "createdAt",
      label: "Sale date",
    },

    // {
    //   name: "action",
    //   label: "Action",
    //   options: {
    //     customBodyRender: (value: any, tableMeta: any, updateValue: any) => {
    //       const rowIndex = tableMeta.rowIndex;
    //       return (
    //         <>
    //           <Button variant="outlined" onClick={() => handleEdit(rowIndex)}>
    //             Edit
    //           </Button>
    //           <Button variant="outlined" onClick={() => handleDelete(rowIndex)}>
    //             Delete
    //           </Button>
    //         </>
    //       );
    //     },
    //   },
    // },
  ]

  const options: MUIDataTableOptions = {
    selectableRows: "none",
    responsive: "standard",
    download: false,
    print: false,
    viewColumns: false,
    pagination: true,
    rowsPerPage: 5,
  };
  if (status === "loading") {
    return (
      <Box
        sx={{
          display: "flex",
          height: "100%",
          width: "100%",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <CircularProgress color="success" size={100} />
      </Box>
    )
  }
  return (
    <div>
      <Typography variant="h3">Sales</Typography>
      ACÁ SE RENDERIZA LA INFORMACION SOBRE VENTAS
      <Box>
        <MUIDataTable title="Student List" data={sales} columns={columns} options={options} />

      </Box>

    </div>
  );
};

export default SalesPanel;