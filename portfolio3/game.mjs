import { ANSI } from "./utils/ansi.mjs";
import { print, clearScreen } from "./utils/io.mjs";
import SplashScreen from "./game/splash.mjs";
import { FIRST_PLAYER, SECOND_PLAYER } from "./consts.mjs";
import createMenu from "./utils/menu.mjs";
import createMapLayoutScreen from "./game/mapLayoutScreen.mjs";
import createInnBetweenScreen from "./game/innbetweenScreen.mjs";
import createBattleshipScreen from "./game/battleshipsScreen.mjs";

const MAIN_MENU_ITEMS = buildMenu();
const MIN_HEIGHT = 24;
const MIN_WIDTH = 80;
const GAME_FPS = 1000 / 60;
let currentState = null;
let gameLoop = null;
let mainMenuScene = null;


function buildMenu() {

    const LANGUAGES = {
        en: {
            startGame: "Start Game",
            exitGame: "Exit Game",
            languageSelect: "Language Select",
            languagePrompt: "Choose your desired language",
            languageEnglish: "English",
            languageNorwegian: "Norsk",
            shipPlacement: "Ship placement",
            playerReady: "First player get ready.\nPlayer two look away",
            player1Ready: "First player get ready.\nPlayer two look away",
            player2Ready: "Second player get ready.\nPlayer one look away",
            resAlert: "Increase terminal window to play the game"
        },
        no: {
            startGame: "Start spill",
            exitGame: "Avslutt spill",
            languageSelect: "Velg språk",
            languagePrompt: "Velg ditt språk",
            languageEnglish: "Engelsk",
            languageNorwegian: "Norsk",
            shipPlacement: "Plassering av skip",
            playerReady: "Første spiller, gjør deg klar.\nAndre spiller, se bort",
            player1Ready: "Første spiller, gjør deg klar.\nAndre spiller, se bort",
            player2Ready: "Andre spiller, gjør deg klar.\nFørste spiller, se bort",
            resAlert: "Øk terminalstørrelsen for å starte spillet."
        }
    };
    let currentLanguage = LANGUAGES.en;
    let menuItemCount = 0;
    return [
        {
            text: currentLanguage.startGame, id: menuItemCount++, action: () => {
                clearScreen();
                let inBetween = createInnBetweenScreen();
                inBetween.init(`${currentLanguage.shipPlacement}\n${currentLanguage.player1Ready}`, () => {
                    let p1map = createMapLayoutScreen();
                    p1map.init(FIRST_PLAYER, (player1ShipMap) => {


                        let inBetween = createInnBetweenScreen();
                        inBetween.init(`${currentLanguage.shipPlacement}\n${currentLanguage.player2Ready}`, () => {
                            let p2map = createMapLayoutScreen();
                            p2map.init(SECOND_PLAYER, (player2ShipMap) => {
                                return createBattleshipScreen(player1ShipMap, player2ShipMap);
                            });
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
        {
            text: currentLanguage.languageSelect, id: menuItemCount++, action: languageSelect
        },
        {
            text: currentLanguage.exitGame, id: menuItemCount++, action: function () {
                print(ANSI.SHOW_CURSOR);
                clearScreen();
                process.exit();
            }
        }
    ];
}


function languageSelect() {
    clearScreen();
    console.log(currentLanguage.languagePrompt);
    console.log(`1. ${currentLanguage.languageEnglish}`);
    console.log(`2. ${currentLanguage.languageNorwegian}`);
    process.stdin.once("data", (data) => {
        const choice = data.toString().trim();
        if (choice === "1") {
            currentLanguage = LANGUAGES.en;
        } else if (choice === "2") {
            currentLanguage = LANGUAGES.no;
        }

        mainMenuScene.items = buildMenu();

        clearScreen();
        mainMenuScene.render();
    });
}

function checkResolution(){
    const width = process.stdout.columns;
    const height = process.stdout.rows;

    if (width < MIN_WIDTH || height < MIN_HEIGHT) {
        console.log("Increase terminal size to start the game.");
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
    currentState = SplashScreen;

    gameLoop = setInterval(update, GAME_FPS);
})();

function update() {
    currentState.update(GAME_FPS);
    currentState.draw(GAME_FPS);

    if (currentState.transitionTo != null) {
        currentState = currentState.next;
        print(ANSI.CLEAR_SCREEN, ANSI.CURSOR_HOME);
    }
}
