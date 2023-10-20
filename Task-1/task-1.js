const fs = require('fs')

// Read data from data source
const d = fs.readFileSync( "./task1.json", {encoding: 'utf8'} )
const data = JSON.parse(d)

// Create a Map to store the count of syndicateIds for each investorId and their total transaction amount
const investorData = new Map();

// Iterate through the records to count syndicateIds and total transaction amount for each investorId
data.records.forEach(record => {
  const investorId = record.investorId;
  const syndicateId = record.syndicateId;
  const transactionAmount = record.transactionAmount;

  if (!investorData.has(investorId)) {
    investorData.set(investorId, { syndicateIds: new Set(), totalAmount: 0 });
  }
  investorData.get(investorId).syndicateIds.add(syndicateId);
  investorData.get(investorId).totalAmount += transactionAmount;
});

// Sort the investorIds by the number of unique syndicateIds and total transaction amount in descending order
const sortedInvestorIds = [...investorData.entries()]
  .sort((a, b) => {
    if (b[1].syndicateIds.size === a[1].syndicateIds.size) {
      return b[1].totalAmount - a[1].totalAmount;
    }
    return b[1].syndicateIds.size - a[1].syndicateIds.size;
  })
  .map(entry => ({ investorId: entry[0], totalAmount: entry[1].totalAmount }));

// Get the top 5 investors with the most unique syndicate investments and the highest total transaction amount
const topInvestors = sortedInvestorIds.slice(0, 5);

console.log("Top 5 Investors with the Most Unique Syndicate Investments and Their Total Transaction Amounts:");
console.log(topInvestors);