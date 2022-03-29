$(document).ready(() => {

    const updateRecordPromise = new Promise((resolve, reject) => {
        // Get your data here from ajax then resolve it
        let data = ['Record1', 'Record2', 'Record3'];
        // This is just mock data
        resolve(data);
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

}); 