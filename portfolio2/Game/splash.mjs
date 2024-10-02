import { ANSI } from "./ansi.mjs";

const ART = `
${ANSI.COLOR.GREEN} ______  ____   __     ${ANSI.RESET}${ANSI.COLOR.BLUE} ______   ____    __    ${ANSI.RESET}${ANSI.COLOR.RED}  ______   ___     ___
${ANSI.COLOR.GREEN}|      ||    | /  ]    ${ANSI.RESET}${ANSI.COLOR.BLUE}|      | /    |  /  ]   ${ANSI.RESET}${ANSI.COLOR.RED} |      | /   \\   /  _]
${ANSI.COLOR.GREEN}|      | |  | /  /     ${ANSI.RESET}${ANSI.COLOR.BLUE}|      ||  o  | /  /    ${ANSI.RESET}${ANSI.COLOR.RED} |      ||     | /  [_
${ANSI.COLOR.GREEN}|_|  |_| |  |/  /      ${ANSI.RESET}${ANSI.COLOR.BLUE}|_|  |_||     |/  /     ${ANSI.RESET}${ANSI.COLOR.RED} |_|  |_||  O  ||    _]
${ANSI.COLOR.GREEN}  |  |   |  /   \\_   ${ANSI.RESET}${ANSI.COLOR.BLUE}    |  |  |  _  /   \\_  ${ANSI.RESET}${ANSI.COLOR.RED}     |  |  |     ||   [_
${ANSI.COLOR.GREEN}  |  |   |  \\     |  ${ANSI.RESET}${ANSI.COLOR.BLUE}    |  |  |  |  \\     | ${ANSI.RESET}${ANSI.COLOR.RED}     |  |  |     ||     |
${ANSI.COLOR.GREEN}  |__|  |____\\____|  ${ANSI.RESET}${ANSI.COLOR.BLUE}    |__|  |__|__|\\____| ${ANSI.RESET}${ANSI.COLOR.RED}     |__|   \\___/ |_____|

`

function showSplashScreen() {
    console.log(ART);
}

export default showSplashScreen;