fillCurrentDate('gregDay', 'gregMonth', 'gregYear', 'romanDate');

function runProgramm () {
    document.getElementById('romanDate').value = convertRoman(
        document.getElementById('gregDay').value ? document.getElementById('gregDay').value : document.getElementById('gregDay').placeholder,
        document.getElementById('gregMonth').value ? document.getElementById('gregMonth').value : document.getElementById('gregMonth').placeholder,
        document.getElementById('gregYear').value ? document.getElementById('gregYear').value : document.getElementById('gregYear').placeholder
    );
}

function displayObj(e) { jQuery(e).fadeIn(); }
function hideObj(e) { jQuery(e).fadeOut(); }

jQuery(document).keyup(function (e) {
    if (e.keyCode === 27) { hideObj('#infobox_manual'); }   // esc
});

jQuery('label.code input, input.code').click(function () {
   jQuery(this).select();
});
