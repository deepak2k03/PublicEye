const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("PublicLedgerModule", (m) => {
  const publicLedger = m.contract("PublicLedger");

  return { publicLedger };
});