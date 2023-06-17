let handleTable = {
    minRows: 1,
    minCols: 1,
    maxRows: 5,
    maxCols: 5,

    deletePrevTable: function() {
        const table = document.getElementById("userTable");
        table.remove()
    },

    createTable: function() {
        var table = document.createElement("table");
        table.id = "userTable"; 

        for (let r = handleTable.minRows - 1; r <= handleTable.maxRows; r++) {
            let row = document.createElement('tr');

            for (let c = handleTable.minCols - 1; c <= handleTable.maxCols; c++) {
                let col = document.createElement('td');
                if (c == handleTable.minCols - 1 && r == handleTable.minRows - 1) {
                    col.innerHTML = " ";
                } else if (c == handleTable.minCols - 1) {
                    col.innerHTML = r;
                    col.style.backgroundColor = "black";
                    col.style.color = "white";
                } else if (r == handleTable.minRows - 1) {
                    col.innerHTML = c;
                    col.style.backgroundColor = "black";
                    col.style.color = "white";
                }
                else {
                    col.innerHTML = c * r;
                }
                row.appendChild(col);
            }
            table.appendChild(row);
        }
        document.getElementById('tableSpace').appendChild(table);
    },

    clearForm: function() {
        document.getElementById("tableForm").reset();
    }
};

function regenerateTable() {
    if (document.getElementById("tableSpace").childElementCount > 0) {
        handleTable.deletePrevTable();
    }

    var minRowVal = document.getElementById("minRowVal").value;
    var minColVal = document.getElementById("minColVal").value;
    var maxRowVal = document.getElementById("maxRowVal").value;
    var maxColVal = document.getElementById("maxColVal").value;

    if (minRowVal >= -50 && minColVal >= -50 && maxRowVal <= 50 && maxColVal <= 50 && 
        !(minColVal > maxColVal || minColVal > maxColVal) &&
        (minColVal != "" && minRowVal != "" && maxColVal != "" && maxRowVal != "")) {
        document.getElementById("error").innerText = "";
        handleTable['minRows'] = minRowVal;
        handleTable['minCols'] = minColVal;
        handleTable['maxRows'] = maxRowVal;
        handleTable['maxCols'] = maxColVal;
    } else {
        let err; 
        if(isNaN(minRowVal) || isNaN(minColVal) || isNaN(maxRowVal) || isNaN(maxColVal)) {
            err = "Must input numbers only.";
        } else if (minRowVal < -50 || minColVal < -50 ) {
            err = "Min columns and min rows are -50.";
        } else if (maxRowVal > 50 || maxColVal > 50) {
            err = "Max columns and max rows are 50.";
        } else if (minColVal > maxColVal || minColVal > maxColVal) {
            err = "The min values must be less than the max values.";
        } else if (minColVal == "" || minRowVal == "" || maxColVal == "" || maxRowVal == "") {
            err = "Please input values."
        } else {
            err = "Please input valid values.";
        }
        document.getElementById("error").innerText = err; 
    }

    handleTable.clearForm();

    handleTable.createTable();
}