export default class Util {
    static isMobile() {
        if(!global.window)
            return false;
        return window.innerWidth <= 768;
    }
}