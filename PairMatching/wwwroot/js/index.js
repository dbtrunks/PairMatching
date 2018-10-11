var click = 0;
var chosen1 = -1;
var chosen2 = -1;

$(".click").on("click", function () {
    if ($(this).hasClass("click")) {
        if (click < 2) {
            click++;
            $(this).removeClass("click").addClass("chosen");
            getElement($(this));
            $(this).find(".flip-box-inner").css("transform", "rotateY(180deg)");

        }

        if (click == 2) {
            if (chosen2 != -1 && chosen1 == chosen2) {
                $(".chosen").fadeOut(2200);
                $(".chosen").removeClass("chosen");
                restart();
                if (!$(".flip-box").hasClass("click")) {
                    setTimeout(function () {
                        var time = timer.getTimeValues().toString(['hours', 'minutes', 'seconds', 'secondTenths']);
                        $("#messages").append("Twój czas: " + time);
                        $("#inputTime").val(time);
                        $('#modal').modal('show')
                        timer.stop();
                    }, 1410);
                }

            }
            else {
                setTimeout(function () { $(".flip-box-inner").css("transform", ""); }, 1200);
                setTimeout(function () {
                    $(".flip-box-back i").removeClass();
                    $(".chosen").removeClass("chosen").addClass("click");
                    restart();
                }, 1400);
            }

        }
    }
});
function restart() {
    click = 0;
    chosen1 = -1;
    chosen2 = -1;
}

function getElement(box) {
    var val = box.find("p").text()
    var element = { "element": val };
    $.ajax({
        type: "POST",
        url: "/Index",
        async: false,
        beforeSend: function (xhr) {
            xhr.setRequestHeader("XSRF-TOKEN",
                $('input:hidden[name="__RequestVerificationToken"]').val());
        },
        data: element,
        success: function (result) {
            box.find(".flip-box-back i").removeClass().addClass(getIcon(result));
            saveResult(result);
        }
    });
}
function saveResult(result) {
    if (chosen1 == -1) {
        chosen1 = result;
    }
    else {
        chosen2 = result;
    }
}

function getIcon(number) {
    switch (number) {
        case 1:
            return "fab fa-affiliatetheme";
        case 2:
            return "fas fa-ambulance";
        case 3:
            return "fas fa-brain";
        case 4:
            return "fas fa-spa";
        case 5:
            return "fas fa-vial";
        case 6:
            return "fas fa-apple-alt";
        case 7:
            return "fas fa-laptop-code";
        case 8:
            return "fas fa-graduation-cap";
        case 9:
            return "fas fa-bell";
        case 10:
            return "fas fa-atom-alt";
        case 11:
            return "fas fa-award";
        case 12:
            return "fas fa-atlas";
        case 13:
            return "fas fa-eye";
        case 14:
            return "fas fa-bolt";
        case 15:
            return "fas fa-glass-martini-alt";
        case 16:
            return "fas fa-tint";
        case 17:
            return "fas fa-air-freshener";
        case 18:
            return "fas fa-american-sign-language-interpreting";
        case 19:
            return "fas fa-anchor";
        case 20:
            return "far fa-angry";
        case 21:
            return "fas fa-archway";
        case 22:
            return "fab fa-avianex";
        case 23:
            return "fas fa-bath";
        case 24:
            return "fas fa-blender";
        case 25:
            return "fas fa-dumbbell";
        case 26:
            return "fas fa-futbol";
        case 27:
            return "fas fa-volleyball-ball";
        case 28:
            return "fas fa-table-tennis";
        case 29:
            return "fas fa-shield-alt";
        case 30:
            return "fas fa-code-branch";
        case 31:
            return "fas fa-keyboard";
        case 32:
            return "fas fa-bug";
        case 33:
            return "fas fa-coffee";
        case 34:
            return "fas fa-chess-rook";
        case 35:
            return "fas fa-chess-pawn";
        case 36:
            return "fas fa-dove";
        case 37:
            return "fas fa-gift";
        case 38:
            return "fas fa-leaf";
        case 39:
            return "fas fa-piggy-bank";
        case 40:
            return "far fa-copyright";
        case 41:
            return "fas fa-home";
        case 42:
            return "fas fa-torii-gate";
        case 43:
            return "fas fa-vihara";
        case 44:
            return "fas fa-truck-monster";
        case 45:
            return "fas fa-music";
        case 46:
            return "fas fa-crow";
        case 47:
            return "fas fa-subscript";
        case 48:
            return "fas fa-superscript";
        case 49:
            return "fas fa-swimmer";
        case 50:
            return "fas fa-wine-glass-alt";
        default:
    }
}

$("#res").on("click", function () {
    $(location).attr('href', window.location.href);
});

$("#selectPairs").change(function () {
    var url = window.location.origin + "/" + $(this).val();
    $(location).attr('href', url);
});

var timer = new Timer();
timer.start({ precision: 'secondTenths' });
timer.addEventListener('secondTenthsUpdated', function (e) {
    $('#secondTenthsExample .values').html(timer.getTimeValues().toString(['hours', 'minutes', 'seconds', 'secondTenths']));
});