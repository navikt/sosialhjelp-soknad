export const maxCombinedFileSize = 150 * 1024 * 1024; // max bytes total
export const maxFileSize = 10 * 1024 * 1024; // max bytes per file
export const maxFileCount = 30; // max number of files

export const allowedFileTypes =
    // Word Processing
    ".doc,.docx,.docm,.dot,.dotm,.dotx,.odt,.fodt,.ott,.rtf,.txt,.wps,.wpd,.pages,.abw,.zabw,.lwp,.mw,.mcw,.hwp,.sxw,.stw,.sgl,.vor,.602,.bib,.xml,.cwk,.psw,.uof," +
    // Spreadsheets
    ".xls,.xlsx,.xlsm,.xlsb,.xlt,.xltm,.xltx,.xlw,.ods,.fods,.ots,.csv,.numbers,.123,.wk1,.wks,.wb2,.dbf,.dif,.slk,.sxc,.stc,.uos,.pxl,.sdc," +
    // Presentations
    ".ppt,.pptx,.pptm,.pot,.potm,.potx,.pps,.odp,.fodp,.otp,.key,.sxi,.sti,.uop,.sdd,.sdp,.fopd," +
    // Graphics & Drawing
    ".odg,.fodg,.otg,.vsd,.vsdx,.vsdm,.vdx,.cdr,.svg,.svm,.wmf,.emf,.cgm,.dxf,.std,.sxd,.pub,.wpg,.sda,.odd,.met,.cmx,.eps," +
    // Images
    ".jpg,.jpeg,.png,.bmp,.gif,.tif,.tiff,.pbm,.pgm,.ppm,.xbm,.xpm,.pcx,.pcd,.pct,.psd,.tga,.ras,.pwp," +
    // Web & Other
    ".html,.htm,.xhtml,.epub,.pdf,.pdb,.ltx,.mml,.smf,.sxm,.sxg,.oth,.odm,.swf";
