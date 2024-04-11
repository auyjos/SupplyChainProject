const formatTableHeaders = (header) => {
    let newName;
    newName = header.replace('_', " ");
    newName = header === "id" ? "No." : newName;
    return newName;
}

export const buildData = (dataArray, headers) => {
    // let headers = Object.keys(dataArray[0]);
    const data = {
        columns: headers,
          rows: dataArray
    }
    // headers.forEach((item) => {
    //     let header = { Header: formatTableHeaders(item), accessor:item , width: "20%" };
    //     data.columns.push(header);
    // });
    return data;

}

