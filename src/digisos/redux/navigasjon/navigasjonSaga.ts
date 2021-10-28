import {SagaIterator} from "redux-saga";

const navigateTo = (path: string) => (window.location.href = path);

function* navigasjonSaga(): SagaIterator {}

export {navigateTo};

export default navigasjonSaga;
