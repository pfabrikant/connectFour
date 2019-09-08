(function() {
    function playGame() {
        var columns = $(".column");
        var currentPlayer = "player1";
        var body = $("body");
        var slots = $(".slot");
        var messageBoard = $(".messageBoard");
        var winningSlots = [];
        ///////////////////////////////////////
        var switchPlayer = function() {
            if (currentPlayer == "player1") {
                currentPlayer = "player2";
            } else {
                currentPlayer = "player1";
            }
        };
        ///////////////////////////////////////
        var checkWin = function(arr) {
            var winningSlots = [];
            var counter = 0;
            for (var j = 0; j < arr.length; j++) {
                if (
                    $(arr[j])
                        .children()
                        .hasClass(currentPlayer)
                ) {
                    counter++;
                    winningSlots.push(arr[j]);
                    if (counter == 4) {
                        return winningSlots;
                    }
                } else {
                    counter = 0;
                }
            }
            return false;
        };
        /////////////////////////////////////////

        var win = function(winningslots) {
            winningSlots = $(winningslots);
            console.log(winningSlots);
            //highlight the winning tokens
            setTimeout(function() {
                for (var s = 0; s < 4; s++) {
                    $(winningSlots[s])
                        .children()
                        .addClass("highlight");
                }

                setTimeout(function() {
                    messageBoard.addClass("on");
                    messageBoard.text(currentPlayer + " won the game!!!");
                    setTimeout(function() {
                        messageBoard.text(
                            "Would you like to play again? press 'y' or 'n'"
                        );
                        body.on("keydown", function(e) {
                            if (e.originalEvent.keyCode == 89) {
                                messageBoard.text(
                                    "The game will restart in 3...2...1..."
                                );
                                setTimeout(function() {
                                    slots.children().removeClass("player1");
                                    slots.children().removeClass("player2");
                                    slots.children().removeClass("highlight");
                                    columns.off();
                                    messageBoard.removeClass("on");
                                    playGame();
                                }, 4000);
                            } else if (e.originalEvent.keyCode == 78) {
                                messageBoard.text(
                                    "Thanks for playing! See you again!"
                                );
                                return;
                            }
                        });
                    }, 3000);
                }, 2000);
            }, 2000);
        };
        ///////////////////////////////////////////////////////////////////////

        //click event handler

        columns.on("click", function(e) {
            var column = $(e.currentTarget);
            var columnSlots = $(column.children());
            var rowSlots = [];

            //check where to place the token
            for (var i = 5; i >= 0; i--) {
                if (
                    !$(columnSlots[i])
                        .children()
                        .hasClass("player1") &&
                    !$(columnSlots[i])
                        .children()
                        .hasClass("player2")
                ) {
                    $(columnSlots[i])
                        .children()
                        .addClass(currentPlayer);

                    break;
                }
            }
            if (i == -1) {
                return;
            }

            var slotId = slots.index(column.children()[i]);
            var diagonal1 = [slots[slotId]];
            var diagonal2 = [slots[slotId]];
            var diagonal3 = [slots[slotId]];
            var diagonal4 = [slots[slotId]];

            //find the relevant row to check win

            for (var k = 0; k < columns.length; k++) {
                rowSlots.push($(columns[k]).children()[i]);
            }
            rowSlots = $(rowSlots);

            //finding the 4 diagonal lines

            //constructing first diagonal array -up right (+5)

            for (var x = 1; x < columns.length; x++) {
                if (
                    slotId + 5 * x < slots.length &&
                    columns.index($(slots[slotId + 5 * x]).parent()) ==
                        columns.index($(slots[slotId + 5 * (x - 1)]).parent()) +
                            1
                ) {
                    diagonal1.push(slots[slotId + 5 * x]);
                }
            }

            // second diagonal array - down right (+7)
            for (var y = 1; y < columns.length; y++) {
                if (
                    slotId + 7 * y < slots.length &&
                    columns.index($(slots[slotId + 7 * y]).parent()) ==
                        columns.index($(slots[slotId + 7 * (y - 1)]).parent()) +
                            1
                ) {
                    diagonal2.push(slots[slotId + 7 * y]);
                }
            }

            // Third diagonal array - up left (-7)
            for (var z = 1; z < columns.length; z++) {
                if (
                    slotId - 7 * z > 0 &&
                    columns.index($(slots[slotId - 7 * z]).parent()) ==
                        columns.index($(slots[slotId - 7 * (z - 1)]).parent()) -
                            1
                ) {
                    diagonal3.push(slots[slotId - 7 * z]);
                }
            }

            // Fourth diagonal array - down left (-5)
            for (var t = 1; t < columns.length; t++) {
                if (
                    slotId - 5 * t > 0 &&
                    columns.index($(slots[slotId - 5 * t]).parent()) ==
                        columns.index($(slots[slotId - 5 * (t - 1)]).parent()) -
                            1
                ) {
                    diagonal4.push(slots[slotId - 5 * t]);
                }
            }

            //check win on column, row and two diagonal lines
            if (checkWin(rowSlots)) {
                win(checkWin(rowSlots));
            } else if (checkWin(columnSlots)) {
                win(checkWin(columnSlots));
            } else if (checkWin(diagonal1)) {
                win(checkWin(diagonal1));
            } else if (checkWin(diagonal2)) {
                win(checkWin(diagonal2));
            } else if (checkWin(diagonal3)) {
                win(checkWin(diagonal3));
            } else if (checkWin(diagonal4)) {
                win(checkWin(diagonal4));
            } else {
                return switchPlayer();
            }
        });
    }
    playGame();
})();
