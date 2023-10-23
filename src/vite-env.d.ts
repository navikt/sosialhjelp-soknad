/// <reference types="vite/client" />
interface ImportMetaEnv {
    readonly REACT_APP_DIGISOS_ENV: string;
    // more env variables...
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
