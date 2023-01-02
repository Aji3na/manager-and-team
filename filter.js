// Get unique values for the desired columns

function getUniqueValuesFromColumn() {

    var col_values_table = {}
    //console.log(col_values_table);

    allFilters = document.querySelectorAll(".table-filter")
    allFilters.forEach((filter_i) => {
        col_index = filter_i.parentElement.getAttribute("col-index");
        //console.log(col_index);
        const rows = document.querySelectorAll("tbody > tr")

        rows.forEach((row) => {
            cell_value = row.querySelector("td:nth-child("+col_index+")").innerHTML;
            console.log(cell_value);
            // if the col index is already present in the table
            if (col_index in col_values_table) {

                // if the cell value is already present in the array
                if (col_values_table[col_index].includes(cell_value)) {
                    // alert(cell_value + " is already present in the array : " + col_values_table[col_index])

                } else {
                    col_values_table[col_index].push(cell_value);
                    // alert("Array after adding the cell value : " + col_values_table[col_index])

                }


            } else {
                col_values_table[col_index] = new Array(cell_value)
            //alert(cell_value);
            }
        });

        
    });

    for(i in col_values_table) {
        //alert("Column index : " + i + " has Unique values : \n" + col_values_table[i]);
    }

    updateSelectOptions(col_values_table);

};

// Add <option> tags to the desired columns based on the unique values

function updateSelectOptions(col_values_table) {
    allFilters = document.querySelectorAll(".table-filter")

    allFilters.forEach((filter_i) => {
        col_index = filter_i.parentElement.getAttribute('col-index')

        col_values_table[col_index].forEach((i) => {
            filter_i.innerHTML = filter_i.innerHTML + `\n<option value="${i}">${i}</option>`
            //alert(filter_i.innerHTML);
        });

    });
};


// Create filter_rows() function

// filter_value_table {2 : Value selected, 4:value, 5: value}

function filter_rows() {
    allFilters = document.querySelectorAll(".table-filter")
    var filter_value_table = {}

    allFilters.forEach((filter_i) => {
        col_index = filter_i.parentElement.getAttribute('col-index')

        value = filter_i.value
        if (value != "all") {
            filter_value_table[col_index] = value;
            //alert(value);
        }
    });

    var col_cell_value_table = {};

    const rows = document.querySelectorAll("tbody tr");
    rows.forEach((row) => {
        var display_row = true;

        allFilters.forEach((filter_i) => {
            col_index = filter_i.parentElement.getAttribute('col-index')
            col_cell_value_table[col_index] = row.querySelector("td:nth-child(" + col_index+ ")").innerHTML
            
        })

        for (var col_i in filter_value_table) {
            filter_value = filter_value_table[col_i]
            row_cell_value = col_cell_value_table[col_i]
            //alert(filter_value);
            //alert(row_cell_value);
            
            if (row_cell_value.indexOf(filter_value) == -1 && filter_value != "all") {
                display_row = false;
                break;
            }


        }

        if (display_row == true) {
            row.style.display = "table-row"

        } else {
            row.style.display = "none"

        }
    })

}