export function createElection(candidates) {
  const votes = {};
  const registeredVoters = new Set();
  const votedVoters = new Set();

  for (const c of candidates) votes[c.id] = 0;

  return {
    registerVoter(voter) {
      if (!voter || !voter.id || !voter.name || voter.age === undefined) return false;
      if (voter.age < 18) return false;
      if (registeredVoters.has(voter.id)) return false;
      registeredVoters.add(voter.id);
      return true;
    },
    castVote(voterId, candidateId, onSuccess, onError) {
      if (!registeredVoters.has(voterId)) return onError("Voter not registered");
      if (!(candidateId in votes)) return onError("Invalid candidate");
      if (votedVoters.has(voterId)) return onError("Already voted");
      votedVoters.add(voterId);
      votes[candidateId]++;
      return onSuccess({ voterId, candidateId });
    },
    getResults(sortFn) {
      const results = candidates.map(c => ({ id: c.id, name: c.name, party: c.party, votes: votes[c.id] }));
      if (sortFn) return results.sort(sortFn);
      return results.sort((a, b) => b.votes - a.votes);
    },
    getWinner() {
      const totalVotes = Object.values(votes).reduce((s, v) => s + v, 0);
      if (totalVotes === 0) return null;
      const results = candidates.map(c => ({ id: c.id, name: c.name, party: c.party, votes: votes[c.id] }));
      results.sort((a, b) => b.votes - a.votes);
      return results[0];
    }
  };
}

export function createVoteValidator(rules) {
  return (voter) => {
    for (const field of rules.requiredFields) {
      if (voter[field] === undefined || voter[field] === null) return { valid: false, reason: `Missing field: ${field}` };
    }
    if (voter.age < rules.minAge) return { valid: false, reason: `Age must be at least ${rules.minAge}` };
    return { valid: true };
  };
}

export function countVotesInRegions(regionTree) {
  if (!regionTree || typeof regionTree !== "object") return 0;
  let total = regionTree.votes || 0;
  if (Array.isArray(regionTree.subRegions)) {
    for (const sub of regionTree.subRegions) total += countVotesInRegions(sub);
  }
  return total;
}

export function tallyPure(currentTally, candidateId) {
  return { ...currentTally, [candidateId]: (currentTally[candidateId] || 0) + 1 };
}
