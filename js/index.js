$(document).ready(() => {

    const updateRecordPromise = new Promise((resolve, reject) => {
        // Get your data here from ajax then resolve it
        $.ajax({
            url: './js/sampleRecords.json',
            dataType: 'json',
            success: function (data) {
                console.log(data);
                resolve(data.records);
            }
        });
    });

    const getRecordTypesPromise = new Promise((resolve, reject) => {
        // Get your data here from ajax then resolve it
        // This is just mock data
        resolve(['Oklahoma', 'MD', 'DC']);
    })

    // Load default page
    $('#form-container').load('../html/addRecord.html', () => {
        $('#addRecordLink').addClass('active');
        $('#addFacilityInput').val($('#facilitySelect').val());

        $('#addRecordForm').on('submit', $event => {
            $event.preventDefault();
            // Do something wtih the data here.
            console.log($event);
            console.log('addRecordForm submitted!');
        });

    });

    getRecordTypesPromise.then(optionsList => {
        let options = [];
        for (const option of optionsList) {
            options.push(`<option value="${option}">${option}</option>`);
        }
        $('#facilitySelect').append(options)
    });

    $('#addRecordLink').click($event => {
        // This line prevents the <a> from actually navigating
        $event.preventDefault();

        // Load form
        $('#form-container').load('../html/addRecord.html', () => {
            // Update navbar css
            $('#updateRecordLink').removeClass('active');
            $('#addRecordLink').addClass('active');

            // Set form type
            $('#addFacilityInput').val($('#facilitySelect').val())

            $('#addRecordForm').on('submit', $event => {
                $event.preventDefault();
                // Do something wtih the data here.
                console.log('addRecordForm submitted!');
            });
        });
    });

    $('#updateRecordLink').click($event => {
        // This line prevents the <a> from actually navigating
        $event.preventDefault();

        // Load form
        $('#form-container').load('../html/updateRecord.html', () => {

            // Update Nav styling
            $('#addRecordLink').removeClass('active');
            $('#updateRecordLink').addClass('active');
            $('#updateFacilityInput').val($('#facilitySelect').val());

            // Grab previous data
            updateRecordPromise.then(updateRecordIds => {
                let htmlRecordArray = [];
                for (const record of updateRecordIds) {
                    let modifiedRecordString = `<option value="${record}">${record}</option>`
                    htmlRecordArray.push(modifiedRecordString);
                }
                return htmlRecordArray;
            }).then(htmlRecordArray => {
                $('#updateIdList').append(htmlRecordArray);
            });

            // Listen for update form submit
            $('#updateRecordForm').on('submit', $event => {
                $event.preventDefault();
                console.log('updateRecordForm submitted!');
                // Do something wtih the data here.
            });
        });
    });

    // Handle Navbar form type change at top.
    $('#facilitySelect').on('change input', $event => {
        $('#addFacilityInput').val($('#facilitySelect').val());
        $('#updateFacilityInput').val($('#facilitySelect').val());
    });


    /**
    * Takes an array of strings, then converts each individual element
    * to <option value="optionValue">optionValue</option>
    * @param {*} options 
    */
    function convertArrayElementsToHtmlOptions(options) {
        let array = [];
        for (const option of options) {
            array.push(`<option value="${option}">${option}</option>`);
        }

        return array;
    }


    $('#dynamicDropdownLink').click($event => {
        $event.preventDefault();

        $('#form-container').load('../html/dynamicDropdown.html', () => {

            // Update Nav styling
            $('#dynamicDropdownLink').addClass('active');
            $('#addRecordLink').removeClass('active');
            $('#updateRecordLink').removeClass('active');
            $('#updateFacilityInput').val($('#facilitySelect').val());

            $('#positionSelect').on('change input', $event => {

                let dropdownOneValue = $('#positionSelect').val();
                const sasPromise = new Promise((resolve, reject) => {
                    // `SELECT DISTINCT * FROM WHATEVER WHERE id=${dropdownOneValue}`
                    resolve(['pos1Option1', 'pos1Option2', 'pos1Option3']);
                });

                sasPromise.then(response => {
                    console.log(response);
                    $('#secondSelect').empty().append(convertArrayElementsToHtmlOptions(response));
                }).catch(error => {
                    console.error(error);
                })

            })
        });


    })



}); 