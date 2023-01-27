import React from "react";
import { TableCell, TableContainer, TableRow, Table } from "@mui/material";

const Info = ({ ship }) => {
  
 
// 진행률 bar 구현부분 함수 
const bar = ship.map(({takeTime})=>
 
  (takeTime/150)*100
  
)
console.log(bar)
 






  return (
    <>
      <TableContainer>
        <Table>
          <TableRow>
            <TableCell align="center">선박명</TableCell>
            <TableCell align="center">선박용도</TableCell>
            <TableCell align="center">출발지</TableCell>
            <TableCell align="center">도착지</TableCell>
            <TableCell align="center">출발시각</TableCell>
            <TableCell align="center" className="text-red-600 font-bold">도착예정시각</TableCell>
            <TableCell align="center">진행률</TableCell>
          </TableRow>

          {ship.map(
            ({
              shipId,
              shipName,
              shipLat,
              shipLon,
              takeTime,
              shipUse,
              speed,
              departTime,
              arrivalTime,
              accuracy,
              departure,
              arrivalName
            }) => (
              <>
                <TableRow>
                  <TableCell align="center">{shipName}</TableCell>
                  <TableCell align="center">{shipUse}</TableCell>
                  <TableCell align="center">{departure}</TableCell>
                  <TableCell align="center">{arrivalName}</TableCell>
                  <TableCell align="center">{departTime}</TableCell>
                  <TableCell align="center" className="font-bold">{arrivalTime}</TableCell>
                  <TableCell align="center">
                    <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                    <div className="bg-blue-600 h-2.5 rounded-md" style={{width : `${bar}`}}></div>
                  </div></TableCell>
                </TableRow>
              </>
            )
          )}
        </Table>
      </TableContainer>
    </>
  );
};

export default Info;
