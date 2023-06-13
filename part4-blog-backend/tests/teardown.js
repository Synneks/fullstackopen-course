/**
 * Added because Mongoose documentation does not recommend testing Mongoose applications with Jest.
 * Sometimes when executin api tests which are async a warning could pop up
 * saying "Jest did not exit one second after the test run has completed".
 * This makes sure that the process exits after the test have been run.
 */

module.exports = () => process.exit(0);
