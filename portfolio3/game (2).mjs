import { ANSI } from "./utils/ansi.mjs";
import { print, clearScreen } from "./utils/io.mjs";
import SplashScreen from "./game/splash.mjs";
import { FIRST_PLAYER, SECOND_PLAYER } from "./consts.mjs";
import createMenu from "./utils/menu.mjs";
import createMapLayoutScreen from "./game/mapLayoutScreen.mjs";
import createInnBetweenScreen from "./game/innbetweenScreen.mjs";
import createBattleshipScreen from "./game/battleshipsScreen.mjs";

const MAIN_MENU_ITEMS = buildMenu();
const MIN_HEIGHT = 600;
const MIN_WIDTH = 800;

const GAME_FPS = 1000 / 60; // The theoretical refresh rate of our game engine
let currentState = null;    // The current active state in our finite-state machine.
let gameLoop = null;        // Variable that keeps a reference to the interval id assigned to our game loop 

let mainMenuScene = null;

function checkResolution(){
    if (window.innerWidth < MIN_WIDTH || window.innerHeight < MIN_HEIGHT) {
        console.log("Please increase resolution to start the game.");
        return false;
    }
    return true;
}

(function initialize() {
    if (!checkResolution()) return;

    print(ANSI.HIDE_CURSOR);
    clearScreen();
    mainMenuScene = createMenu(MAIN_MENU_ITEMS);
    SplashScreen.next = mainMenuScene;
    currentState = SplashScreen  // This is where we decide what state our finite-state machine will start in.

    gameLoop = setInterval(update, GAME_FPS); // The game is started.
})();

function update() {
    currentState.update(GAME_FPS);
    currentState.draw(GAME_FPS);

    if (currentState.transitionTo != null) {
        currentState = currentState.next;
        print(ANSI.CLEAR_SCREEN, ANSI.CURSOR_HOME);
    }
}

// Suport / Utility functions ---------------------------------------------------------------

function buildMenu() {
    let menuItemCount = 0;
    return [
        {
            text: "Start Game", id: menuItemCount++, action: function () {
                clearScreen();
                let inBetween = createInnBetweenScreen();
                inBetween.init(`SHIP PLACEMENT\nFirst player get ready.\nPlayer two look away`, () => {

                    let p1map = createMapLayoutScreen();
                    p1map.init(FIRST_PLAYER, (player1ShipMap) => {


                        let inBetween = createInnBetweenScreen();
                        inBetween.init(`SHIP PLACEMENT\nSecond player get ready.\nPlayer one look away`, () => {
                            let p2map = createMapLayoutScreen();
                            p2map.init(SECOND_PLAYER, (player2ShipMap) => {
                                return createBattleshipScreen(player1ShipMap, player2ShipMap);
                            })
                            return p2map;
                        });
                        return inBetween;
                    });

                    return p1map;

                }, 3);
                currentState.next = inBetween;
                currentState.transitionTo = "Map layout";
            }
        },
        { text: "Exit Game", id: menuItemCount++, action: function () { print(ANSI.SHOW_CURSOR); clearScreen(); process.exit(); } },
    ];
}

