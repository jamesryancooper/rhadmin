$(document).ready(function () {
    $('#rootwizard').bootstrapWizard({
        'tabClass': 'nav nav-tabs'
    });
    window.prettyPrint && prettyPrint()
});

$(document).ready(function () {
    $('#create-blueprint-wizard').bootstrapWizard({
        onNext: function (tab, navigation, index) {
            if (index == 2) {
                // Make sure we entered the name
                if (!$('#blueprint-wizard-keyword').val()) {
                    swal("Oops!", "You must enter a keyword!");
                    $('#blueprint-wizard-keyword').focus();
                    return false;
                } else {

                }
            }
            // Set the name for the next tab
            $('#tabs3').html('Enter a target location for the <b>' + $('#blueprint-wizard-keyword').val() + '</b> blueprint');

            if (index == 3) {
                // Make sure we entered the name
                if (!$('#blueprint-wizard-location').val()) {
                    swal("Oops!", "You must enter a location!");
                    $('#blueprint-wizard-location').focus();
                    return false;
                } else {

                }
            }


        },
    });
    window.prettyPrint && prettyPrint()
});