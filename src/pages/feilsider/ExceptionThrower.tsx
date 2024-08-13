/** Midlertidig hack for å teste feilhåndtering i dev */
export const ExceptionThrower = () => {
    throw new Error("Test");
};
export default ExceptionThrower;
