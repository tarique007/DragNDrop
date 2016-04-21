var counter = 0;
var hint = 3;
var myData = [];
var c = 0;
var funcObj = [];

$(document).ready(function () {
    funcObj.fetchJson();
    funcObj.main();
    funcObj.initialWidth = $('body').width();
    $("#trigger").focus();
    $("#validate").click(function () {

        funcObj.validate();

    })

});

funcObj = {
    fetchJson: function () {
        $.getJSON('js/dat.json', function (dat) {
            myData = dat;
        }).done(function () {
            for (var i = 0; i < myData.images.length; i++) {
                console.log(i)
                $("#slider").append('<img src="' + myData.images[i].source + '"id="' + myData.images[i].id + '" tabindex=0 class="' + myData.images[i].class + '" aria-label="' + myData.images[i].arialabel + '">');
                c = 1;
            }
            $(".drags").draggable({
                revert: true,
                containment: 'body'
            });
        })
        this.keyBoard();
    },
    keyBoard: function () {
        $("#trigger").on("click", function () {

            if ($("#slider").position().left == 0) {
                $('body').width($('body').width() + 250)

            } else {
                $('body').width($('body').width() - 250);


            }


        });

        $("#trigger").on("keydown", function (e) {
            if (e.keyCode == 13) {
                $("#trigger").trigger("click");
                if ($('body').width() < funcObj.initialWidth) {
                    $(".drags").eq(0).focus();
                    $(".drops").attr('tabindex', '-1')
                    console.log("called")
                }
            }
            var toDrop;

            $(".drags").each(function (i) {

                $(this).bind('keydown', function (event) {
                    console.log("e" + event.keyCode)
                    if (event.keyCode === 32) {
                        console.log($(this).attr('id'));
                        $(this).addClass("selected");
                        $(this).attr("aria-selected", "true");
                        $(this).attr("aria-grabbed", "true");
                        toDrop = this;

                        $(".drops").attr('tabindex', '0')
                        $(".disable").attr('tabindex', '-1')
                        $(".drops").eq(0).focus();
                        $(".drags").attr("tabindex", '-1');
                        $("button").attr("tabindex", '-1');

                    }
                });
            })

            $(".drops").each(function () {

                $(this).on('keydown', function (event) {
                    if (event.keyCode === 13) {
                        $(toDrop).attr("aria-selected", "false")
                        $(toDrop).attr("aria-grabbed", "false")

                        if ($("#slider").children().length == 0) {

                        }
                        $(".drags").eq(0).focus();
                        $(".drags").attr('tabindex', '0')
                        $(toDrop).removeClass("selected")
                        $(this).addClass('disable')
                        $(".drops").attr('tabindex', '-1')
                        $("#retry").show();
                        $(this).attr('tabindex', '-1');
                        $(toDrop).attr('tabindex', '-1');
                        $("button").attr('tabindex', '0')

                        console.log(toDrop)
                        $(toDrop).appendTo($(this)).removeClass("drags").addClass("place");
                        $(this).attr("drop-effect", "move")

                        if ($(toDrop).attr("id") == "hut") {
                            $(toDrop).width($(toDrop).parent().width() - 150)
                            $(toDrop).height($(toDrop).parent().height() - 30)
                        }
                        if ($(toDrop).attr("id") == "tree") {
                            $(toDrop).width($(toDrop).parent().height() - 25)
                            $(toDrop).height($(toDrop).parent().width() - 100)
                        }

                        if ($(toDrop).attr("id") == "bird") {
                            $(toDrop).width($(toDrop).parent().width() - 250)
                            $(toDrop).height($(toDrop).parent().height() - 150)
                        }
                        if ($(toDrop).attr("id") == "kid") {
                            $(toDrop).width($(toDrop).parent().width() - 230)
                            $(toDrop).height(170)
                        }
                    }
                });


            });

        });
    },
    main: function () {
        var that = this
        $("#retry").click(function () {

            that.retry();

        });
        $("label").html("HINTS: " + hint)
        $("#hint").click(function () {
            hint--;
            $(".modal-content").html("")
            if (hint == 0) {
                $("label").html("HINTS OVER")
                $("#hint").effect("explode")
            } else {
                $("label").html("HINT: " + hint)
            }
        });
        $('#slider').slideReveal({
            trigger: $("#trigger")

        });


        $(".drops").droppable({

            accept: ".drags",
            drop: this.dropOps,
            over: this.droppaples



        });



    },

    retry: function () {
        console.log("called")
        $(".place").appendTo("#slider").removeClass("place").addClass("drags")

        hint = 3;
        counter = 0;
        $("label").html("HINT: " + hint)
        $(".drags").draggable('enable');
        $("#retry").hide();
        $("#trigger").focus();
    },
    validate: function () {
        $(".drags").attr('tabindex', '0')
        $(".place").each(function () {
            if ($(this).attr('id') === $(this).parent().attr('id')) {
                counter++;
            }
        });
        if (counter == 4 && ($("#slider").children().length == 0)) {
            $("#trigger").trigger('click')
            $("#hint").trigger("click");
            hint = 3;
            $(".modal-content").html("");
            $(".modal-content").append("<p>match</p>")
            $("#retry").trigger("click")
            $('.close').focus()
        } else {
            $("#trigger").trigger('click')
            $("#hint").trigger("click");
            hint = 3;
            $(".modal-content").html("");
            $(".modal-content").append("<p>try again</p>")
            $("#retry").trigger("click")
            $('.close').focus()
        }


    },
    dropOps: function (event, ui) {
        if ($("#slider").children().length == 0) {
            $("#trigger").trigger("click")
        }
        $("#retry").show();
        $(".dn").detach();
        $(".dd").detach();
        if ($(this).children().length >= 1 == false) {
            console.log((ui.dragabble))
            console.log(event.target)

            $(ui.draggable).appendTo(event.target).removeClass("drags").addClass("place")
            if ($(ui.draggable).attr("id") == "hut") {
                $(ui.draggable).width($(ui.draggable).parent().width() - 150)
                $(ui.draggable).height($(ui.draggable).parent().height() - 30)
            }
            if ($(ui.draggable).attr("id") == "tree") {
                $(ui.draggable).height($(ui.draggable).parent().height() - 25)
                $(ui.draggable).width($(ui.draggable).parent().width() - 100)
            }
            if ($(ui.draggable).attr("id") == "kid") {
                $(ui.draggable).width($(ui.draggable).parent().width() - 230)
                $(ui.draggable).height(170)
            }
            if ($(ui.draggable).attr("id") == "bird") {
                $(ui.draggable).width($(ui.draggable).parent().width() - 250)
                $(ui.draggable).height($(ui.draggable).parent().height() - 150)
            }



        }
    },
    droppaples: function (event, ui) {
        var x = this;
        $(this).focus();
        $("span").empty();
        if ($(this).attr('id') == 'bird' && $(ui.draggable).attr('id') != 'bird') {

            $(this).append('<span class="dd">U think it can Fly??</span>')

        }

        if ($(this).attr('id') != 'bird' && $(ui.draggable).attr('id') == 'bird') {


            $(this).append('<span class="dd">birds looks good in sky</span>')
        }
    }
}