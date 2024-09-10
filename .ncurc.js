// Konfig for npm-check-updates.
// https://www.npmjs.com/package/npm-check-updates#config-file
// eslint-disable-next-line no-undef
module.exports = {
    upgrade: true,
    // Ikke foreslå oppdateringer for @types/node så lenge vi er pinned til 20.
    reject: ["@types/node"],
};
